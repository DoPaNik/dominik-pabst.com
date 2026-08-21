# CONTENT.md — Content & SEO Implementation Guide

This file is the authoritative reference for all content on dopanik.de.
It captures what is active, what is archived, and the factual constraints for future edits.

---

## What Has Been Done (Content Layer)

All content files are populated with real, SEO-optimized content. Do not overwrite with placeholders.

### i18n Files

- `src/i18n/de.ts` — Updated: richer bio, improved talks/writing intros, better contact intro
- `src/i18n/en.ts` — Same updates in English

### site.ts

- `src/data/site.ts` — Added `photo` field (local portrait path)

### Talks (`src/content/talks/`)

Verified 2026-08-21 against the actual event/course pages (see each file's
`url`). No 2026 entry exists: the user confirmed there is no 2026 IT-Tage
workshop — they aren't on-site that year — so the previously-listed
"upcoming" 2026 talk (which never had a real source) was removed rather
than kept as a guess.

The 2023 IT-Tage entry was removed on 2026-08-21: it was a near-duplicate
of the 2025 IT-Tage entry (identical talk topic/title, same event series)
and the user confirmed it can go. The 2025 IT-Tage workshop is a confirmed
on-site event in Frankfurt am Main (user was present in person).

| File                                 | Event             | Year | Status                                        |
| ------------------------------------ | ----------------- | ---- | --------------------------------------------- |
| `de/2024-heise-webinar-devsecops.md` | heise Academy     | 2024 | ✅ Verified (`type: webinar`, 3-part, online) |
| `en/2024-heise-webinar-devsecops.md` | heise Academy     | 2024 | ✅ Verified (`type: webinar`, 3-part, online) |
| `de/2025-it-tage-devsecops.md`       | IT-Tage Frankfurt | 2025 | ✅ Verified                                   |
| `en/2025-it-tage-devsecops.md`       | IT-Tage Frankfurt | 2025 | ✅ Verified                                   |
| `de/heise-academy-devsecops-ki.md`   | heise Academy     | 2025 | ✅ Verified (4 sessions, `online: true`)      |
| `en/heise-academy-devsecops-ki.md`   | heise Academy     | 2025 | ✅ Verified (4 sessions, `online: true`)      |

All talks list Andreas Falk as `coInstructor`, linked via `coInstructorUrl`
to <https://www.linkedin.com/in/andifalk/>.

### Writing (`src/content/writing/`)

| File                               | Source         | Date          |
| ---------------------------------- | -------------- | ------------- |
| `de/devto-devops-sdlc.md`          | dev.to         | Sep 2023      |
| `en/devto-devops-sdlc.md`          | dev.to         | Sep 2023      |
| `de/devto-7-mythen.md`             | dev.to         | Nov 2022      |
| `en/devto-7-myths.md`              | dev.to         | Nov 2022      |
| `de/devto-iac.md`                  | dev.to         | Mar 2021      |
| `en/devto-iac.md`                  | dev.to         | Mar 2021      |
| `de/linkedin-ki-wissensarbeit.md`  | LinkedIn Pulse | —             |
| `en/linkedin-ai-knowledge-work.md` | LinkedIn Pulse | —             |
| `de/devto-profile.md`              | dev.to         | — (catch-all) |
| `en/devto-profile.md`              | dev.to         | — (catch-all) |

**Writing sort order:** Sort by `date` descending. Items without a date go last.

---

## Current State

- `src/data/site.ts` is the single source for identity, contact, socials, and the local portrait asset.
- `src/layouts/BaseLayout.astro` renders canonical, hreflang, OG, Twitter, JSON-LD, and the theme FOUC guard.
- `src/i18n/de.ts` and `src/i18n/en.ts` carry all user-facing strings, including SEO titles/descriptions.
- `src/content/talks/*` contains the dated talks; `src/content/writing/*` contains dated writing and undated catch-alls.
- `src/lib/schema.ts` emits `Person` and `SpeakingEvent` JSON-LD; undated talks do not emit a fake Jan-1 fallback.
- `src/components/pages/WritingPage.astro` sorts writing newest-first and leaves undated entries last.
- `src/components/pages/TalksPage.astro` sorts talks newest-first by year.
- `@astrojs/sitemap` is enabled in `astro.config.mjs` with the production site URL.

## Archive

- The earlier implementation checklist has been retired.
- Historical placeholders such as the Informatik-Aktuell stub have been removed from the active content set.
- The LinkedIn writing entry remains, but without a placeholder publication date.

---

## Key Facts (Do Not Change Without Updating This File)

| Field               | Value                                                                        |
| ------------------- | ---------------------------------------------------------------------------- |
| Full name           | Dominik Pabst                                                                |
| Current employer    | CGI Deutschland                                                              |
| Previous employer   | Novatec Consulting (acquired by CGI, June 2025)                              |
| Role                | Executive Consultant — DevOps & Platform Engineering                         |
| Location            | Stuttgart, Germany                                                           |
| Email               | hi@dopanik.de                                                                |
| LinkedIn            | https://www.linkedin.com/in/dominikpabst/                                    |
| GitHub              | https://github.com/dopanik                                                   |
| dev.to              | https://dev.to/dopanik                                                       |
| IT-Tage years       | 2025 (on-site, Frankfurt); 2023 entry removed as duplicate; no 2026 workshop |
| heise Academy       | 2024 webinar series, 2025 classroom                                          |
| Talks co-instructor | Andreas Falk — <https://www.linkedin.com/in/andifalk/>                       |
| Photo               | see `site.photo` in `src/data/site.ts`                                       |
| Certifications      | None currently                                                               |
