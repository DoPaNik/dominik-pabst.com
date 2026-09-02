# 06 — Components & Code Conventions

Source of truth: `src/styles/components/*.css` (`.dpn-*` classes),
`src/components/**` (Astro). Reuse before building; extend before forking.

## Existing inventory

| Class                           | File                | Variants                                                                                                               |
| ------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `.dpn-btn`                      | button.css          | `--primary` `--secondary` `--ghost` `--link` `--danger`; sizes `--sm` `--lg` `--block`; `.dpn-btn__prompt` for the `$` |
| `.dpn-iconbtn`                  | icon-button.css     | icon-only square button; sizes `--sm` `--lg`; `--solid` `--ghost`                                                      |
| `.dpn-input`                    | input.css           | text fields, green focus                                                                                               |
| `.dpn-badge` / `.dpn-tag`       | badge.css / tag.css | status tints / tech chips                                                                                              |
| `.dpn-avatar`                   | avatar.css          | round, dot = `--radius-full` exception                                                                                 |
| `.dpn-card`                     | card.css            | `--hoverable` `--accent` (2px green top line) `--glow`                                                                 |
| `.dpn-term`                     | terminal-window.css | macOS bar, traffic lights, `--plain` body                                                                              |
| `.dpn-section` / `.dpn-eyebrow` | section.css         | page-section header pattern                                                                                            |

## Canonical recipes

Primary button with prompt:

```html
<a class="dpn-btn dpn-btn--primary" href="/contact/">
  <span class="dpn-btn__prompt">$</span> projekt anfragen
</a>
```

Terminal window:

```html
<div class="dpn-term">
  <div class="dpn-term__bar">
    <span class="dpn-term__lights">
      <span class="dpn-term__light dpn-term__light--danger"></span>
      <span class="dpn-term__light dpn-term__light--warning"></span>
      <span class="dpn-term__light dpn-term__light--success"></span>
    </span>
    <span class="dpn-term__title">~/pipeline — deploy.yml</span>
  </div>
  <div class="dpn-term__body">…mono content…</div>
</div>
```

Section header: see `03-typography.md` (eyebrow + title + intro ≤60ch).

Illustrations: adapted from [unDraw](https://undraw.co) (unDraw License) and
stored monochromized in `src/assets/illustrations/*.svg`, inlined so
`currentColor` recolours them via the tone system (accent/amber/ink/photo).
Adaptation recipe when adding a motif: pick one that matches the page's topic,
set `fill="currentColor"` on the root, map colour surfaces to opacity steps
(dark ≈ 1/0.9, original accent ≈ 0.55, light greys ≈ 0.3/0.14) and map white
occlusion surfaces (screens, bubbles, eyes) to `var(--illo-bg, transparent)`
so they read as punched-out in both themes. Keep the source motif name in an
SVG comment. **NEVER** hand-draw new SVG scenes or generate images from
scratch. Icons: Lucide (2px stroke, 16–18px, currentColor) or mono glyphs.

## Astro / code conventions

- **Structure:** pages in `src/pages/` (DE) with EN mirrors in `src/pages/en/`;
  shared page bodies in `src/components/pages/`; building blocks in
  `src/components/astro/`; layout chrome `Nav.astro` / `Footer.astro` /
  `layouts/BaseLayout.astro`.
- **Styling:** global tokens + `.dpn-*` component classes come from
  `src/styles/global.css` (imported once in BaseLayout). Page-specific tweaks
  live in the page's scoped `<style>` and override `.dpn-*` defaults — don't
  fork component CSS. New reusable patterns go to
  `src/styles/components/<name>.css` + an `@import` in global.css.
- **Naming:** `.dpn-` prefix, BEM-ish (`__element`, `--modifier`).
- **Tokens only** in component CSS — any literal hex/px/ms that a token covers
  is a review-blocker. Private per-component vars use the `--_x` convention
  (see button.css).
- **Content:** talks/writing entries are content collections
  (`src/content/*`, `content.config.ts`) — add entries there, not markup.
  Site facts from `src/data/site.ts`. Strings from `src/i18n/`.
- **Scripts:** progressive enhancement — real content in the DOM, canvas/JS
  layered on top; shared ticker from `src/scripts/matrix-engine.ts`.
- **A11y:** keep `.skip-link` / `.visually-hidden` patterns, `:focus-visible`
  styles, `aria-hidden` on decorative canvases/glyphs, alt text on the
  portrait, WCAG AA contrast.
