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

Nothing currently in flight as a full initiative. No residual items open
from the 2026 Q3 audit.

## Tech-debt tracker

Small, standalone items noticed in passing — not big enough for a full
plan doc, but real enough to not just forget:

- `typescript` is pinned to `^6.0.3` while `7.0.2` is available on npm — a
  major bump, deliberately not part of routine patch/minor dependency
  maintenance (2026-08 sweep bumped astro, eslint, lucide-static, satori
  in-range; typescript was left untouched). The version gap will keep
  growing; needs its own review round (breaking-change scan, `tsconfig`
  compat, `@astrojs/check` compat) before adopting. Not yet scheduled.

## Completed

- **Impressum/Datenschutz notice restored (2026-09-05).** Re-added the
  source-attribution / EN convenience-translation notice removed by
  `5bba615` — as a plain paragraph (`.dpn-legal__notice`, no border/
  background box), per user decision. While restoring it, also fixed a
  pre-existing attribution mismatch: the Impressum's "Erstellt mit…" seal
  cited Datenschutz-Generator.de (that generator's content actually
  belongs to the Datenschutzerklärung); the Impressum is based on
  e-recht24.de per the original banner text, confirmed with the user. Seal
  swapped accordingly, and a matching Datenschutz-Generator.de seal added
  to the Datenschutz page (it previously had none). Also folded in a
  flexdienst address change (Kurt-Schumacher-Straße 76 → 74) that arrived
  mid-task; both pages' `updated` date bumped to 2026-09-05.
- [`2026-q3-hardening-and-audit.md`](completed/2026-q3-hardening-and-audit.md)
  — Pakete 1–4 (quick wins, test/a11y/Lighthouse infrastructure, CSP
  hardening, Astro best-practice audit).
- **AP1-5:** the talks page's `seoDescription` (DE + EN, `src/i18n/de.ts` /
  `src/i18n/en.ts`) was ~123/~119 characters, under the 140–155 target the
  rest of the site hits, and still referenced the removed 2023 IT-Tage
  entry. Rewritten to 143 characters each, dropping the stale "2023 & 2025"
  reference in favor of the current, verified "IT-Tage Frankfurt 2025,
  heise Academy" facts (see `CONTENT.md`).
- **AP1-3 — closed, superseded (2026-08-24).** The original "hero status
  line driven by the talks collection" concept is obsolete. Verified
  against the current hero (`src/components/pages/HomePage.astro`): the
  hero's right column renders a static `TerminalWindow` with hardcoded
  DevSecOps-pipeline steps (`h.pipeline.*` from `src/i18n/{de,en}.ts`) —
  no query against the talks content collection, no next-talk badge, no
  `hero__status` markup anywhere in the component or
  `src/styles/pages/home.css`. That confirms the redesign (comic
  illustration → pipeline terminal, see git history: `a1513db feat:
replace hero comic illustration with a DevSecOps pipeline terminal`)
  fully replaced the status-line idea rather than leaving it
  half-implemented. No action needed; reopen as a fresh feature request if
  a "next talk" surface is wanted again — it would need a new design pass
  against the current pipeline-terminal layout, not a revival of the old
  concept.
