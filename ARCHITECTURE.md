# ARCHITECTURE.md — dominik-pabst.com

System map for agents and humans working on this repo. For the visual
design system, see `docs/styleguide/`. For quality gates, see
`docs/QUALITY_SCORE.md`. For the CSP/security model, see `docs/SECURITY.md`.

## Stack

- **Astro** (static output, zero client JS by default) — `astro.config.mjs`.
- Node `22.13.0` (`.nvmrc`), TypeScript throughout `src/`.
- **Netlify** hosting: build via `netlify.toml`, publish `dist/`, deploy on
  push to `master` plus automatic deploy previews per PR.
- **Netlify Forms** for the contact form — no backend, no third-party form
  service.
- **Playwright** (Chromium only) for smoke/a11y/core-flow/mobile-nav tests,
  plus a separate non-blocking visual-regression project.

## Directory layout

```
src/pages/                  thin route wrappers (DE at /, EN at /en/*)
src/components/pages/       one page-body component per route (*Page.astro)
src/components/astro/       design-system primitives (Button, Input, ...)
src/components/             shared shell (Nav.astro, Footer.astro)
src/layouts/BaseLayout.astro  <head>: meta, OG/Twitter, canonical/hreflang,
                             JSON-LD, theme-FOUC guard
src/styles/tokens/          semantic CSS custom properties (source of truth)
src/styles/components/      .dpn-* component CSS
src/styles/pages/           page-specific CSS
src/scripts/                client-side TS, one file per behavior
  (nav.ts, theme-toggle.ts, theme-bootstrap.ts, ...)
src/content/{talks,writing}/{de,en}/  Markdown + frontmatter, schema in
                             src/content.config.ts
src/i18n/{de,en}.ts         all user-facing strings, typed via
                             src/i18n/types.ts — never inline UI copy
src/data/site.ts            language-agnostic facts: name, company, social
                             links, portrait path
src/lib/schema.ts           JSON-LD generators (Person, SpeakingEvent)
```

Component layering rule: `src/pages/*` stays a thin wrapper that passes
`lang`/`current` into a shared `src/components/pages/*Page.astro` body, which
composes `src/components/astro/*` primitives. Don't put page logic in
`src/pages/`.

## i18n routing

German is the default locale (unprefixed routes: `/`, `/about/`, ...);
English lives under `/en/` (`/en/about/`, ...). This is Astro's built-in i18n
routing (`astro.config.mjs` → `i18n.routing.prefixDefaultLocale: false`).
Every route has one shared page-body component, rendered by a thin wrapper
per locale in `src/pages/` and `src/pages/en/`.

## Content collections

`talks` and `writing` are Markdown + frontmatter, one file per language
under `src/content/{talks,writing}/{de,en}/`, schema defined with Zod in
`src/content.config.ts`. `CONTENT.md` (repo root) is the authoritative facts
reference for what's populated — see `docs/product-specs/index.md` for how
it fits into the rest of the docs.

## Build pipeline

```
npm run build
  → prebuild:  build:critical-scripts (scripts/build-critical-scripts.mjs)
               esbuild-bundles src/scripts/theme-bootstrap.ts into
               public/scripts/theme-bootstrap.js — the one script that must
               stay a classic, synchronous, non-module <head> script (Astro
               otherwise always emits deferred type="module" scripts, which
               would reintroduce a theme-FOUC flash)
  → build:     astro build → dist/
  → postbuild: inject-csp-hashes (scripts/inject-csp-hashes.mjs)
               scans every built HTML file for inline (non-src) <script>
               blocks, hashes each one, and appends the hashes to the
               script-src directive in dist/_headers — see
               docs/SECURITY.md for why this exists
```

**Build-generated files — do not hand-edit:**

- `public/scripts/theme-bootstrap.js` — regenerate via `npm run
build:critical-scripts`; CI fails the build if this drifts from its
  source (`git diff --exit-code public/scripts/theme-bootstrap.js`).
- `dist/_headers` — regenerated on every build from `public/_headers` +
  the current build's inline-script hashes. Edit `public/_headers`, never
  `dist/_headers` directly.
- `public/og/*.png` — regenerate via `node scripts/generate-og-image.mjs`
  after a brand tweak.
- Optimized portrait `.webp` variants — handled automatically by
  `astro:assets`, nothing to run by hand.

## Deploy

Netlify builds `npm run build` and publishes `dist/`. Security/cache headers
live in `public/_headers` (see `docs/SECURITY.md` for the CSP details) and
are copied + augmented into `dist/_headers` at build time. No manual deploy
steps — pushing to a branch with an open PR against `master` triggers a
deploy preview; merging to `master` triggers production.

## Testing

- `playwright.config.ts` defines two projects: `chromium` (the default,
  required-check suite — smoke, a11y via axe-core, core flows, mobile nav)
  and `visual` (screenshot regression, non-blocking in CI, only run via
  `npm run test:visual`).
- The project only installs/tests Chromium — see
  `docs/references/playwright-axe-llms.txt` for device-preset pitfalls this
  implies.
- `tests/site-routes.ts` is the source of truth for "all routes on the
  site"; `.lighthouserc.cjs` is kept in sync with it by hand.

## CI (`.github/workflows/ci.yml`)

Four jobs on every PR against `master` and every push to `master`:

1. **`quality`** — format check, lint, lint:css (stylelint design-token
   enforcement), typecheck (`astro check`), build, critical-script drift
   check, `npm audit --omit=dev --audit-level=high`.
2. **`tests`** — the Playwright `chromium` project (required check).
3. **`visual-regression`** — the Playwright `visual` project
   (`continue-on-error: true`, informational only).
4. **`lighthouse`** — `.lighthouserc.cjs` across all 16 routes; see
   `docs/QUALITY_SCORE.md` for current thresholds.

`master` is protected; PRs need the `quality` and `tests` jobs green before
merge (GitHub branch-protection `required_status_checks`, strict mode).
Netlify's deploy-preview check runs alongside and is worth checking, but
isn't itself a branch-protection requirement.
