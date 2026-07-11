# 04 — Layout, Spacing & Effects

Source of truth: `src/styles/tokens/spacing.css` + `effects.css`.

## Spacing — 4px grid

`--space-1` (4px) … `--space-32` (128px), plus `--space-px`/`--space-0-5`.
**MUST** use tokens for padding/margin/gap; no magic numbers.

Layout:

- Containers: `--container-lg` 1080px (default), `--container-xl` 1280px
  (hero/wide), `--container-md` 820px (prose pages). Gutter `--gutter` 24px.
- Sections: `.dpn-section` = 88px vertical padding + `--border-subtle` top
  hairline (first section borderless). Header block bottom margin 36px.
- Breakpoint: `@custom-media --below-tablet (max-width: 880px)` — use it, do
  not re-hardcode 880px.
- Prefer flex/grid with `gap` over margins between siblings.

## Radii — boxy

3 / 4 / 6 / 10 / 14px (`--radius-xs` … `--radius-xl`), `--radius-full` only
for dots and avatars.

- Buttons/inputs: `--radius-sm`. Cards/terminals: `--radius-lg`.
- **NEVER** pill-shaped buttons. **NEVER** radii > 14px on surfaces.

## Borders carry the depth

Depth = **1px hairline + a background step**, not shadow stacks:

```css
background: var(--surface-raised); /* one step up from --bg */
border: 1px solid var(--border);
```

- Cards and terminal windows almost always have a visible border.
- Hover: border steps up to `--border-strong` (or `--brand-deep` on glow
  cards), background to `--surface-hover`.
- 2px `--brand` **top** accent line is the accent-card pattern.
  **NEVER** the colored-left-border-only card (AI-slop trope).

## Shadows & glow

Shadows restrained and dark: `--shadow-sm/md/lg/pop` (e.g. `--shadow-md` =
`0 4px 14px rgba(0,0,0,.45)`). The expressive move is **phosphor glow**:

- `--glow-soft` — primary button hover, glow-card hover
- `--glow-green` — 1px green ring + 18px glow (hero illustration frame, strong emphasis)
- `--ring` — focus ring: `0 0 0 2px var(--bg), 0 0 0 4px var(--brand)`

Glow = emphasis, **never** decoration everywhere; one glowing element per
viewport region is plenty.

## Backgrounds & texture

Flat ink surfaces. The one texture is the faint 32px terminal grid
(`--grid-line`, rgba(255,255,255,.025) lines), behind heroes / inside
illustration frames, usually faded with a radial mask.

**MUST NOT:** photographic hero backgrounds, large gradients, purple blur
blobs, glassmorphism. `backdrop-filter: blur(12px)` is reserved for the
sticky nav once scrolled.
