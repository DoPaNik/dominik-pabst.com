# 03 — Typography

Source of truth: `src/styles/tokens/typography.css` + `fonts.css`.

## Two faces, fixed roles

| Token                                             | Face                                                | Role                                                                                  |
| ------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `--font-mono` (= `--font-display`, `--font-code`) | **JetBrains Mono** (self-hosted, latin + latin-ext) | headings, nav, labels, buttons, metadata, code, terminal content — the "hacker" layer |
| `--font-body` (= `--font-sans`)                   | **Roboto** (self-hosted, 400/700)                   | running prose only                                                                    |

**MUST NOT** add typefaces, swap the roles, or set body copy in mono (except
inside terminal windows). JetBrains Mono is a deliberate brand pick, self-hosted
for performance/privacy (see `src/styles/tokens/fonts.css`).

## Scale & weights

Modular scale `--text-2xs` … `--text-6xl`: 11 / 12 / 13 / 15 / 16 / 18 / 22 /
28 / 36 / 48 / 64 / 84px. Line heights `--leading-none` 1 → `--leading-relaxed`
1.7. Weights 400 / 500 / 700 / 800.

| Element            | Recipe                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------ |
| Hero display       | mono 700–800, `--text-5xl/6xl`, `--tracking-tighter`, `--leading-tight`                    |
| Section title (h2) | mono 700, `--text-3xl`, ends with a period                                                 |
| Card title         | mono 700, `--text-lg`, `--text-strong`                                                     |
| Body prose         | Roboto 400, `--text-base/lg`, `--leading-normal`, `--text`/`--text-muted`, max-width ~60ch |
| Label/eyebrow      | mono 700, 12px, UPPERCASE, `--tracking-label` (0.12em)                                     |
| Metadata           | mono 400–500, `--text-xs/sm`, `--text-dim`                                                 |
| Terminal text      | mono, 13px, line-height 1.75                                                               |

## Shell-framing patterns (the signature)

The eyebrow is a `//` comment with a short phosphor rule (see
`src/styles/components/section.css`, `.dpn-eyebrow`):

```html
<p class="dpn-eyebrow"><span class="dpn-eyebrow__rule"></span>// talks</p>
<h2 class="dpn-section__title">Vorträge & Workshops.</h2>
```

Prompt lines color the `$`/user part with `--prompt`:

```html
<code><span style="color:var(--prompt)">dominik@dopanik:~$</span> whoami</code>
```

Other framings: `cat ~/.fokus` for lists, `# >` for shell-output quotes,
`# exit 0` for success states, `▏` blinking block cursor after typed text.

## Rules

- Machine layer is **lowercase** (eyebrows may be uppercase-tracked labels —
  both exist; within one page, be consistent per pattern).
- Headings and prose use normal sentence case; headlines end with a period.
- **MUST NOT** letter-space body prose; wide tracking (`--tracking-label`) is
  for uppercase mono labels only.
- **MUST NOT** use font sizes outside the scale; pick the nearest token.
- Links in prose: `--link` blue, underline on hover with
  `text-underline-offset: 2–3px`. Links inside terminal contexts may be green.
