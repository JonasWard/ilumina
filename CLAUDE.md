# ilumina

Astro 7 static site (output in `dist/`, deployed to GitHub Pages on ilumina.ch) with Preact islands (`preact/compat`), Tailwind v4, and a zustand store persisted to localStorage. Mobile-first lamp picker: swipe → favorites → detail.

## Layout
- `src/pages/[locale]/…`: one static page per locale (`en`, `de`, `dk`, `it`, `fr`). `src/pages/index.astro` and `404.astro` pick a locale with an inline script.
- `src/islands/`: the only code that ships JS (swipe deck, favorites grid, detail actions). Everything else is HTML and CSS, plus small inline scripts.
- `src/i18n/`: `useTranslations(locale)` gives `t('ns:key', vars)`. Translations live in `src/i18n/locales/{locale}/{ns}.json`, and `scripts/check-locales.mjs` fails the build on any missing or extra key.
- `src/images/lampPicture.ts`: AVIF/WebP `<picture>` sources for lamp photos, with `LAMP_SIZES` matching each layout.
- `src/lib/`: lamp list and store, shared by pages and islands.

## Git

### Branches
`<type>/<short-kebab-topic>`, at most 3 words in the topic.
Types: `feat`, `fix`, `refactor`, `chore`, `perf`, `docs`.
Examples: `fix/nav-tap-targets`, `feat/swipe-buttons`, `chore/remove-template`.

### Commits
- One logical change per commit; build must pass at every commit.
- Subject line only: `<type>: <imperative summary>`, lowercase, ≤ 50 chars, no period.
- No body, no description, no `Co-Authored-By` or other attribution trailers.
- Examples: `fix: use array map for liked set`, `feat: add like and dislike buttons`.

## Planning
Every plan (see `PLAN.md`) lists its branch and, per item:
- **Branch**: one per plan, or per item if the plan says so.
- **Commits**: the atomic commits it will contain.
- **Success criteria**: concrete, checkable outcomes (measured, not "looks better").
- **Failure criteria**: conditions that mean the item is not done or must be reverted.
- **Estimate**: lines added / changed / removed, counting code only (not docs or lockfiles).

Keep diffs minimal:
- A plan entry is at most 15 lines. When a branch is done, its status becomes one line, written once, with numbers taken from `git diff --shortstat` first. No correction commits.
- Explore alternatives (designs, prototypes) in a scratch directory or an artifact, not in the repo.
- No re-indenting, file moves or comments unless the task needs them.

## Verify
```sh
bun install
bun run build        # locale check + astro build; must pass with no new warnings
bun run check        # astro check: types in .astro and .tsx
bun run perf         # speed budget on the built site (scripts/perf-budget.json)
bun run serve        # serves dist/ on :8080
```
Check UI changes with Playwright at iPhone SE (320×568) and Pixel 7 (412×915):
no horizontal scroll (`scrollWidth === innerWidth`), interactive elements ≥ 44×44 px.

`bun run perf` needs a Chromium for Playwright (`bunx playwright install chromium`). Update `perf-budget.json` only for intended trade-offs, and say why in the commit.

Note: `locize-cli` pulls a tarball from cdn.sheetjs.com, which can be blocked in sandboxed environments; drop it from a scratch copy of `package.json` to install.

## UI conventions
- Mobile first; use `dvh`/`svh`, never `100vh` hacks.
- Respect `env(safe-area-inset-*)` on fixed bars.
- Tap targets ≥ 44 px; icon-only controls need `aria-label`.
- Actions are `<button>`, navigation is `<a>`; never nest a button inside a link. Build links with `localizedPath()`.
- All user-facing text goes through i18n, in every locale file. Islands get translated strings (or `{{var}}` templates) as props; no i18n library ships to the browser.
- Prefer `.astro` with no JS. Reach for an island only for real interactivity, and keep its bundle inside the perf budget.
- `<html lang>` uses `LANGUAGE_TAGS` (`dk` is Danish, tag `da`).
- Lamp photos go through `lampPicture()`; never reference the source JPEGs directly.
- Style with Tailwind in components; keep `src/styles/global.css` to base tokens.
