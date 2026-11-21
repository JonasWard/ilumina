# ilumina

Next.js 15 static export (`output: 'export'`), next-i18next (locales in `public/locales`), Tailwind v4, zustand store persisted to localStorage. Mobile-first lamp picker: swipe → favorites → detail.

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
Every plan (see `PLAN.md`) lists per item:
- **Branch** name.
- **Commits**: the atomic commits it will contain.
- **Success criteria**: concrete, checkable outcomes (measured, not "looks better").
- **Failure criteria**: conditions that mean the item is not done or must be reverted.
- **Estimate**: lines added / changed / removed.

Update the plan when an item ships or the estimate is off by more than 50%.

## Verify
```sh
bun install          # or: npm install --legacy-peer-deps
bun run build        # must pass with no new warnings
bun run lint
bunx http-server out -p 8080
```
Check UI changes with Playwright at iPhone SE (320×568) and Pixel 7 (412×915):
no horizontal scroll (`scrollWidth === innerWidth`), interactive elements ≥ 44×44 px.

Note: `locize-cli` pulls a tarball from cdn.sheetjs.com, which can be blocked in sandboxed environments; drop it from a scratch copy of `package.json` to install.

## UI conventions
- Mobile first; use `dvh`/`svh`, never `100vh` hacks.
- Respect `env(safe-area-inset-*)` on fixed bars.
- Tap targets ≥ 44 px; icon-only controls need `aria-label`.
- Actions are `<button>`, navigation is `<Link>`; never nest a button inside a link.
- All user-facing text goes through i18n, in every locale file.
- Style with Tailwind in components; keep `globals.css` to base tokens.
