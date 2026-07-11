# 01 — Brand & Voice

## Who is DoPaNik

**Dominik Pabst** — handle **DoPaNik** — Executive Consultant for DevOps &
Platform Engineering at **CGI Deutschland** (formerly Novatec Consulting,
acquired June 2025). Speaker at IT-Tage Frankfurt, trainer at heise Academy
(incl. a DevSecOps + AI course with Andreas Falk). Based in Germany 🇩🇪.

Focus areas: DevSecOps, Platform Engineering, Cloud, CI/CD, GitOps,
Infrastructure as Code, AI in software engineering.

Positioning line:

> "I help development teams continuously tweak their Application Lifecycle
> Management. I advocate **versioning everything** to always be in control —
> and get a good night's sleep."

Core belief (use it, don't paraphrase it into buzzwords):
_DevSecOps is a culture change — not a toolchain decision._
(DE: "DevSecOps ist eine Kulturveränderung — keine Toolchain-Entscheidung.")

Canonical facts live in `src/data/site.ts` (name, role, email, socials).
MUST NOT contradict or duplicate them in copy.

## Personality

- Plain-spoken engineer: shows a pipeline rather than boasting about one.
- Confident but unpretentious; warm, first-person ("I"/"ich"), addresses the
  reader as "you"/"Sie" (DE pages use Sie on business pages, du never).
- Dry technical humour: "…and get a good night's sleep", "# exit 0 — ich melde
  mich in Kürze zurück."
- Real DevOps vocabulary used correctly. NEVER buzzword salad, NEVER marketing
  superlatives ("world-class", "cutting-edge").

## The two verbal layers

**1. Human layer** (headlines, prose, intros): normal sentence case, plain
warm language. Ends headlines with a period ("Ich bin Dominik Pabst.",
"Vorträge & Workshops.").

**2. Machine layer** (eyebrows, nav, labels, buttons, metadata, footers):
lowercase monospace, shell-framed. This is the brand's signature verbal tic:

| Pattern         | Examples                                                   |
| --------------- | ---------------------------------------------------------- |
| Comment eyebrow | `// about`, `// talks`, `// kontakt`, `// fokus`           |
| Prompt line     | `dominik@dopanik:~$ whoami`, `$ rolle=`, `cat ~/.toolbelt` |
| Shell output    | `# > collaborating with people, more than anything.`       |
| Exit codes      | `✔ Nachricht gesendet.` + `# exit 0 — …`                   |
| Footer tagline  | `// versioniert mit sorgfalt`                              |

**CTAs:** short, lowercase, imperative mono: `hire me`, `projekt anfragen`,
`talks ansehen`, `nachricht senden`, `weiterlesen →`, `deploy`, `ship it`.

## Bilingual rules (DE default, EN mirror)

- Every user-facing string goes in `src/i18n/de.ts` AND `en.ts`, typed via
  `types.ts`. MUST NOT hardcode strings in components/pages.
- German is the primary voice; write DE first, then translate keeping the same
  register (not word-for-word).
- Shell fragments stay identical across languages where they are commands
  (`whoami`, `cat ~/.fokus`) — only human words inside them translate
  (`$ rolle=` / `$ role=`).
- SEO titles follow the pattern `<Topic> – Dominik Pabst | <Qualifier>`.

## Emoji

Sparingly, only the established set: 👋 🤓 🇩🇪 (plus ✔ as a glyph). NEVER as UI
controls or list bullets — use a Lucide icon or mono glyph (`$ ~ // ✓ ★`).

## Sounds right / sounds wrong

✅ "Ich helfe Entwicklungsteams, Sicherheit, Plattformen und KI sinnvoll in
ihre Software-Lieferkette einzubauen."
✅ `dominik@dopanik:~$ whoami` → "DevOps engineer · trainer · photographer"
✅ "$ more at dev.to/dopanik →"

❌ "Passionate thought leader driving digital transformation synergies"
❌ "UNLOCK YOUR DEVOPS POTENTIAL 🚀🔥"
❌ Title-Case Buttons Like "Contact Me Now"
