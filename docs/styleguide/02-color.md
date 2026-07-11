# 02 — Color

Source of truth: `src/styles/tokens/colors.css`. Dark theme = `:root`
(primary); light "paper" mode = `[data-theme="light"]` overrides.

## MUST: use semantic aliases

Components reference **semantic** tokens, never raw ramp values, so light mode
works for free:

```css
background: var(--surface-raised); /* not var(--ink-800) */
color: var(--text-muted); /* not #a7b2bf */
border-color: var(--border);
```

Raw ramp tokens (`--ink-*`, `--green-*`, …) are for defining new semantic
aliases in `colors.css` only.

## The palette (dark values, informative)

**Base — cool-slate ink ramp** (`#0B0E14` → `#E8ECF1`): IDE slate, not pure
black, not blue-black.

| Semantic                                       | Dark value                    | Use                    |
| ---------------------------------------------- | ----------------------------- | ---------------------- |
| `--bg`                                         | `#0b0e14`                     | page background        |
| `--bg-subtle`                                  | `#0e121a`                     | alternating sections   |
| `--surface`                                    | `#11161f`                     | terminal bodies, wells |
| `--surface-raised`                             | `#161c26`                     | cards                  |
| `--surface-hover`                              | `#1a212c`                     | hover fill             |
| `--border`                                     | `#2a323f`                     | default hairline       |
| `--border-subtle`                              | `#1e2530`                     | section dividers       |
| `--border-strong`                              | `#3a4452`                     | hover/ghost borders    |
| `--text-strong`                                | `#e8ecf1`                     | headings               |
| `--text`                                       | `#cfd6de`                     | body                   |
| `--text-muted` / `--text-dim` / `--text-faint` | `#a7b2bf / #7c8896 / #586575` | secondary → disabled   |

**Accents — fixed jobs, never mix them up:**

| Semantic   | Dark value               | Job                                                                                  |
| ---------- | ------------------------ | ------------------------------------------------------------------------------------ |
| `--brand`  | `#37D67A` phosphor green | THE accent: prompts, primary buttons, focus, glows, hero illustration, eyebrow rules |
| `--accent` | `#F2B544` CRT amber      | secondary highlight, warnings, middle traffic light                                  |
| `--link`   | `#4A9EFF` blue           | hyperlinks in prose (heritage echo of #0074D9)                                       |
| `--photo`  | `#C792EA` magenta        | RESERVED: dopamin.photography contexts + reactions                                   |
| `--info`   | `#3DD6D0` cyan           | terminal info lines                                                                  |
| `--danger` | `#F2545B` red            | errors, destructive actions                                                          |

Each accent has a `-soft` ~12% tint (`--brand-soft`, `--warning-soft`, …) for
badge/pill backgrounds. `--on-brand` (`#0b0e14`) is the text color on green or
amber fills.

Terminal specifics: `--prompt` (green `$`), `--selection-bg` (green 25%),
traffic lights = `--danger` / `--accent` / `--brand`.

## Rules

- **MUST** keep phosphor green the single dominant accent per view. Amber and
  others appear in supporting roles only.
- **MUST NOT** use magenta outside photography/reaction contexts.
- **MUST NOT** invent new hues. If a shade is genuinely missing, derive a
  neighbour in OKLCH from an existing token and add it to `colors.css` with a
  comment — never inline.
- **MUST NOT** use pure black `#000` or pure white `#fff` surfaces (exception:
  `#fff` text on `--danger`).
- Green-on-ink and amber-on-ink text is fine; **never** green text on amber or
  similar accent-on-accent combos.
- Large fills of any accent are off-brand; accents color _details_ (text,
  borders, glows, 2px accent lines, tints), surfaces stay ink.
- Both themes must pass WCAG AA for text (the token pairs above do; keep it
  that way when adding aliases).
