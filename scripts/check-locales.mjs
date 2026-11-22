// Fails when any locale is missing a namespace or key that English has, or has one English lacks.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../public/locales/', import.meta.url).pathname;
const read = (locale, file) => JSON.parse(readFileSync(join(root, locale, file), 'utf8'));
const locales = readdirSync(root);
const namespaces = readdirSync(join(root, 'en'));
const problems = [];

for (const locale of locales.filter((l) => l !== 'en')) {
  const files = readdirSync(join(root, locale));
  for (const ns of namespaces) {
    if (!files.includes(ns)) {
      problems.push(`${locale}: missing namespace ${ns}`);
      continue;
    }
    const en = Object.keys(read('en', ns));
    const other = Object.keys(read(locale, ns));
    en.filter((k) => !other.includes(k)).forEach((k) => problems.push(`${locale}/${ns}: missing "${k}"`));
    other.filter((k) => !en.includes(k)).forEach((k) => problems.push(`${locale}/${ns}: extra "${k}"`));
  }
  files.filter((f) => !namespaces.includes(f)).forEach((f) => problems.push(`${locale}: extra namespace ${f}`));
}

if (problems.length) {
  console.error(`Locale check failed:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`Locale check passed: ${locales.length} locales, ${namespaces.length} namespaces.`);
