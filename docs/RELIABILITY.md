# RELIABILITY.md

Deploy pipeline, required checks, and how to verify a change actually
shipped. See `ARCHITECTURE.md` for the build pipeline and `docs/SECURITY.md`
for the CSP mechanism referenced below.

## Deploy pipeline

```
push to a branch → PR opened against master
  → Netlify deploy preview builds (npm run build, publish dist/)
  → GitHub Actions CI runs (4 jobs, see ARCHITECTURE.md § CI)
  → branch-protection required checks: `quality`, `tests`
merge to master → Netlify production build → live on dopanik.de
```

`master` is branch-protected: `quality` and `tests` must be green before
merge (`required_status_checks`, strict mode — the branch must also be
up to date with `master`). Netlify's deploy-preview check runs and is
worth checking before merging, but is not itself a branch-protection
requirement. `visual-regression` and `lighthouse` run but do not block
(Lighthouse's budgets are currently informational — see
`docs/QUALITY_SCORE.md`).

## Post-deploy freshness check

The footer renders a small build-commit link (`Footer.astro`,
`import.meta.env.PUBLIC_BUILD_COMMIT` / `PUBLIC_BUILD_TIME`, injected via
`astro.config.mjs`'s `vite.define` from Netlify's `COMMIT_REF` env var).
After a deploy, check the footer shows the commit you expect before
concluding a fix "doesn't work" on the live site — this exists specifically
because a stale browser/CDN cache is easy to mistake for a regression.

## Testing policy: verify security-header-dependent behavior on a real deploy preview

Local Playwright runs (`npm test`) build with `astro build` and serve with
`astro preview` — which **does not** send the Netlify `_headers` CSP (see
`docs/SECURITY.md`). Any bug that could plausibly involve CSP, or any change
to `public/_headers` itself, must be checked against a real deploy preview
URL (`https://deploy-preview-<PR#>--dopanik-portfolio.netlify.app`), not
just the local test suite. This is not a hypothetical: the CSP incident in
`docs/SECURITY.md` passed 65/65 local Playwright tests while being
completely broken in production.

## Known local-dev gotcha: `astro preview`/`astro dev` daemonize

Both commands detach into a background daemon (tracked by a pidfile,
managed via `astro dev status|stop` / `astro preview stop`), independent of
the shell that started them. This causes two recurring failure modes:

- **Stale server serving old output.** After rebuilding, `npm run preview`
  may print `Preview server already running at ... (pid ...)` and keep
  serving the **previous** build if a daemon from an earlier session is
  still alive. Symptom: a fix that should work still appears broken.
- **Playwright's `webServer` flaking** with `Error: Process from
config.webServer exited early`. `playwright.config.ts`'s
  `reuseExistingServer: !process.env.CI` races against the daemon
  spawn/detach sequence locally; the wrapper shell process can exit before
  Playwright's readiness probe resolves, even though the daemon itself
  comes up fine a moment later.

**Fix, before retrying either symptom:**

```sh
npx astro preview stop   # or: npx astro dev stop
lsof -ti:4322 | xargs -r kill -9   # port from playwright.config.ts
```

Then rerun. If `npm test` fails with the "exited early" error, check
`npx astro preview status` immediately after — the daemon is very often
already up and serving; `npx playwright test --project=chromium` (skipping
the `build && preview` wrapper) will usually succeed against it directly.
