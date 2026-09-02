# QUALITY_SCORE.md

Living scoreboard for this repo's quality gates. Update this file's numbers
whenever `.lighthouserc.cjs` or the test suite changes meaningfully — don't
let it drift the way `docs/arbeitspakete.md` did (see
`docs/exec-plans/completed/2026-q3-hardening-and-audit.md`).

## Lighthouse (`.lighthouserc.cjs`)

Runs in CI against all 16 routes (kept in sync by hand with
`tests/site-routes.ts`'s `smokeRoutes`), 3 runs per route, median counted.

| Assertion                      | Threshold   | Enforcement | Note                                                                |
| ------------------------------ | ----------- | ----------- | ------------------------------------------------------------------- |
| `categories:performance`       | ≥ 0.90      | `warn`      |                                                                     |
| `categories:accessibility`     | ≥ 0.95      | `warn`      |                                                                     |
| `resource-summary:script:size` | ≤ 20,000 B  | `error`     | promoted 2026-08-24; baseline measured 2026-08-20, ~30–50% headroom |
| `resource-summary:image:size`  | ≤ 50,000 B  | `error`     | promoted 2026-08-24; same baseline run                              |
| `resource-summary:total:size`  | ≤ 260,000 B | `warn`      | same baseline run                                                   |
| `unused-javascript`            | ≤ 50 ms     | `warn`      | measured 0ms everywhere today                                       |

**`script:size` and `image:size` are `error`; everything else is still
`warn`.** Warn-level budgets surface a regression in CI without blocking
the merge. The intent (documented directly in `.lighthouserc.cjs`) is to
promote budgets to `error` **one line at a time**, not all at once, once
each has proven stable across real PRs.

`script:size` and `image:size` were the first two promoted (2026-08-24):
both are static build-output byte counts (not live network/timing
measurements), had the most headroom of anything in the file, and map
directly to this site's two highest-risk regression vectors — the
matrix-effect canvas bundles and the portrait image. `total:size` is left
at `warn` because it aggregates every resource type and hasn't been proven
stable on its own yet; `unused-javascript` is left at `warn` because its
value is a timing-derived estimate with only a 50ms buffer, closer to the
"volatile" metrics this promotion plan is meant to defer; the two
`categories:*` scores are left at `warn` because they aggregate several
timing-sensitive Lighthouse audits (LCP, TBT, CLS, etc.) that are more
exposed to run-to-run noise than a static byte count.

## Accessibility (axe-core)

`tests/a11y.spec.ts` runs `@axe-core/playwright` against every route in
`smokeRoutes`, **in both themes** (dark default + `[data-theme="light"]"`,
since the known historical contrast bugs were light-theme-only). WCAG 2.1 AA
ruleset. `serious`/`critical` violations fail the test; `moderate` is
reported but not blocking.

## Visual regression

`tests/visual.spec.ts`, run via `npm run test:visual` / the CI
`visual-regression` job. **Non-blocking** (`continue-on-error: true`) — no
committed baseline screenshots yet (they can only be generated from an
actual GitHub Actions run, not locally). Until a baseline exists, this job
failing on every PR is expected, not a regression signal.

## Test suite

- 65 Playwright tests (`chromium` project) as of 2026-08-22: smoke (16
  routes), a11y (16 routes × 2 themes), core flows (contact form, theme
  persistence, language switch), mobile nav (burger/theme-toggle/scrim/
  Escape/touch-targets across 5 routes).
- Required CI check (`tests` job) — blocks merge to `master` if red.
- Chromium-only, deliberately — see
  `docs/references/playwright-axe-llms.txt` for why an iOS device preset
  would fail here rather than test anything.

## CI quality gate (`quality` job)

Format check, ESLint, Stylelint (design-token enforcement — see
`docs/styleguide/`), `astro check` (typecheck), build, critical-script
drift check, `npm audit --omit=dev --audit-level=high`. All blocking.
