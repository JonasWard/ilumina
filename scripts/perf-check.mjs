// Speed budget check for the built site in dist/. Run `bun run build` first.
// Serves dist/ like GitHub Pages (gzip, 10-minute caching, 404.html), measures on a throttled phone and compares to perf-budget.json.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import { chromium, devices } from 'playwright';

const root = resolve(new URL('../dist/', import.meta.url).pathname);
const budget = JSON.parse(readFileSync(new URL('./perf-budget.json', import.meta.url)));
const RUNS = 3;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };

if (!existsSync(join(root, 'index.html'))) {
  console.error('dist/ is missing; run `bun run build` first.');
  process.exit(1);
}

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  const found = file.startsWith(root) && existsSync(file);
  if (!found) file = join(root, '404.html');
  const type = TYPES[extname(file)] ?? 'application/octet-stream';
  let body = readFileSync(file);
  const headers = { 'Content-Type': type, 'Cache-Control': 'max-age=600' };
  if (/text|javascript|svg/.test(type)) {
    body = gzipSync(body);
    headers['Content-Encoding'] = 'gzip';
  }
  res.writeHead(found ? 200 : 404, headers).end(body);
}).listen(0);
const origin = `http://localhost:${server.address().port}`;

const browser = await chromium.launch();

/** A throttled Pixel 7 page, optionally with saved ratings. */
const throttledPage = async (liked) => {
  const context = await browser.newContext({ ...devices['Pixel 7'] });
  if (liked) await context.addInitScript((r) => !sessionStorage.seeded && ((sessionStorage.seeded = 1), (localStorage.liked = r)), liked);
  await context.addInitScript(() => {
    // Records when the top swipe card's photo is first on screen.
    const tick = () => {
      const card = [...document.querySelectorAll('[id^=card-]')]
        .filter((c) => getComputedStyle(c).display !== 'none')
        .sort((a, b) => +getComputedStyle(b).zIndex - +getComputedStyle(a).zIndex)[0];
      const img = card?.querySelector('img');
      if (img?.complete && img.naturalWidth) window.__cardVisible = performance.now();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  return { page, context };
};

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];

const measure = async (name, fn) => {
  const values = [];
  for (let i = 0; i < RUNS; i++) values.push(await fn());
  return [name, Math.round(median(values))];
};

const results = Object.fromEntries([
  await measure('homeFirstPaint', async () => {
    const { page, context } = await throttledPage();
    await page.goto(`${origin}/en/`, { waitUntil: 'load' });
    const value = await page.evaluate(() => performance.getEntriesByName('first-contentful-paint')[0].startTime);
    await context.close();
    return value;
  }),
  await measure('homeHero', async () => {
    const { page, context } = await throttledPage();
    await page.goto(`${origin}/en/`, { waitUntil: 'load' });
    const value = await page.evaluate(() => {
      const src = document.querySelector('img[fetchpriority=high]').currentSrc;
      return performance.getEntriesByType('resource').find((r) => r.name === src).responseEnd;
    });
    await context.close();
    return value;
  }),
  await measure('swipeFirstCard', async () => {
    const { page, context } = await throttledPage();
    await page.goto(`${origin}/en/tinder-slides/`, { waitUntil: 'load' });
    const value = await page.waitForFunction(() => window.__cardVisible).then((h) => h.jsonValue());
    await context.close();
    return value;
  }),
  await measure('swipeFirstCardReturning', async () => {
    const { page, context } = await throttledPage('[0,1,2]');
    await page.goto(`${origin}/en/tinder-slides/`, { waitUntil: 'load' });
    const value = await page.waitForFunction(() => window.__cardVisible).then((h) => h.jsonValue());
    await context.close();
    return value;
  }),
  await measure('tapToSwipeCard', async () => {
    const { page, context } = await throttledPage();
    await page.goto(`${origin}/en/`, { waitUntil: 'load' });
    await page.waitForTimeout(3000);
    const start = Date.now();
    await page.click('a[href$="/tinder-slides/"] >> nth=0');
    await page.waitForFunction(() => window.__cardVisible, null, { polling: 'raf' });
    const value = Date.now() - start;
    await context.close();
    return value;
  }),
  await (async () => {
    const page = await browser.newPage();
    await page.goto(`${origin}/en/`, { waitUntil: 'networkidle' });
    const value = await page.evaluate(() => document.querySelectorAll('script[src]').length);
    await page.close();
    return ['homeExternalScripts', value];
  })(),
  await (async () => {
    const page = await browser.newPage();
    // Uncompressed size, so the budget does not depend on the server's compression.
    const sizes = [];
    page.on('requestfinished', (r) => {
      if (r.resourceType() === 'script') sizes.push(r.response().then((response) => response.body()).then((body) => body.length));
    });
    await page.goto(`${origin}/en/tinder-slides/`, { waitUntil: 'networkidle' });
    const bytes = (await Promise.all(sizes)).reduce((sum, size) => sum + size, 0);
    await page.close();
    return ['swipeScriptBytes', bytes];
  })()
]);

await browser.close();
server.close();

let failed = false;
for (const [name, value] of Object.entries(results)) {
  const limit = budget[name] === 0 ? 0 : Math.round(budget[name] * (1 + budget.tolerance));
  const ok = value <= limit;
  failed ||= !ok;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name.padEnd(24)} ${String(value).padStart(6)}  (budget ${budget[name]}, limit ${limit})`);
}
process.exit(failed ? 1 : 0);
