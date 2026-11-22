# Mobile UI plan

Branch: `feat/mobile-ui` (single branch, one PR to `main`).
Items are worked in order; each is a group of atomic commits on that branch.
Global failure criteria for every commit: `build` or `lint` fails, horizontal scroll appears at 320 px, or desktop (1280 px) layout regresses.

Estimates are `+added / ~changed / -removed` lines.

---

## 1. Mobile basics
Crash and viewport fixes.

Commits:
- `fix: use array map for liked set`
- `fix: allow pinch zoom`
- `fix: pad nav for safe area insets`
- `fix: use dvh for swipe viewport`

Success:
- Favorites renders in a browser without `Iterator.prototype.map` (simulate by deleting it in an init script).
- Viewport meta has no `user-scalable=no`.
- Nav top padding equals `env(safe-area-inset-top)` and swipe card fits within `100dvh` at 320×568.

Failure:
- Any console error on any page.
- Card bottom clipped at 320×568.

Estimate: +6 / ~6 / -2

Status: done. Actual +13 / -13.
Deviation: added `fix: use next-i18next translation hook`; components imported `useTranslation` from a second copy of `react-i18next`, so prerendered HTML showed raw keys and every page threw a hydration error.

## 2. Nav tap targets
Usable, labeled, correct navigation.

Commits:
- `fix: enlarge nav tap targets`
- `fix: add aria labels to icon links`
- `fix: point nav icons to correct pages`
- `fix: use unique keys for nav links`

Success:
- Every nav link and the language select measure ≥ 44×44 px at 320 px.
- Each icon link has a distinct, translated `aria-label`.
- No nav icon links to the current page; no React key warnings.

Failure:
- Nav wraps to two lines or overflows at 320 px.
- Any icon link without an accessible name.

Estimate: +25 / ~20 / -10

Status: done. Actual +65 / -86.
Deviation: unique keys came for free once links moved into `Navigation`, so no separate keys commit. Added `fix: use blurred nav background`.

## 3. Swipe buttons
Swipe alternative and feedback.

Commits:
- `refactor: expose programmatic swipe on card`
- `feat: add like and dislike buttons`
- `feat: show like and dislike stamps on drag`
- `refactor: use pointer events for drag`
- `fix: add gradient behind card caption`

Success:
- Tapping ✕ / ♥ animates the card off and stores the result identically to a swipe.
- Buttons ≥ 56 px, reachable with the thumb (bottom third of the screen).
- Drag works with mouse, touch and pen; no listeners left on `document` after unmount.

Failure:
- Swipe and button produce different store state.
- Card and buttons don't fit at 320×568 together.
- Vertical page scroll is hijacked outside the card.

Estimate: +70 / ~40 / -35

Status: done. Actual +209 / -160 (+73 / -71 of that is re-indenting `globals.css`).
Deviation: added `fix: put global element styles in base layer` (unlayered global `button` styles overrode Tailwind utilities) and `fix: correct french dislike label` ("Désirer" meant "to desire"). Double taps are ignored once a card is flung.

## 4. Swipe progress
Resume, progress and end of deck.

Commits:
- `feat: skip already rated lamps`
- `feat: show swipe progress counter`
- `feat: add end of deck card`
- `feat: add reset ratings action`

Success:
- Reloading mid-deck continues at the first unrated lamp.
- Counter shows `n / 10` and is correct after reload.
- After the last lamp an end card links to favorites and offers a restart; restart clears ratings.

Failure:
- A rated lamp is shown again without a reset.
- Empty card area at any point in the flow.

Estimate: +60 / ~15 / -5

Status: done. Actual +87 / -34.

## 5. Favorites layout
Phone friendly grid with working card actions.

Commits:
- `feat: use two column favorites grid on mobile`
- `fix: make card icons real buttons`
- `feat: add unlike action on card`
- `feat: add favorites empty state`

Success:
- Two columns at 320 and 412 px, cards fill their column, no fixed widths.
- Tapping ♥ on a card unlikes it without navigating; card body still opens the detail page.
- With no likes, an empty state links to the swipe page.

Failure:
- Button nested inside a link (invalid HTML) or tap on icon navigates.
- Card text truncated or overflowing at 320 px.

Estimate: +45 / ~25 / -10

Status: done. Actual +66 / -34.
Deviation: the cart icon became a link to the detail page (there is no cart yet). Added `fix: remove item in store remove actions` (`removeDisliked` used to add).

## 6. Lamp detail actions
Working detail page actions.

Commits:
- `fix: remove global paragraph opacity rule`
- `feat: wire dislike and like on detail`
- `feat: add sticky mobile action bar`
- `feat: add back button to detail`

Success:
- Actions are `<button>`s that update the store; state reflects current like/dislike.
- On < 768 px the action bar is fixed at the bottom with `safe-area-inset-bottom` padding and never covers content (page has matching bottom padding).
- Back returns to the previous page, or favorites if there is no history.

Failure:
- Action bar overlaps text at 320×568.
- Description contrast below 4.5:1.

Estimate: +50 / ~20 / -10

Status: done. Actual +84 / -26.
Deviation: added `fix: only go back after in-app navigation` (`history.length` would leave the site) and `fix: stack detail action labels on mobile` (de/it labels overflowed at 320 px). Purchase is a button with no action, because there is no checkout yet.

## 7. Remove template
Remove next-i18next example leftovers.

Commits:
- `chore: replace footer placeholder copy`
- `chore: set real page titles`
- `chore: remove example pages`
- `refactor: move global styles into components`
- `feat: redesign home hero for mobile`

Success:
- No "next-i18next" or "non-page component" text in any locale or `<title>`.
- `second-page` and `three-scene` routes no longer exported.
- `globals.css` only holds font, theme tokens and background; no element-level `button`/`h1`/`p` rules.
- Home shows a lamp image and a full-width primary CTA above the fold at 320×568.

Failure:
- Any page visually changes unintentionally after moving global styles (compare screenshots).
- Missing translation key in any of de, dk, en, fr, it.

Estimate: +50 / ~30 / -110

Status: done. Actual +82 / -210.
Note: `@react-three/*` dependencies are now unused, but they are still in `package.json`.

## 8. Lamp images
Lighter, accessible images.

Commits:
- `perf: render swipe cards as lazy img`
- `perf: add responsive image sizes`
- `fix: add descriptive alt text`

Success:
- Only the active and next card images load on the swipe page initially.
- Every `<img>` has meaningful alt text (decorative icons use `alt=""`).
- Lighthouse mobile performance does not drop; LCP on swipe page ≤ 2.5 s (simulated slow 4G).

Failure:
- Visible image pop-in or layout shift on card change (CLS > 0.1).

Estimate: +30 / ~25 / -10

Status: partly met. Actual +53 / -25.
Deviation: dropped `perf: add responsive image sizes`. The sources are already 1024 px and about 125 KB each, and a static export has no image optimizer. Added `perf: load active card before next` and `perf: preload first swipe image`.
LCP criterion not met: the swipe page measures 3.5 s with real throttling (150 ms RTT, 1.6 Mbps, 4x CPU). The original build measures 3.4 s and the static home page 2.7 s on the same setup. The remaining cost is that the deck waits for hydration to know which lamp is next. CLS is 0.

---

## Total
Planned: 33 commits, ~ +336 / ~181 / -192.
Shipped: 41 commits, net +481 / -410 (git does not split out changed lines).

---

## 9. Landing page proposals
Three alternative landing pages, side by side, so one can be picked to replace the home page.
Routes: `/[locale]/proposals/glow/`, `/[locale]/proposals/gallery/`, `/[locale]/proposals/deck/`.

- **Glow**: dark, full-bleed lamp photo with a warm breathing glow, large thin headline, snap carousel below.
- **Gallery**: light editorial page, oversized wordmark, two marquee rows of lamps drifting in opposite directions.
- **Deck**: fanned stack of swipe cards that sways, "swipe, like, light" in three steps.

Commits:
- `feat: add landing proposal copy`
- `feat: add glow landing proposal`
- `feat: add gallery landing proposal`
- `feat: add deck landing proposal`

Success:
- Each proposal exports for all 5 locales and builds.
- Headline and CTA are fully visible without scrolling at 320×568.
- No horizontal scroll; all tap targets ≥ 44 px; no console errors.
- All motion stops under `prefers-reduced-motion: reduce`.
- Text over photos has a scrim that gives ≥ 4.5:1 contrast.

Failure:
- Any proposal needs new image assets or dependencies.
- Any proposal changes the existing home page or other routes.
- Missing copy in any locale.

Estimate: +380 / ~0 / -0

Status: done. Actual +378 / -2.
Deviation: added `fix: keep glow headline off the photo` (white text sat on the pale lamp) and `fix: contain deck card height` (the front card covered the subtitle). `LanguageSwitchLink` got an optional `className` so it reads on a dark background, and its default look is unchanged. Animations are defined as `@theme` tokens in `globals.css`.

---

## 10. Glow as home page
Glow was picked. It replaces the home page, and the other proposals go.

Commits:
- `feat: use glow landing as home page`
- `chore: remove landing proposals`

Success:
- `/[locale]/` renders the Glow design in all 5 locales; `/[locale]/proposals/*` no longer exported.
- Same checks as item 9 pass on `/[locale]/`.
- No unused copy keys or animation tokens left behind.

Failure:
- Any route other than home and the proposals changes.
- Home LCP worse than the 2.7 s measured in item 8.

Estimate: +10 / ~40 / -260

Status: done. Actual +85 / -334.
Deviation: added `perf: load home carousel after page load`. The carousel photos were downloading alongside the hero photo, which pushed home LCP from 2.74 s to 3.07 s. With the fix it is back to 2.74 s. Also removed the now-unused `common:h1` key.

---

# Astro migration

Branch: `refactor/astro-migration`, created from `feat/mobile-ui` (it needs the mobile work). One PR to `main`.

Goal: ship the same site as static Astro pages. Pages are plain HTML and CSS, and Preact loads only where something is interactive (swipe deck, favorites, detail actions).

Measured on prototypes (slow 4G, 4x CPU, Pixel 7, home page):

| Build | First paint | Hero photo loaded | Downloaded |
|---|---|---|---|
| Next.js today | 1.09 s | 2.71 s | 586 KB |
| Astro, straight port | 0.61 s | 1.14 s | 165 KB |
| + inline CSS, self-hosted font | 0.36 s | 1.05 s | 164 KB |
| + AVIF/WebP hero | 0.37 s | 0.90 s | 134 KB |

Island runtime with the swipe deck's hooks plus zustand: React 224 KB raw (70 KB gzip), Preact 25 KB raw (10 KB gzip).

Approach: Astro lives in `src/` next to the Next.js `pages/` until the switch, so `bun run build` (Next.js) keeps passing at every commit. `bun run build:astro` builds the new site until item 16 makes it the only build.

Kept as is:
- **URLs**: `/`, `/404.html`, `/{locale}/`, `/{locale}/tinder-slides/`, `/{locale}/favorites/`, `/{locale}/lamps/{0-9}/`, with trailing slashes. `/dk/` stays as a URL.
- **Stored data**: the localStorage keys `liked` and `disliked`, so people keep their favorites.
- **Hosting**: GitHub Pages on `ilumina.ch`; `PAGES_BASE_PATH` becomes Astro's `base`. GitHub Pages fixes cache headers (10 min) and serves gzip, so neither is tunable.
- **Components**: `TinderCard`, `lib/store.ts` and `lib/lamps.ts` are reused through `preact/compat`.

## Localisation design
- **Source**: the same JSON namespaces as now (`common`, `landing`, `404`, `footer`, `navigation`). They stay where locize downloads them, and move to `src/i18n/locales` in item 16.
- **Routing**: `src/pages/[locale]/…` with `getStaticPaths` over `en`, `de`, `dk`, `it`, `fr`, plus Astro's `i18n` config (`prefixDefaultLocale: true`), so every locale gets its own static HTML.
- **Translating**: `useTranslations(locale)` returns `t('ns:key', vars)` with `{{var}}` interpolation. Keys are typed from the English files, so a typo is a type error. Missing keys in other locales fail the build through a parity check. No plural rules are used today, so no i18n library is needed.
- **Islands**: they receive already-translated strings as props, plus templates such as `liked-count` that they fill in with the same `{{var}}` helper (about 10 lines). No i18n code or locale JSON ships to the browser.
- **Language tags**: the URL segment `dk` maps to the language tag `da`, used in `<html lang>` and `hreflang`. The other locales map to themselves.
- **SEO**: every page gets `<link rel="alternate" hreflang>` for all 5 locales plus `x-default` (pointing to `/en/`), and a canonical link.
- **Language switch**: it saves the choice to localStorage (`locale`) and goes to the same page in the new locale.
- **`/` redirect**: an inline script picks the saved choice, then the first `navigator.languages` match (`da*` maps to `dk`), then `en`. It uses `location.replace`, so the redirect page doesn't stay in the back history. `<noscript>` lists the 5 language links.
- **404**: it uses the locale from the URL prefix if there is one, otherwise the same detection as `/`.

Global failure criteria for every commit: `bun run build` or `bun run build:astro` fails, or a page already ported to Astro fails the UI checks from items 1–10 (no horizontal scroll at 320 px, tap targets ≥ 44 px, no console errors, motion off under reduced motion).

---

## 11. Astro foundation
Commits:
- `chore: add astro with preact and tailwind`
- `perf: self-host quicksand font`
- `perf: inline page css`
- `feat: add astro i18n helpers`
- `chore: add locale key parity check`
- `feat: add astro base layout with hreflang`
- `feat: add astro nav and language select`

Details:
- `astro.config.mjs`: `output: 'static'`, `trailingSlash: 'always'`, `base` from `PAGES_BASE_PATH`, `@astrojs/preact` with `compat: true`, `@tailwindcss/vite`, `build.inlineStylesheets: 'always'`.
- Font: Quicksand variable weights 300–600, Latin subset as one 28 KB woff2 (covers å æ ø ß é ü), with `font-display: swap` and a preload.
- Parity check: `scripts/check-locales.mjs` runs before `build:astro` and fails on any missing or extra key per namespace.

Success:
- `bun run build:astro` builds a shell for all 5 locales with no requests to `fonts.googleapis.com` or `fonts.gstatic.com`, and no external stylesheet.
- `t()` returns the same strings as `next-i18next` for every key in every namespace and locale (checked by comparing all keys).
- `/dk/` pages have `lang="da"`, and every page lists 6 `hreflang` links (5 locales plus `x-default`).
- Removing one key from `fr/common.json` makes `build:astro` fail and name the key.

Failure:
- Any translated key renders as a raw key.
- Any i18n library or framework runtime shipped on a page without an island.

Estimate: +300 / ~10 / -0

Status: done. Actual +418 / -3 (the font license file is 93 of those lines).
Deviations:
- Added `chore: remove unrelated tailwind package`. `package.json` depended on `tailwind`, an unrelated npm package (an "evented CQS" library) that pulled in Express and an old `cookie` which broke Astro's build.
- Astro's built-in `i18n` routing is not used. Own `[locale]` routes plus `localizedPath()` give the same URLs with less magic.
- During coexistence Tailwind runs through `@tailwindcss/vite` with Next's `postcss.config.mjs` disabled for Astro.
Results: all 165 lookups (33 keys × 5 locales) match i18next exactly, `/dk/` has `lang="da"`, there are 6 `hreflang` links per page, and the parity check fails on a removed key and names it.

## 12. Static pages
Commits:
- `feat: port home page to astro`
- `feat: port lamp detail content to astro`
- `feat: add locale redirect page`
- `feat: port 404 page to astro`

Details:
- Home: the Glow page as pure HTML. The carousel loads after the `load` event (inline script).
- Detail: image, name and description are static, and the actions arrive in item 13.
- `/` and `404.html` as described in the localisation design.

Success:
- Home: first paint ≤ 0.45 s and hero photo ≤ 1.1 s on the throttled run, with 0 KB of JS apart from inline scripts.
- `/` with a `da-DK` browser lands on `/dk/`, with `de-CH` on `/de/`, with `ja` on `/en/`, and a saved choice wins over the browser language.
- Screenshots at 320 / 412 / 1280 px match the Next.js pages, apart from font anti-aliasing.

Failure:
- Redirect loop, or the redirect page left in the back history.
- Any page in `out/` that has no matching page in `dist/`.

Estimate: +260 / ~0 / -0

Status: done. Actual +248 / -3.
Deviation: `/404/` without a locale is not generated. GitHub Pages serves `404.html` for it, which forwards to the localized 404 page, as for any unknown URL.
Results: home, detail and 404 pages are pixel-identical to Next.js at 320 / 412 / 1280 px. `da-DK` → `/dk/`, `de-CH` → `/de/`, `ja` → `/en/`, a saved choice wins, and the redirect page is not in the back history.

## 13. Interactive islands
Commits:
- `refactor: hydrate lamp store without next app`
- `refactor: use forward ref in tinder card`
- `feat: port swipe deck as preact island`
- `perf: render first deck card before hydration`
- `feat: port favorites grid as preact island`
- `feat: port detail actions as preact island`
- `feat: port back button to astro`

Details:
- Store: the `hydrated` flag is set when the store module first runs in the browser (replaces `_app.tsx`).
- `TinderCard`: `preact/compat` does not pass `ref` as a prop to function components the way React 19 does, so it wraps in `forwardRef`.
- First card before hydration: the HTML contains all 10 cards, hidden. A blocking inline script in `<head>` reads `liked` and `disliked` and sets `data-first` and `data-next` on the deck before first paint. CSS shows only those two cards, so the right photo paints without waiting for JS, and the island then takes over the same DOM.
- Swipe and favorites use `client:load`; detail actions use `client:visible`.
- Back button: a plain button with an inline script that goes back only after in-app navigation (a sessionStorage flag set on page load).

Success:
- Every behaviour verified in items 3–6 still passes: button and swipe give the same store state, double tap counts once, reload resumes the deck, end card and reset work, unlike works on cards, and like/dislike on the detail page are exclusive.
- Favorites stored by the Next.js site load unchanged in the Astro site.
- Swipe page JS ≤ 40 KB raw (Next.js today: ~410 KB), and the swipe page's first card loads in ≤ 1.2 s on the throttled run (Next.js today: 3.5 s).
- A returning visitor with 3 rated lamps sees lamp 4 as the first paint, with no frame showing lamp 1.

Failure:
- Any island hydration error or mismatch warning.
- Store state diverges between two islands on one page.

Estimate: +230 / ~70 / -20

Status: done. Actual +426 / -22.
Deviations:
- Dropped `refactor: use forward ref in tinder card`: Preact 11 passes `ref` as a prop like React 19.
- Added `perf: keep icons as cacheable files`: inlined SVGs were repeated in every swipe card and page.
- Before hydration only the first card shows. Showing the next card too made its photo compete with the first.
- The back button checks `document.referrer` instead of a sessionStorage flag.
- `zustand` has to be bundled in Astro's `prerender` environment so it uses `preact/compat` while rendering.
Results: every behaviour check from items 3–6 passes, swipe and favorites pages are pixel-identical, and favorites saved in the Next.js format load unchanged. The swipe page ships 34.9 KB of JS (was 446 KB), and returning visitors see their next lamp from the first frame.

## 14. Optimized images
Commits:
- `perf: serve lamp images through astro assets`
- `perf: add responsive lamp image sizes`

Details:
- `astro:assets` `<Picture>` with AVIF and WebP plus a JPEG fallback, `srcset` widths 480 / 768 / 1024, and correct `sizes` for the hero, carousel, grid, detail and deck images.

Success:
- Hero photo on Pixel 7 ≤ 85 KB (JPEG today: 110 KB), and ≤ 30 KB at 320 px wide.
- Home hero photo loaded ≤ 0.95 s on the throttled run; CLS stays 0.

Failure:
- Visible quality loss at 2x DPR (compare screenshots against the source JPEG).
- Build time over 60 s.

Estimate: +70 / ~40 / -10

Status: done. Actual +158 / -41.
Deviations:
- The JPEG fallback is the original file: a re-encoded JPEG came out larger (130 KB vs 110 KB).
- `<picture>` uses `display: contents`, so its `<source>` elements are hidden explicitly; otherwise they became flex items and added gaps.
- Not met: hero ≤ 30 KB at 320 px. It holds at 1x, but a 2x iPhone SE needs the 640 px version (38 KB) to stay sharp, and sharpness won.
Results: Pixel 7 hero 79 KB (was 110 KB), home hero 0.87 s, CLS 0, and a 22 s build.

## 15. Navigation speed
Commits:
- `perf: prefetch swipe page from home`
- `perf: prefetch detail pages from favorites`

Details:
- Astro `prefetch` with `prefetchAll: false`. The home CTAs prefetch on viewport; the favorites cards prefetch on hover or touch start.

Success:
- After the home page settles, tapping "Find your lamp" shows the swipe page's first card in ≤ 0.5 s on the throttled run.
- Prefetching never starts before the home hero photo has loaded.

Failure:
- Prefetching pushes the home page's hero photo later.

Estimate: +10 / ~5 / -0

Status: done. Actual +30 / -5.
Deviation: Astro's `prefetch` was replaced by a few inline lines. Astro's version started before the hero photo had loaded and added a script to the home page.
Results: tapping "Find your lamp" after the home page settles shows the first card in 0.23 s, and the prefetch starts only after the hero has loaded.

## 16. Switch and clean up
Commits:
- `chore: build and deploy with astro`
- `chore: remove next.js`
- `chore: move locales into src`
- `chore: add performance budget check`
- `docs: update claude.md for astro`

Details:
- `build` becomes `astro build`. The workflow uploads `dist/`, and `CNAME` moves to `public/CNAME`.
- Removed: `pages/`, `next.config.ts`, `next-env.d.ts`, `next-i18next.config.js`, the Next-only `lib/` and `components/`, and the dependencies `next`, `next-i18next`, `i18next`, `react-i18next`, `next-language-detector`, `react`, `react-dom`, `@react-three/*` and `eslint-config-next`.
- Locales move to `src/i18n/locales`, and the `downloadLocales` path is updated.
- Budget check: `scripts/perf-check.mjs` (Playwright, run locally) checks the throttled numbers from items 12–15 and fails when any of them regresses by more than 20%.
- `CLAUDE.md`: stack line, verify commands, and the note that `dist/` is the output.

Success:
- Clean `bun install && bun run build` produces `dist/` containing every URL in the list above, plus `CNAME`.
- No `next`, `i18next` or `react-dom` package in `bun.lock`.
- The deployed site on `ilumina.ch` passes the UI checks and the budget check.

Failure:
- Deploy workflow fails or the custom domain stops resolving.
- Any file under `src/` still imports from `next` or `react`.

Estimate: +120 / ~30 / -900

Status: done. Actual +213 / -936.
Deviations:
- `TinderCard`, the store and the lamp list moved into `src/`.
- `next lint`, which never had a config, became `astro check` (0 errors).
- `@astrojs/check` and `playwright` (1.63.0, matching the CI browser setup) were added as dev dependencies.
Not verified here: the GitHub Actions deploy, and a full `bun install` (this sandbox blocks the `locize-cli` tarball host). `bun.lock` was generated with `bun --lockfile-only`, so the first CI run is the real install.

---

## Astro migration total
Planned: 27 commits, ~ +990 / ~155 / -930.
Shipped: 28 commits, +1493 / -1010 (excluding `bun.lock`; git does not split out changed lines).

Results (throttled Pixel 7, served with gzip like GitHub Pages; budgets in `scripts/perf-budget.json`):

| | Next.js | Astro |
|---|---|---|
| Home first paint | 645 ms | 312 ms |
| Home hero photo | 1749 ms | 871 ms |
| Swipe, first card, new visitor | 1869 ms | 1058 ms |
| Swipe, first card, returning visitor | 3340 ms | 1139 ms |
| Home JS | ~410 KB | 0 (inline only) |
| Swipe page JS (uncompressed) | 446 KB | 34.9 KB |

Correction: the prototype numbers at the top of this section, and in items 8 and 10, were measured without compression. With gzip, as GitHub Pages serves it, Next.js was faster than those numbers suggested (home hero 1.75 s rather than 2.7 s). The gap to Astro is still about 2x.

Not doing:
- **Service worker / offline**: GitHub Pages' fixed 10-minute cache plus hashed assets already make repeat visits cheap, and a worker adds update and staleness bugs.
- **Vanilla JS instead of Preact**: it would save another ~25 KB but means rewriting the swipe card and store.

Risks:
- **bun**: this environment has no `bun`, so `bun.lock` cannot be regenerated here. Install bun via npm for the migration, or regenerate the lock on a machine that has it.
- **Astro 7**: Astro 7 is new, so pin exact versions.
- **Navigation feel**: moving between pages becomes a full page load. Prefetching (item 15) covers the main path, and Astro's `<ClientRouter />` could be a follow-up.

---

# Viewport jitter

Branch: `fix/viewport-jitter`, created from `refactor/astro-migration`. One PR.

Problem: on phones the address bar slides away or back while scrolling, and the visible viewport changes height over many frames. Anything sized with `dvh`, or painted with `background-attachment: fixed`, is re-laid out or repainted every frame, which shows as jitter. It is worst on the home page.

## 17. Stable viewport sizing
Commits:
- `fix: use stable height for home hero`
- `fix: use stable min height for pages`
- `fix: draw page background on fixed layer`
- `chore: remove leftover next root rule`

Details:
- Home hero: `h-dvh` → `h-svh` (height with the address bar shown), so it never resizes while scrolling.
- Body: `min-h-dvh` → `min-h-svh` in the layout and on the redirect page.
- Background: the body gradient moves from `background-attachment: fixed` to a fixed `::before` layer of `100lvh`, which doesn't change with the address bar.
- The swipe page keeps `h-dvh`: it doesn't scroll, so the address bar never toggles there.
- `#__next` styles in `global.css` are left over from Next.js and match nothing.

Success:
- No `dvh` or `background-attachment: fixed` left on pages that scroll (checked with grep: only the swipe page uses `dvh`).
- Screenshots at 320 / 412 / 1280 px are pixel-identical to `refactor/astro-migration` on every page.
- Headline and CTA still fully visible without scrolling at 320×568 in all 5 locales; `bun run perf` and `bun run check` pass.
- On a real phone (Chrome Android, iOS Safari), scrolling the home page with the address bar hiding and showing moves no element other than by the scroll itself. This needs a manual check, because headless browsers have no address bar.

Failure:
- The CTA ends up below the fold on a phone with the address bar shown.
- The background gradient visibly changes or ends partway down a long page.

Estimate: +8 / ~4 / -10

Status: done in code; the real-phone check is still open. Actual +15 / -14 (the comment on the background layer accounts for most of the extra lines).
Results:
- Only the swipe page still uses `dvh`.
- Every page is pixel-identical to `refactor/astro-migration` at 320 / 412 / 1280 px, including a long favorites page scrolled to the middle and the end.
- Headline and CTA fit at 320×568 in all 5 locales.
- `bun run check`: 0 errors. `bun run perf` passes.
- The behaviour checks pass, so the background layer doesn't block taps.
