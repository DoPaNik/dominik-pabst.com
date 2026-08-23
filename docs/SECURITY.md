# SECURITY.md

Security posture and the CSP mechanism for dominik-pabst.com. See
`ARCHITECTURE.md` for the build pipeline this fits into, `docs/RELIABILITY.md`
for the deploy-verification workflow this drives.

## Content-Security-Policy

Source: `public/_headers`, applied to `/*`:

```
Content-Security-Policy: default-src 'self'; script-src 'self'
https://plausible.io; style-src 'self'; img-src 'self' data:; font-src
'self'; connect-src 'self' https://plausible.io; object-src 'none';
base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```

No `'unsafe-inline'` anywhere. That's deliberately strict — and it's exactly
what broke navigation and the theme toggle in production for a full day
before this was understood (see the incident below).

### Why `scripts/inject-csp-hashes.mjs` exists

CSP's `script-src` applies to **every** `<script>` element, regardless of
`type`. Two things in this codebase are inline `<script>` content, not
`src="..."` references, and both were silently blocked before this
mechanism existed:

1. **`<script type="application/ld+json">` (JSON-LD structured data).**
   It looks like inert data, and it is non-executable — but browsers still
   evaluate it against `script-src` before allowing it to render at all.
   Assuming JSON-LD is exempt from CSP is a common, wrong assumption (see
   `docs/exec-plans/completed/2026-q3-hardening-and-audit.md`, AP3-2 — the
   original plan for this repo made exactly that assumption).
2. **Astro's own build output.** Small client-side scripts
   (`src/scripts/nav.ts`, the theme-toggle click handler, the hero
   role-rotator) get compiled into `<script type="module">` blocks that
   Astro/Vite **inlines directly into the HTML** rather than extracting to
   an external `/_astro/*.js` file, when the resulting chunk is small and
   only used by one entry point. There is no `is:inline` involved and no
   way to opt out from the component side — it's a build-time decision.

Because `public/_headers` is one static file applied to every route, and
because both the JSON-LD content and the exact inline-script bundling
differ per build, hand-writing hashes into `public/_headers` isn't viable.
Instead, `scripts/inject-csp-hashes.mjs` runs as a `postbuild` step: it
scans every generated HTML file under `dist/`, computes the SHA-256 hash of
every inline (non-`src`) `<script>` block it finds, and appends
`'sha256-...'` sources to the `script-src` directive in `dist/_headers`.
This is fully automatic and covers any future inline script the build
produces — nothing to remember to update by hand.

### The incident this fixed

Production nav and theme toggle silently didn't work — not an iOS-specific
bug, not a caching issue, though it looked exactly like both at first. Root
cause: `public/_headers`' `script-src` had no hash/nonce for the inlined
`nav.ts`/theme-toggle bundles, so **every** browser refused to execute
them. Local Playwright runs never caught it because `astro preview` does
not send the Netlify `_headers` CSP at all — see the gotcha below and
`docs/RELIABILITY.md`.

### Gotcha: CSP is not enforced locally

`astro dev` and `astro preview` never apply `public/_headers` — that file
is a Netlify-specific convention, read only by Netlify's own server. Any
change to CSP, or any bug that could plausibly be a CSP violation, must be
verified against a **real Netlify deploy preview**, not just a local
Playwright run. See `docs/RELIABILITY.md`'s testing-policy note.

## Other headers (`public/_headers`)

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Cache-Control: public, max-age=31536000, immutable` on `/fonts/*` and
  `/_astro/*` (both are content-hashed, safe to cache forever)

## Dependency security

- `npm audit --omit=dev --audit-level=high` runs in CI (`quality` job) on
  every PR and push to `master`.
- `.github/dependabot.yml` — weekly scans for both the `npm` and
  `github-actions` ecosystems, PR limit 5, minor/patch npm updates grouped
  to reduce noise.
- Secret Scanning + Push Protection and CodeQL default setup (JS/TS +
  Actions) are enabled on the GitHub repo (repo Settings, not something
  tracked in this codebase).

### Accepted risk: Dependabot alert #18 (`extract-zip`)

Dismissed (`tolerable_risk`) on 2026-08-23. High-severity symlink
path-traversal, but it's a transitive devDependency
(`@lhci/cli` → `lighthouse` → `puppeteer-core` → `extract-zip`) used only to
unzip locally-downloaded Chrome binaries during Lighthouse CI — never
reachable from the deployed site, and `npm audit --omit=dev` (what CI
actually runs) already excludes it. No fix exists upstream as of the
dismissal date (`extract-zip@2.0.1` is the latest release and still
affected). Revisit when `@lhci/cli` publishes a fix.

## Secrets posture

None. Netlify Forms handles the contact form with no backend, no API keys,
no environment secrets checked into the repo or required at build time.
