# DoPaNik Styleguide — Index & TL;DR

Brand guidelines for dominik-pabst.com, written for AI agents (Claude Code) and
humans. Each chapter is self-contained; read the one matching your task.
**Values shown in these docs are informative copies — `src/styles/tokens/*.css`
is the source of truth.** If docs and tokens ever disagree, the tokens win;
update the docs in the same commit.

## The brand in one line

**Terminal hacker × cartoon.** A dark, IDE-grade slate surface with monospace
type and a phosphor-green accent — macOS-terminal motifs, shell-framed labels —
warmed up by Dominik's own monochrome cartoon illustrations. Reference vibe:
glance, dev.to, hackernoon.

## TL;DR — the ten rules

1. **Dark-first.** `:root` is the dark theme. Light (`[data-theme="light"]`) is
   opt-in "paper" mode. Always style with semantic tokens so both themes work.
2. **Two typefaces, fixed roles.** JetBrains Mono for display/UI/labels/code,
   Roboto for body prose. MUST NOT swap or add faces.
3. **One hero accent.** Phosphor green `--brand` (#37D67A dark). Amber =
   secondary/warning, blue = links, magenta = photography only, cyan = info.
4. **Borders carry depth.** 1px hairline + background step, not shadows.
   Glow (`--glow-soft`) is emphasis, used sparingly.
5. **Boxy.** Radii 3–14px. NEVER pill-shaped buttons.
6. **Shell framing.** Machine layer (eyebrows, labels, CTAs, metadata) is
   lowercase mono: `// about`, `$ rolle=`, `whoami`, `hire me`.
7. **Motion is quick & mechanical.** 120–280ms, `cubic-bezier(.2,0,0,1)`.
   No springs, no parallax. MUST honour `prefers-reduced-motion`.
8. **Adapt, don't draw.** Illustrations are unDraw motifs, monochromized to
   the tone system (recipe in `06-components.md`); icons are Lucide or mono
   glyphs (`$ ~ // ✓ ★`). Never freehand or AI-generate SVG artwork.
9. **Tokens only.** No hardcoded colors, sizes, radii, durations in components.
10. **i18n always.** Every user-facing string lives in `src/i18n/{de,en}.ts`.

## Chapters

- `01-brand-voice.md` — positioning, personality, copy voice (DE + EN)
- `02-color.md` — palette, semantic tokens, usage rules
- `03-typography.md` — type scale, roles, shell-framing patterns
- `04-layout-effects.md` — spacing grid, containers, radii, borders, shadows
- `05-motion.md` — timing, easing, signature animations, matrix effect
- `06-components.md` — `.dpn-*` recipes and Astro/code conventions
- `07-checklist.md` — do's & don'ts self-review before committing
