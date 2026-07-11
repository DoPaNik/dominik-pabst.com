# 07 — Do's & Don'ts Checklist

Self-review before committing UI work. Everything here is shorthand for the
chapters — when in doubt, read the chapter.

## Do

- [ ] Semantic tokens only (`--bg`, `--surface-raised`, `--text-muted`, …) —
      works in dark AND light
- [ ] Phosphor green is the single dominant accent in the view
- [ ] Headings/labels/buttons in JetBrains Mono; prose in Roboto
- [ ] Machine layer lowercase + shell-framed (`//` eyebrow, `$` prompt CTAs)
- [ ] Depth via 1px border + surface step; boxy radii (≤14px)
- [ ] Hover = brighten/border-step, press = translateY(1px), focus = `--ring`
- [ ] Motion 120–280ms, `--ease`, gated on `prefers-reduced-motion`
- [ ] Strings in `src/i18n/de.ts` + `en.ts`; facts from `src/data/site.ts`
- [ ] Spacing from the 4px scale; breakpoint via `--below-tablet`
- [ ] Icons: Lucide or mono glyphs; illustrations from the existing set
- [ ] Real content in DOM before JS enhancement (SEO/no-JS/a11y)

## Don't

- [ ] ~~Hardcoded hex/px/ms values that tokens cover~~
- [ ] ~~New hues, new fonts, new illustration styles, generated images~~
- [ ] ~~Pill buttons, radii >14px, glassmorphism, big gradients, purple blobs~~
- [ ] ~~Colored left-border-only cards~~
- [ ] ~~Magenta outside photography contexts~~
- [ ] ~~Accent-colored large fills or accent-on-accent text~~
- [ ] ~~Glow on more than one element per region~~
- [ ] ~~Bouncy springs, parallax, >400ms UI transitions, idle rAF loops~~
- [ ] ~~Title-Case Buttons, marketing superlatives, buzzword salad~~
- [ ] ~~Emoji as bullets/controls; emoji beyond 👋 🤓 🇩🇪~~
- [ ] ~~Inline user-facing strings in components~~
- [ ] ~~Canvas animation outside the matrix-engine ticker~~
