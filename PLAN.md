# Plan

Finished items are one line each; details are in the commits (`git log --grep`) and in PR #8.
Open items keep their branch, criteria and estimate (see `CLAUDE.md`).

## Done
1. Mobile basics: iterator crash, pinch zoom, safe areas, `dvh`, i18n hydration fix.
2. Nav: 44 px targets, labels, correct links.
3. Swipe: like/dislike buttons, drag stamps, pointer events.
4. Swipe progress: resume after reload, counter, end card, reset.
5. Favorites: two-column grid, unlike button, empty state.
6. Lamp detail: working actions, sticky mobile bar, back button.
7. Template cleanup: placeholder copy, titles, example pages, global CSS.
8. Images: lazy cards, alt text, deck preload.
9. Landing proposals (Glow, Gallery, Deck); Glow chosen.
10. Glow as home page; carousel loads after the hero.
11. Astro foundation: Preact, Tailwind, self-hosted font, inline CSS, i18n helpers, locale check, `hreflang`.
12. Static pages: home, detail, locale redirect, 404.
13. Islands: swipe deck (first card before hydration), favorites, detail actions.
14. Images through `astro:assets`: AVIF/WebP, responsive sizes.
15. Prefetch: swipe page after home load, detail pages on tap.
16. Next.js removed; deploy builds `dist/`; perf budget (`bun run perf`).

## In review
17. `fix/viewport-jitter`: stable viewport units and a fixed background layer, so the page doesn't move while mobile address bars slide.
    Open check: on a real phone (Chrome Android, iOS Safari), nothing moves except by scrolling.
18. `fix/desktop-hero` (on top of 17): split hero on wide screens with the whole lamp visible; glow removed.

## Open
19. `chore/trim-changes`: shrink plan text and add minimal-diff rules.
    - Commits: `docs: condense finished plan items`, `docs: add rules for minimal diffs`.
    - Success: `PLAN.md` ≤ 60 lines; 17 and 18 rebuilt as code-only commits whose code matches the old tips exactly; combined diff of 17 + 18 ≤ +35 / −29.
    - Failure: an open item loses its criteria; any code difference from the old branch tips.
    - Estimate: +50 / −580 (docs only).

## Known follow-ups
- `tapToSwipeCard` in the perf budget sits on its limit (279–315 ms vs 312 ms) and fails at random.
- Purchase button has no action.
- de/dk/fr/it copy needs a native-speaker review.
- Lamp source photos are 1024 px; 2x desktop screens show them slightly soft.
