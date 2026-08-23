# AGENTS.md — dominik-pabst.com

Personal site of **Dominik Pabst (DoPaNik)** — Executive Consultant for DevOps &
Platform Engineering at CGI Deutschland, speaker (IT-Tage Frankfurt), trainer
(heise Academy). Astro, bilingual (DE default, EN under `/en`), dark-first.

This file is the hub. It's read first, every session — keep it short and
point elsewhere for depth rather than growing it.

## Development

Start the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, `astro dev logs`.

A pre-commit hook (husky + lint-staged, `.husky/pre-commit`) runs
lint/format on staged files and blocks committing PDFs/office docs/
archives — see `scripts/check-staged-file-types.mjs`.

### Local dev gotcha: `astro dev`/`astro preview` daemonize

Both commands detach into a background daemon independent of the shell
that started them. A stale daemon from an earlier session can keep serving
an old build (a fix that should work still looks broken), or make
Playwright's `webServer` config flake with `Error: Process from
config.webServer exited early`. Fix before retrying:

```sh
npx astro preview stop   # or: npx astro dev stop
lsof -ti:4322 | xargs -r kill -9   # port from playwright.config.ts
```

Full explanation and the "just run playwright directly against the
already-up daemon" shortcut: `docs/RELIABILITY.md`.

## Design system — read before ANY UI work

The brand is **"terminal hacker × cartoon"**: dark IDE slate, phosphor-green
accent, monospace machine layer, warmed by monochrome cartoon illustrations.

**Source of truth for all values:** `src/styles/tokens/*.css` (semantic aliases)
and `src/styles/components/*.css` (the `.dpn-*` classes). Never hardcode a hex,
px-size, font, radius or duration that a token already provides.

Before touching UI, read the relevant chapter in `docs/styleguide/`:

| Chapter                                | Read when you…                             |
| -------------------------------------- | ------------------------------------------ |
| `docs/styleguide/README.md`            | start any visual task (2-min TL;DR)        |
| `docs/styleguide/01-brand-voice.md`    | write copy, name things, add pages         |
| `docs/styleguide/02-color.md`          | pick any color                             |
| `docs/styleguide/03-typography.md`     | set any text, headings, labels             |
| `docs/styleguide/04-layout-effects.md` | space, border, round or shadow anything    |
| `docs/styleguide/05-motion.md`         | animate or add interaction states          |
| `docs/styleguide/06-components.md`     | build/extend components; Astro conventions |
| `docs/styleguide/07-checklist.md`      | before committing UI changes (self-review) |

### Non-negotiables (full rules in the chapters)

- Dark is the default theme (`:root`); light is opt-in via `[data-theme="light"]`.
  Use **semantic** tokens (`--bg`, `--text`, `--brand`) so both themes work.
- Headings/labels/nav/buttons = JetBrains Mono (`--font-mono`). Body prose =
  Roboto (`--font-body`). Never the other way round.
- One signature accent: phosphor green `--brand`. Amber is secondary, blue is
  links, magenta is reserved for photography. Never invent new hues.
- Depth = 1px border + background step. Boxy radii (max `--radius-xl` 14px),
  never pill buttons, no big colorful gradients, no glassmorphism.
- Machine-layer copy is lowercase mono with shell framing (`$`, `//`, `~`).
  Honour `prefers-reduced-motion` on every animation.
- All user-facing strings go through `src/i18n/{de,en}.ts` — never inline.

## Where to read next

| Doc                           | Read when you…                                                                                                                                                                                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`             | need the system map — directories, build pipeline, CI                                                                                                                                                                              |
| `docs/FRONTEND.md`            | write Astro/TS components — conventions + known gotchas                                                                                                                                                                            |
| `docs/product-specs/index.md` | need to know a route's purpose/audience                                                                                                                                                                                            |
| `docs/exec-plans/index.md`    | check what's in flight or already decided                                                                                                                                                                                          |
| `docs/QUALITY_SCORE.md`       | touch anything Lighthouse/a11y/test-suite related                                                                                                                                                                                  |
| `docs/RELIABILITY.md`         | deploy, CI, or "why is this flaking locally" questions                                                                                                                                                                             |
| `docs/SECURITY.md`            | touch `public/_headers`, CSP, or anything script-related                                                                                                                                                                           |
| `docs/references/*.txt`       | need a condensed Astro/Netlify/Playwright cheat-sheet                                                                                                                                                                              |
| `CONTENT.md`                  | need facts (name, employer, talks, writing) — **stays at repo root by design**: 4 subagent definitions (`.claude/agents/{content-i18n,seo-content-strategist,seo-metadata,pr-reviewer}.md`) hardcode this path. Don't relocate it. |

## Documentation

Astro docs: https://docs.astro.build — consult the guides on routing, Astro
components, framework components, content collections, styling and i18n before
working on related tasks. `docs/references/astro-llms.txt` has the
project-specific gotchas condensed locally.
