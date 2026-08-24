# Exec plans — dominik-pabst.com

How work on this repo is planned, tracked, and closed out. Historical
initiatives live under `completed/`; this file is the current status plus a
lightweight running list for anything too small to warrant its own plan
doc.

## Methodology

1. **One task = one commit/PR.** Conventional Commits (`fix:`, `feat:`,
   `test:`, `chore:`, `docs:`, `refactor:`).
2. **Definition of Done** for any change: `npm run format:check`,
   `npm run lint`, `npm run lint:css`, `npm run typecheck`, `npm run build`
   all green; both locales checked where content is affected; both themes
   (dark default, `[data-theme="light"]`) checked where UI is affected; no
   new browser console errors — verified on a real Netlify deploy preview
   for anything security-header-related (see `docs/RELIABILITY.md`).
3. **Keep this file honest.** `docs/arbeitspakete.md` (this file's
   predecessor) went ~95% stale-complete without anyone noticing — see
   `completed/2026-q3-hardening-and-audit.md` for the full story. Update
   the table below in the same PR that closes an item; don't let status
   drift from reality.
4. **Bugs get filed as GitHub Issues**, closed by whichever PR fixes them
   — going forward. Historical bugs already closed out via a merged PR
   don't get backfilled.

## Active

Nothing currently in flight as a full initiative. One small residual item
from the 2026 Q3 audit, not yet resolved:

- **AP1-3 (decision needed):** the original "hero status line driven by
  the talks collection" concept was superseded by a redesign (static
  deploy-pipeline visual). Needs an explicit call: close it as
  intentionally superseded, or revive the underlying idea (surface the
  next upcoming talk somewhere) against the current design.

## Tech-debt tracker

Small, standalone items noticed in passing — not big enough for a full
plan doc, but real enough to not just forget:

- `docs/styleguide/06-components.md`'s component table lists
  `.dpn-icon-btn`; the actual class in `src/styles/components/icon-
button.css` is `.dpn-iconbtn` (no hyphen). Doc is stale.
- The same file's `TerminalWindow` code example still shows inline
  `style="background:var(--danger)"` on the traffic-light dots; the real
  component no longer renders inline styles this way (confirmed via
  `grep -rn 'style=' src/components/` returning nothing). Doc is stale.
- Open content question from the Impressum/Datenschutz cleanup: the
  removed EN "this translation is for convenience only, the German version
  is legally binding" notice — confirm with the user whether it should
  come back as plain text (no box), or whether dropping it entirely was
  fine.

## Completed

- [`2026-q3-hardening-and-audit.md`](completed/2026-q3-hardening-and-audit.md)
  — Pakete 1–4 (quick wins, test/a11y/Lighthouse infrastructure, CSP
  hardening, Astro best-practice audit).
- **AP1-5:** the talks page's `seoDescription` (DE + EN, `src/i18n/de.ts` /
  `src/i18n/en.ts`) was ~123/~119 characters, under the 140–155 target the
  rest of the site hits, and still referenced the removed 2023 IT-Tage
  entry. Rewritten to 143 characters each, dropping the stale "2023 & 2025"
  reference in favor of the current, verified "IT-Tage Frankfurt 2025,
  heise Academy" facts (see `CONTENT.md`).
