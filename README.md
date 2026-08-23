# dopanik.de

Personal site of Dominik Pabst — Executive Consultant for DevOps & Platform
Engineering at CGI Deutschland, speaker, and trainer. Built with
[Astro](https://astro.build), hosted on [Netlify](https://netlify.com).

For the full system map (directory layout, build pipeline, CI, testing),
see [`ARCHITECTURE.md`](./ARCHITECTURE.md). For AI-agent-oriented docs
(design system, quality gates, security model, reliability notes), start at
[`AGENTS.md`](./AGENTS.md).

## Stack

- **Astro** (static output, zero JS by default) + a handful of small,
  hand-written `<script>` enhancements (theme toggle, hero role-typing
  animation, mobile nav) — no UI framework is shipped to the client.
- **DoPaNik Design System** — tokens, components and brand illustrations
  ported into `src/styles` and `src/components/astro`. See
  [Design system](#design-system) below.
- **Content collections** for talks and writing (Markdown + frontmatter).
- **Netlify Forms** for the contact form — no backend, no third party.

## Local development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Deployment

Netlify is configured via `netlify.toml` (`npm run build`, publish `dist/`).
Pushing to the connected branch on GitHub triggers a Netlify build
automatically — no manual deploy steps.

## Internationalization

German is the default locale (unprefixed routes: `/`, `/about`, ...),
English lives under `/en/` (`/en/about`, ...). This is Astro's built-in i18n
routing, configured in `astro.config.mjs`.

- `src/i18n/de.ts` / `src/i18n/en.ts` — UI copy dictionaries.
- `src/data/site.ts` — language-agnostic facts (name, company, social links).
- Each route has one shared page-body component in
  `src/components/pages/*Page.astro` (e.g. `AboutPage.astro`), rendered by a
  thin wrapper per locale in `src/pages/` and `src/pages/en/`.

## Content

Talks and writing entries are Markdown files with frontmatter, one file per
language under `src/content/{talks,writing}/{de,en}/`. Schema is defined in
`src/content.config.ts`.

Some entries are marked `placeholder: true` in frontmatter (e.g. the
Informatik Aktuell article, currently "in Vorbereitung") — fill these in as
real content becomes available; no code changes are needed, just edit the
Markdown files.

## Design system

**DoPaNik Design System**: dark "terminal-hacker × cartoon" brand,
JetBrains Mono + Roboto, phosphor-green accent. Static `.astro` components
in `src/components/astro/`, tokens in `src/styles/tokens/`, component CSS in
`src/styles/components/*.css`, brand illustrations in
`src/assets/illustrations/`. See [`docs/styleguide/`](./docs/styleguide/)
for the full brand guidelines.

To regenerate the OG/Twitter-card image after a brand tweak:

```sh
node scripts/generate-og-image.mjs
```

## What's intentionally not here

No CMS, no auth, no analytics, no embedded social feeds, no comments —
deliberate scope cuts for a solo-maintained static site, not gaps to fill
in later.

## License

The code is [MIT-licensed](./LICENSE). This does **not** extend to Dominik
Pabst's name, likeness, the DoPaNik brand, portrait, or written content
(bio, talks, articles) — those aren't yours to reuse just because the code
is open. Security issues: see [`SECURITY.md`](./SECURITY.md).
