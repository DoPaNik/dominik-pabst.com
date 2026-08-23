# FRONTEND.md

Astro/TypeScript coding conventions for this repo, beyond what
`ARCHITECTURE.md` covers structurally and `docs/styleguide/` covers
visually.

## Component layering

`src/pages/*` is a thin wrapper: it resolves `lang`/`current` and renders a
shared `src/components/pages/*Page.astro` body. Put page logic and markup
in the page-body component, not the route file — the route file's only job
is being the DE/EN entry point. Page bodies compose
`src/components/astro/*` primitives (Button, Input, IconButton, ...); reuse
before building; extend before forking (see `docs/styleguide/06-
components.md` for the existing inventory).

## i18n string discipline

Every user-facing string goes through `src/i18n/{de,en}.ts`, typed via
`src/i18n/types.ts`. Never inline a string in a component — even a short
one. `src/data/site.ts` holds the language-agnostic facts (name, company,
social URLs); don't duplicate those into the i18n dictionaries either.

## The CSS cascade-specificity-tie trap

Two selectors with equal specificity resolve by **source order in the final
bundle**, not by which one is "obviously" more specific in intent. Astro
bundles component-scoped CSS (imported directly by a `.astro` file) and
globally-imported CSS (via `global.css`'s `@import` chain) together, and the
resulting order is not guaranteed to match import order.

Concretely: `src/styles/components/nav.css` is imported directly by
`Nav.astro`, while `src/styles/components/icon-button.css` is imported
globally via `global.css`. A bare `.dpn-nav__burger { display: none; }`
(specificity 0,1,0) and `.dpn-iconbtn { display: inline-grid; }` (also
0,1,0) tie — and whichever landed later in the built CSS file wins
silently, regardless of which rule reads as more specific in intent.

**Rule:** when a component-scoped rule needs to override a globally-
imported base class (or vice versa), scope the selector to win the
specificity tie deterministically — don't rely on import/bundle order.
Example fix actually used: `.dpn-nav__actions .dpn-nav__burger { display:
none; }` instead of the bare `.dpn-nav__burger` rule.

## Script bundling and CSP

Component `<script>` tags without `is:inline` are compiled by Astro/Vite
and can end up either as an external `/_astro/*.js` file **or inlined
directly into the HTML** as `<script type="module">`, depending on chunk
size and how many entry points use it — this is a build-time decision, not
something the component author controls. Inlined scripts are subject to
the CSP `script-src` directive exactly like any other inline script. See
`docs/SECURITY.md` for the mechanism that handles this
(`scripts/inject-csp-hashes.mjs`) and why it's necessary.

## Testing conventions

New interactive behavior needs a Playwright test in the appropriate spec
file (`tests/smoke.spec.ts`, `tests/a11y.spec.ts`, `tests/core-flows.spec.ts`,
`tests/mobile-nav.spec.ts`) — see `docs/QUALITY_SCORE.md` for what's
already covered. Mobile-specific tests must use an Android device preset
(e.g. `devices['Pixel 5']`), not an iOS one — see
`docs/references/playwright-axe-llms.txt`.
