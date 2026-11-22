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

Goal: ship the same site as static Astro pages. Pages are plain HTML and CSS. React only loads where something is interactive (swipe deck, favorites, detail actions).
Measured reason: a prototype of the home page loaded its main photo (LCP) in 1.04 s instead of 2.73 s, and downloaded 164 KB instead of 586 KB (slow 4G, 4x CPU, Pixel 7).

Approach: Astro lives in `src/` next to the Next.js `pages/` until the switch, so `bun run build` (Next.js) keeps passing at every commit. `bun run build:astro` builds the new site until item 15 makes it the only build.

Kept as is:
- **URLs**: `/`, `/404.html`, `/{locale}/`, `/{locale}/tinder-slides/`, `/{locale}/favorites/`, `/{locale}/lamps/{0-9}/`, with trailing slashes.
- **Stored data**: the localStorage keys `liked` and `disliked`, so people keep their favorites.
- **Locales**: en, de, dk, it, fr. `en` is the fallback.
- **Hosting**: GitHub Pages on `ilumina.ch`; `PAGES_BASE_PATH` becomes Astro's `base`.
- **Components**: `TinderCard`, `lib/store.ts` and `lib/lamps.ts` are reused as React and plain TypeScript.

Global failure criteria for every commit: `bun run build` or `bun run build:astro` fails, or a page that already exists in Astro fails the UI checks from items 1–10 (no horizontal scroll at 320 px, tap targets ≥ 44 px, no console errors, motion off under reduced motion).

---

## 11. Astro foundation
Commits:
- `chore: add astro with react and tailwind`
- `feat: add astro i18n helpers`
- `feat: add astro base layout`
- `feat: add astro nav and language select`

Details:
- `astro.config.mjs`: `output: 'static'`, `trailingSlash: 'always'`, `base` from `PAGES_BASE_PATH`, `@astrojs/react`, `@tailwindcss/vite`.
- i18n: `t(locale, 'ns:key', vars)` reads the existing JSON files and supports `{{var}}`. Islands receive translated strings as props, so no i18n library ships to the browser.
- Layout: head (title, favicon, font, viewport), slot, body classes.
- Nav: renders the active state on the server. The language select is a `<select>` with an inline script of a few lines.

Success:
- `bun run build:astro` builds an empty locale shell for all 5 locales.
- `t()` returns the same strings as `next-i18next` for every key in `common.json` (checked by a script that compares all keys).
- Nav markup matches the Next.js nav: same links, `aria-label`s and `aria-current`, 44 px targets.

Failure:
- Any translated key renders as a raw key.
- Any i18n or React runtime shipped on a page without an island.

Estimate: +220 / ~5 / -0

## 12. Static pages
Commits:
- `feat: port home page to astro`
- `feat: port lamp detail content to astro`
- `feat: add locale redirect page`
- `feat: port 404 page to astro`

Details:
- Home: the Glow page as pure HTML. The carousel loads after the `load` event (inline script).
- Detail: image, name and description are static, and the actions arrive in item 13.
- `/`: inline locale detection with the same order as now (saved choice, `navigator.languages`, `en`). `<noscript>` links to `/en/`.
- `404.html`: localized from the browser language and links home.

Success:
- Home in Astro has LCP ≤ 1.1 s and 0 KB of JS apart from inline scripts, on the throttled run.
- Visiting `/` with a German browser lands on `/de/`, and with an unknown language on `/en/`.
- Screenshots at 320 / 412 / 1280 px match the Next.js pages, apart from font anti-aliasing.

Failure:
- Redirect loop, or a flash of the wrong locale for longer than 100 ms.
- Any page in `out/` that has no matching page in `dist/`.

Estimate: +260 / ~0 / -0

## 13. Interactive islands
Commits:
- `refactor: hydrate lamp store without next app`
- `feat: port swipe deck as react island`
- `feat: port favorites grid as react island`
- `feat: port detail actions as react island`
- `feat: port back button to astro`

Details:
- Store: the `hydrated` flag is set when the store module first runs in the browser (replaces `_app.tsx`).
- Swipe and favorites use `client:load`; detail actions use `client:visible`.
- Back button: a plain button with an inline script that goes back only after in-app navigation (sessionStorage flag set on page load).

Success:
- Every behaviour verified in items 3–6 still passes: button and swipe give the same store state, double tap counts once, reload resumes the deck, end card and reset work, unlike works on cards, and like/dislike on the detail page are exclusive.
- Favorites stored by the Next.js site load unchanged in the Astro site.
- Swipe page JS ≤ 200 KB uncompressed (Next.js today: ~410 KB), and swipe LCP ≤ 2.5 s on the throttled run.

Failure:
- Any island hydration error or mismatch warning.
- Store state diverges between two islands on one page.

Estimate: +180 / ~60 / -20

## 14. Optimized images
Commits:
- `perf: serve lamp images through astro assets`
- `perf: add responsive lamp image sizes`

Details:
- `astro:assets` `<Picture>` with AVIF and WebP plus a JPEG fallback, `srcset` widths 480 / 768 / 1024, and correct `sizes` for the hero, carousel, grid and detail images.
- Swipe deck: the island receives the same generated URLs as props.

Success:
- Hero image transfer on Pixel 7 ≤ 60 KB (JPEG today: 110 KB).
- Home LCP ≤ 0.9 s on the throttled run; CLS stays 0.

Failure:
- Visible quality loss at 2x DPR (compare screenshots against the source JPEG).
- Build time over 60 s.

Estimate: +60 / ~40 / -10

## 15. Switch and clean up
Commits:
- `chore: build and deploy with astro`
- `chore: remove next.js`
- `chore: move locales into src`
- `docs: update claude.md for astro`

Details:
- `build` becomes `astro build`. The workflow uploads `dist/`, and `CNAME` moves to `public/CNAME`.
- Removed: `pages/`, `next.config.ts`, `next-env.d.ts`, `next-i18next.config.js`, the Next-only `lib/` and `components/`, and the dependencies `next`, `next-i18next`, `i18next`, `react-i18next`, `next-language-detector`, `@react-three/*` and `eslint-config-next`.
- Locales move to `src/i18n/locales`, and the `downloadLocales` path is updated.
- `CLAUDE.md`: stack line, verify commands, and the note that `dist/` is the output.

Success:
- Clean `bun install && bun run build` produces `dist/` containing every URL in the list above, plus `CNAME`.
- No `next` or `i18next` package in `bun.lock`.
- The deployed site on `ilumina.ch` passes the UI checks and the item 12–14 LCP targets.

Failure:
- Deploy workflow fails or the custom domain stops resolving.
- Any file under `src/` still imports from `next`.

Estimate: +40 / ~30 / -900

---

## Astro migration total
19 commits, ~ +760 / ~135 / -930

Risks:
- **bun**: this environment has no `bun`, so `bun.lock` cannot be regenerated here. Install bun via npm for the migration, or regenerate the lock on a machine that has it.
- **Astro 7**: Astro 7 is new, so pin exact versions.
- **Navigation feel**: moving between pages becomes a full page load. Astro's `<ClientRouter />` can bring back app-like transitions if needed, which would be a follow-up.
