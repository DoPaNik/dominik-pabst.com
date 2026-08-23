# Completed: 2026 Q3 hardening & Astro best-practice audit

Migrated and re-audited from `docs/arbeitspakete.md` (deleted; this is its
replacement). Original baseline: branch `master` @ `86e8caa`
(Paket 1–3) then `97ef975` (Paket 4), German work-package IDs (AP*)
preserved for traceability. Re-audited against live repo state on
2026-08-22 while writing this file — see the "Audit note" callouts where
reality diverged from the original plan text.

## Methodology (used throughout, now living in `docs/exec-plans/index.md`)

One task = one commit/PR, Conventional Commits, Definition of Done =
format/lint/lint:css/typecheck/build green + both locales + both themes +
no new console errors.

## Paket 1 — Quick Wins

| AP    | Title                                               | Status                                                                                                                                                                                                                                                                                                            |
| ----- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AP1-1 | `og:image` auf Querformat-Social-Card umstellen     | ✅ Done — `BaseLayout.astro`'s `ogImage` prop defaults to `/og/dopanik.png`; About overrides with the portrait.                                                                                                                                                                                                   |
| AP1-2 | Dependabot für npm einrichten                       | ✅ Done — `.github/dependabot.yml` (npm weekly + github-actions weekly, grouped minor/patch).                                                                                                                                                                                                                     |
| AP1-4 | Illustrations-System: Entscheidung treffen          | ✅ Done — Option A (gezielt einbauen). Illustrations live on About and Contact.                                                                                                                                                                                                                                   |
| AP1-5 | SEO-Feinschliff: Titles/Descriptions                | ✅ Mostly done — all `seoTitle`s ≤ 60 chars (54–58); all `seoDescription`s in the 140–155 target range **except talks (123 chars)**. See `docs/exec-plans/index.md`'s open items.                                                                                                                                 |
| AP1-7 | Platzhalter-Daten klären                            | ✅ Done — no `placeholder: true` or fallback dates remain in `src/content/`.                                                                                                                                                                                                                                      |
| AP1-3 | Hero-Status-Zeile aus der talks-Collection ableiten | ⚠️ Superseded — the hero was redesigned to a static "deploy → production" pipeline visual with no talks-collection dependency at all. The original problem (a manually-maintained, staleness-prone status string) no longer exists in this form. See `docs/exec-plans/index.md` for the close-or-revive decision. |
| AP1-6 | `CONTENT.md` auf den aktuellen Stand bringen        | ✅ Done — `CONTENT.md` is already the reduced Key-Facts reference this task specified.                                                                                                                                                                                                                            |

## Paket 2 — Sicherheitsnetze

**Audit note:** none of these three items had a `Status:` marker in the
original file, but all are functionally complete in the live repo.

| AP    | Title                                               | Status                                                                                                                                  |
| ----- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| AP2-1 | Playwright-Infrastruktur + Smoke-Tests, alle Routen | ✅ Done — `tests/smoke.spec.ts`, `playwright.config.ts`, CI `tests` job, required check.                                                |
| AP2-2 | Automatisierte A11y-Checks (axe-core), beide Themes | ✅ Done — `tests/a11y.spec.ts`, WCAG 2.1 AA, serious/critical blocking.                                                                 |
| AP2-3 | Lighthouse-CI mit Performance-Budget                | ✅ Done, broader than planned — original scope was `/` and `/about/` only; shipped covering all 16 routes. See `docs/QUALITY_SCORE.md`. |

## Paket 3 — Strukturelle Härtung

| AP    | Title                                          | Status                                                   |
| ----- | ---------------------------------------------- | -------------------------------------------------------- |
| AP3-1 | Kernflow-Tests: Formular, Theme, Sprachwechsel | ✅ Done — `tests/core-flows.spec.ts`.                    |
| AP3-2 | Inline-Styles/Scripts CSP-fähig machen         | ⚠️ Done via a different approach — see audit note below. |
| AP3-3 | CSP verschärfen: `unsafe-inline` entfernen     | ⚠️ Premise was already moot — see audit note below.      |

**Audit note (AP3-2/AP3-3):** the original plan's two assumptions were
incorrect. (a) JSON-LD `<script type="application/ld+json">` blocks are
non-executable but are still subject to `script-src` like any other
`<script>` element — browsers evaluate CSP against the element, not its
content. (b) Astro's build also inlines small component scripts (`nav.ts`,
the theme-toggle handler) as `<script type="module">`, with no way to opt
out from the component side, so "eliminate inline scripts one by one" isn't
a stable fix. `public/_headers` already had no `'unsafe-inline'` (AP3-3's
stated goal was already true) — the actual gap was that the strict CSP had
no hashes for the inline content it was already blocking. Fixed with
`scripts/inject-csp-hashes.mjs`, a postbuild step that hashes every inline
script in the built HTML automatically. See `docs/SECURITY.md` for the full
mechanism.

## Paket 4 — Astro-Best-Practice-Audit

All 11 items explicitly marked done in the original file (2026-08-20 to
2026-08-21); re-confirmed still accurate at audit time.

| AP     | Title                                                            | Note                                                                                                                                  |
| ------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| AP4-1  | JS-Auslieferung entduplizieren, durch Astro/Vite-Pipeline führen | Eliminated a 4x-duplicated matrix-engine; all scripts except the FOUC-critical theme-bootstrap now go through Vite's normal bundling. |
| AP4-2  | `astro:assets` für alle Bilder nutzen                            |                                                                                                                                       |
| AP4-3  | Lighthouse-Budget auf alle Routen ausweiten                      | Verified: 48/48 runs green.                                                                                                           |
| AP4-4  | Harte Ressourcen-Budgets (Audit-Modus, vorbereitet für Blocking) | Thresholds now tracked in `docs/QUALITY_SCORE.md` (all still `warn`, none promoted to `error` yet).                                   |
| AP4-5  | Design-Token-Governance automatisieren (Stylelint)               | Shipped with a deliberately narrower scope than originally planned.                                                                   |
| AP4-6  | Datenschutzfreundliches Tracking (Plausible) + Field-Performance |                                                                                                                                       |
| AP4-7  | RSS-Feed für die Writing-Collection                              |                                                                                                                                       |
| AP4-8  | Dynamische OG-Image-Generierung                                  | `scripts/generate-og-image.mjs`.                                                                                                      |
| AP4-9  | Nachgelagertes Aufräumen (Restspuren aus AP4-1)                  |                                                                                                                                       |
| AP4-10 | Visuelles Regressionstesting                                     | Infrastructure done; baseline screenshots still don't exist — see `docs/QUALITY_SCORE.md`.                                            |
| AP4-11 | font-size-Bereinigung (Fund aus AP4-5)                           |                                                                                                                                       |
