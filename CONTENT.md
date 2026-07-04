# CONTENT.md — Content & SEO Implementation Guide

This file is the authoritative reference for all content on dopanik.de.
It tells Claude Code what has been populated, what still needs implementing, and how.

---

## What Has Been Done (Content Layer)

All content files are populated with real, SEO-optimized content. Do not overwrite with placeholders.

### i18n Files

- `src/i18n/de.ts` — Updated: richer bio, improved talks/writing intros, better contact intro
- `src/i18n/en.ts` — Same updates in English

### site.ts

- `src/data/site.ts` — Added `photo` field (remote URL, portrait photo)

### Talks (`src/content/talks/`)

| File                               | Event             | Year | Status          |
| ---------------------------------- | ----------------- | ---- | --------------- |
| `de/2023-it-tage-devsecops.md`     | IT-Tage Frankfurt | 2023 | ✅ Real content |
| `en/2023-it-tage-devsecops.md`     | IT-Tage Frankfurt | 2023 | ✅ Real content |
| `de/2025-it-tage-devsecops.md`     | IT-Tage Frankfurt | 2025 | ✅ Updated      |
| `en/2025-it-tage-devsecops.md`     | IT-Tage Frankfurt | 2025 | ✅ Updated      |
| `de/2026-it-tage-devsecops.md`     | IT-Tage Frankfurt | 2026 | ✅ Upcoming     |
| `en/2026-it-tage-devsecops.md`     | IT-Tage Frankfurt | 2026 | ✅ Upcoming     |
| `de/heise-academy-devsecops-ki.md` | heise Academy     | 2025 | ✅ Updated      |
| `en/heise-academy-devsecops-ki.md` | heise Academy     | 2025 | ✅ Updated      |

### Writing (`src/content/writing/`)

| File                                   | Source             | Date          |
| -------------------------------------- | ------------------ | ------------- |
| `de/devto-devops-sdlc.md`              | dev.to             | Sep 2023      |
| `en/devto-devops-sdlc.md`              | dev.to             | Sep 2023      |
| `de/devto-7-mythen.md`                 | dev.to             | Nov 2022      |
| `en/devto-7-myths.md`                  | dev.to             | Nov 2022      |
| `de/devto-iac.md`                      | dev.to             | Mar 2021      |
| `en/devto-iac.md`                      | dev.to             | Mar 2021      |
| `de/linkedin-ki-wissensarbeit.md`      | LinkedIn Pulse     | 2024          |
| `en/linkedin-ai-knowledge-work.md`     | LinkedIn Pulse     | 2024          |
| `de/informatik-aktuell-placeholder.md` | Informatik Aktuell | TBD           |
| `en/informatik-aktuell-placeholder.md` | Informatik Aktuell | TBD           |
| `de/devto-profile.md`                  | dev.to             | — (catch-all) |
| `en/devto-profile.md`                  | dev.to             | — (catch-all) |

**Writing sort order:** Sort by `date` descending. Items without a date go last.

---

## What Claude Code Still Needs to Implement

### 1. Profile Photo on About Page

**Photo URL** (already in `src/data/site.ts` as `site.photo`):

```
https://heise.cloudimg.io/v7/https://images.ctfassets.net/3ujuzjed3id8/6566ZA8PfVFTyCwwbUO17D/7bd437a2561ed3251834a7e8583ce58b/Novatec_Mitarbeiterportraits_Dominik_Pabst_003.jpg?org_if_sml=1&w=800&gray=1&bright=10&sharp=1&q=80&optipress=2
```

**Where:** `src/components/pages/AboutPage.astro`

Replace the `<Illustration name="dev" tone="ink" decorative />` block with an `<img>` element:

```astro
import {site} from '../../data/site'; // ...
<img
  src={site.photo}
  alt="Dominik Pabst — Executive Consultant DevOps & Platform Engineering"
  class="dpn-about__photo"
  width="480"
  height="480"
  loading="lazy"
/>
```

Add CSS for `.dpn-about__photo`:

```css
.dpn-about__photo {
  width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  object-fit: cover;
  border: 1px solid var(--border);
  display: block;
}
```

---

### 2. Meta Titles & Descriptions (SEO)

Add `<meta name="description">` and `<title>` to `src/layouts/BaseLayout.astro`.
The layout already receives `title` and `description` props — ensure they are rendered in `<head>`.

**Per-page targets:**

| Page       | Title (DE)                                                            | Description (DE)                                                                                                                                             |
| ---------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/` (Home) | `Dominik Pabst – DevSecOps & Platform Engineering \| CGI Deutschland` | `Executive Consultant für DevSecOps, Platform Engineering und Cloud bei CGI Deutschland. Speaker auf den IT-Tagen Frankfurt. Trainer bei der heise Academy.` |
| `/about`   | `Über mich – Dominik Pabst \| DevSecOps Consultant & Speaker`         | `Über Dominik Pabst: Executive Consultant bei CGI Deutschland, Speaker auf den IT-Tagen Frankfurt, Trainer bei heise Academy für DevSecOps und KI.`          |
| `/talks`   | `Vorträge & Workshops – Dominik Pabst \| DevSecOps Speaker`           | `Workshops und Vorträge zu DevSecOps, Platform Engineering und KI-Sicherheit – IT-Tage Frankfurt 2023, 2025 & 2026, heise Academy.`                          |
| `/writing` | `Artikel & Beiträge – Dominik Pabst \| DevSecOps & DevOps`            | `Technische Artikel zu DevOps, DevSecOps, CI/CD und Infrastructure as Code von Dominik Pabst.`                                                               |
| `/contact` | `Kontakt – Dominik Pabst \| DevSecOps Consulting & Training`          | `Jetzt Kontakt aufnehmen: Anfragen für DevSecOps Consulting, Training und Speaking-Auftritte.`                                                               |

Same pattern for EN pages — use English equivalents.

---

### 3. Open Graph & Twitter Card Tags

Add to `BaseLayout.astro` `<head>`:

```html
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:url" content="{`${site.url}${Astro.url.pathname}`}" />
<meta property="og:image" content="{site.photo}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Dominik Pabst" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="{site.photo}" />
```

---

### 4. Schema.org Structured Data

Add to home page (`src/pages/index.astro` and `src/pages/en/index.astro`):

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dominik Pabst",
    "jobTitle": "Executive Consultant — DevOps & Platform Engineering",
    "worksFor": {
      "@type": "Organization",
      "name": "CGI Deutschland"
    },
    "url": "https://dopanik.de",
    "image": "https://heise.cloudimg.io/v7/...",
    "sameAs": [
      "https://www.linkedin.com/in/dominikpabst/",
      "https://github.com/dopanik",
      "https://dev.to/dopanik"
    ],
    "knowsAbout": [
      "DevSecOps",
      "Platform Engineering",
      "Cloud",
      "CI/CD",
      "GitOps",
      "Infrastructure as Code",
      "AI in software development"
    ]
  }
</script>
```

Add `Event` schema for each talk on the talks page (optional, but good for speaking engagements).

---

### 5. Writing Page — Sort by Date

In `src/components/pages/WritingPage.astro` (or wherever writing entries are rendered),
sort entries by `date` descending. Entries without a `date` should appear last.

Example sort logic:

```ts
const sorted = entries.sort((a, b) => {
  if (!a.data.date) return 1;
  if (!b.data.date) return -1;
  return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
});
```

---

### 6. Talks Page — Sort by Year Descending

Talks should appear newest-first (2026, 2025, 2023). Verify the TalksPage component sorts by `year` descending.

---

### 7. Canonical URLs

Add to `BaseLayout.astro`:

```html
<link rel="canonical" href="{`${site.url}${Astro.url.pathname}`}" />
```

For the DE page at `/about` and the EN counterpart at `/en/about`, add:

```html
<link rel="alternate" hreflang="de" href="https://dopanik.de/about" />
<link rel="alternate" hreflang="en" href="https://dopanik.de/en/about" />
<link rel="alternate" hreflang="x-default" href="https://dopanik.de/about" />
```

---

### 8. Sitemap

Verify `@astrojs/sitemap` is configured in `astro.config.mjs` with `site: 'https://dopanik.de'`.
This generates `/sitemap-index.xml` automatically on build.

---

## Key Facts (Do Not Change Without Updating This File)

| Field                    | Value                                                |
| ------------------------ | ---------------------------------------------------- |
| Full name                | Dominik Pabst                                        |
| Current employer         | CGI Deutschland                                      |
| Previous employer        | Novatec Consulting (acquired by CGI, June 2025)      |
| Role                     | Executive Consultant — DevOps & Platform Engineering |
| Location                 | Stuttgart, Germany                                   |
| Email                    | hi@dopanik.de                                        |
| LinkedIn                 | https://www.linkedin.com/in/dominikpabst/            |
| GitHub                   | https://github.com/dopanik                           |
| dev.to                   | https://dev.to/dopanik                               |
| IT-Tage years            | 2023, 2025, 2026 (all with Andreas Falk)             |
| heise Academy co-trainer | Andreas Falk                                         |
| Photo                    | see `site.photo` in `src/data/site.ts`               |
| Certifications           | None currently                                       |
