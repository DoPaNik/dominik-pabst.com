# 05 — Motion & Interaction

Source of truth: `src/styles/tokens/effects.css` (durations/easings),
`src/scripts/matrix-engine.ts`, `src/styles/global.css` (view transitions).

## Character: quick & mechanical

Motion feels like a good terminal — instant, precise, no bounce.

| Token        | Value                      | Use                      |
| ------------ | -------------------------- | ------------------------ |
| `--dur-fast` | 120ms                      | press, small state flips |
| `--dur`      | 180ms                      | hover, borders, fills    |
| `--dur-slow` | 280ms                      | lifts, reveals           |
| `--ease`     | `cubic-bezier(.2,0,0,1)`   | default                  |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` | entrances                |

**MUST NOT:** springs/bounce, parallax, long (>400ms) UI transitions,
infinite decorative loops on content, animated gradients.

**MUST:** wrap every non-essential animation in
`@media (prefers-reduced-motion: no-preference)` (or disable in `reduce`).
Page transitions: 250ms crossfade via the View Transitions API — already
handled in `global.css`; don't add JS overlays.

## Interaction states (all components)

- **Hover** — solid buttons `filter: brightness(1.08)` + glow on primary;
  ghost/cards → `--surface-hover` fill + `--border-strong`; links underline
  (offset 2–3px); cards lift `translateY(-2px)` + `--shadow-md`/`--glow-soft`.
- **Press** — `transform: translateY(1px)`.
- **Focus** — `box-shadow: var(--ring)` on `:focus-visible` (buttons), 2px
  green outline for links, `--ring-inset`/soft green shadow on inputs.
- **Disabled** — `opacity: .45`, no transform, no glow, `cursor: not-allowed`.

## Signature animations

- **Blinking block cursor** `▏` — steps(1) opacity blink, ~1s cycle.
- **Typing role rotator** — hero types/deletes role strings after `$ rolle=`;
  keep a static first role for no-JS/reduced-motion.
- **Terminal decode / matrix rain** — the ONE cinematic effect, used once per
  page at most (portrait on About). Rules baked into `matrix-engine.ts`:
  - register via `addMatrixInstance({ el, draw, fps })` — one shared rAF loop,
    draw only while intersecting viewport AND tab visible; zero idle load.
  - FPS cap 24–30 (default 27). Canvas DPR clamped via `clampedDpr()` (max 1.5).
  - Decode runs once (~1.8s), then the canvas is cleared and unregistered.
    Hover re-encodes ≤1s. Real `<img>` stays in the DOM (SEO/a11y/no-JS).
  - Colors read from CSS custom properties per frame (theme-switch safe).

Any new canvas/loop animation **MUST** go through the matrix-engine ticker,
respect the same visibility/FPS/DPR rules, and keep static fallback content
in the DOM.
