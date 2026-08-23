# Product specs — dominik-pabst.com

What this site is for, who it's for, and what each route needs to do.
Facts (name, employer, talks, writing, contact details) live in `CONTENT.md`
at the repo root, not here — this file stays at root by design (four
subagent definitions and `AGENTS.md` hardcode that path; see `AGENTS.md`).

## Goals and audience

Personal site for **Dominik Pabst (DoPaNik)**, Executive Consultant for
DevOps & Platform Engineering at CGI Deutschland. Visitors are prospective
clients evaluating him for consulting engagements, conference/training
organizers looking for a speaker, and people who found him via a talk,
article, or LinkedIn and want to verify credibility before reaching out.
Primary success signal: a contact-form submission or a talk/training
booking. Secondary: being found via search for DevSecOps/Platform
Engineering topics (see `docs/QUALITY_SCORE.md` for how SEO/perf is
gated, and `CONTENT.md` for the exact title/description targets per page).

## Explicit non-goals

No CMS, no auth, no embedded social feeds, no comments, no heavy analytics
(Plausible only — cookieless, EU-hosted). These are deliberate scope cuts
for a solo-maintained static site, not gaps to fill in later.

## Routes

| Route (DE / EN)                | Purpose                                                            | Primary CTA           |
| ------------------------------ | ------------------------------------------------------------------ | --------------------- |
| `/` / `/en/`                   | Positioning + credibility at a glance (pipeline visual, role line) | talks / hire me       |
| `/about/` / `/en/about/`       | Bio, focus areas, deeper credibility (portrait, stack)             | contact               |
| `/talks/` / `/en/talks/`       | Speaking/training track record — what he's delivered, where        | contact for booking   |
| `/writing/` / `/en/writing/`   | Published articles (dev.to, LinkedIn) — thought-leadership proof   | read external article |
| `/contact/` / `/en/contact/`   | Netlify-Forms contact form + direct email/social                   | form submission       |
| `/contact/success/`            | Post-submission confirmation, `noindex`, not in sitemap            | —                     |
| `/impressum/`, `/datenschutz/` | Legal notices (German law: § 5 DDG, Art. 13 DSGVO)                 | —                     |

Bilingual routing mechanics (DE default, unprefixed; EN under `/en/`) are
documented in `ARCHITECTURE.md`.

## Content lifecycle

New talks and writing entries: add a Markdown file under
`src/content/{talks,writing}/{de,en}/` per the schema in
`src/content.config.ts`, update `CONTENT.md`'s tables, keep DE/EN frontmatter
(especially dates) identical. See `docs/exec-plans/index.md`'s tech-debt
list for known open content questions.
