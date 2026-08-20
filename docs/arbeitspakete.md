# Arbeitspakete — dominik-pabst.com

> **Zweck:** Umsetzbare Aufgabenliste aus der Repository-Analyse (Architekturkarte,
> `debt_backlog.csv`, 30/60/90-Roadmap). Dieses Dokument ist die einzige Quelle
> für die Abarbeitung — es ersetzt die Roadmap-Prosa für operative Zwecke.
>
> **Baseline:** Branch `master` @ `86e8caa`. Alle Datei-Referenzen und
> Ist-Zustände wurden gegen diesen Stand verifiziert.

## Hinweise zur Abarbeitung (für Mensch & LLM)

1. **Paket-Reihenfolge ist verbindlich:** Paket 1 → Paket 2 → Paket 3.
   Innerhalb eines Pakets gilt die angegebene Reihenfolge nur, wo eine
   Abhängigkeit (`Hängt ab von:`) es erzwingt — sonst ist sie frei.
2. **Eine Aufgabe = ein Commit/PR.** Conventional Commits
   (`fix:`, `feat:`, `test:`, `chore:`, `docs:`, `refactor:`).
3. **Abgrenzungen beachten:** Jede Aufgabe listet unter `Abgrenzung:` explizit,
   was sie _nicht_ ändert. Das verhindert Überschneidungen — nicht "nebenbei
   mitmachen", auch wenn es naheliegt.
4. **Globale Definition of Done** (gilt zusätzlich zu den Akzeptanzkriterien
   jeder Aufgabe):
   - `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run build` grün
   - Änderung in **beiden Locales** (DE unter `/`, EN unter `/en/`) geprüft, wo Inhalte betroffen sind
   - Beide Themes (dark = Default, `[data-theme="light"]`) geprüft, wo UI betroffen ist
   - Keine neuen Konsolenfehler im Browser
5. **Skalen** (aus `debt_backlog.csv`): Aufwand / Nutzen / Risiko je 1 (niedrig) – 5 (hoch).
   Risiko = Umsetzungs-/Regressionsrisiko, nicht das Risiko des Nichtstuns.

### Schlüsseldateien (Referenz)

| Datei                                | Rolle                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------- |
| `src/layouts/BaseLayout.astro`       | `<head>`: Meta, OG/Twitter, canonical/hreflang, JSON-LD, Theme-FOUC-Script |
| `src/data/site.ts`                   | Einzige Quelle für Name/Firma/Kontakt/Social-Links/Foto-Pfad               |
| `src/i18n/de.ts`, `src/i18n/en.ts`   | Alle User-Facing-Strings, typisiert über `src/i18n/types.ts`               |
| `src/content.config.ts`              | Zod-Schemata der Content Collections (`talks`, `writing`)                  |
| `src/lib/schema.ts`                  | JSON-LD-Generatoren (`Person`, `SpeakingEvent`)                            |
| `netlify.toml` / `public/_headers`   | Build-Kommando bzw. ausgelieferte Security-Header inkl. CSP                |
| `.github/workflows/ci.yml`           | CI: Format → Lint → Typecheck → Build → Skript-Drift-Check → `npm audit`   |
| `CONTENT.md`                         | Deklarierte "authoritative reference" für Inhalts-Fakten                   |
| `src/scripts/*.ts`                   | Alle client-seitigen Skripte (TS-Quelle, typgeprüft, gelintet)             |
| `scripts/build-critical-scripts.mjs` | Erzeugt `public/scripts/theme-bootstrap.js` (einzige Ausnahme, s. AP4-1)   |
| `.lighthouserc.cjs`                  | Lighthouse-CI-Konfiguration (Routen + Assertions)                          |

---

## Paket 1 — Quick Wins (Tag 0–30)

Alle Aufgaben: Aufwand ≤ 2, Risiko 1. Ziel: schnell sichtbaren Nutzen liefern
und die Wissensbasis bereinigen, bevor größere Arbeiten darauf aufbauen.

**Empfohlene Reihenfolge:** AP1-1, AP1-2, AP1-4, AP1-5 in beliebiger Reihenfolge →
AP1-7 → AP1-3 → AP1-6 (zuletzt, dokumentiert den Endzustand).

---

### AP1-1 · og:image auf Querformat-Social-Card umstellen

**Backlog:** #1 · Aufwand 1 / Nutzen 3 / Risiko 1 · Bereich: SEO

**Beschreibung:**
`og:image` und `twitter:image` zeigen sitewide auf das Hochformat-Porträt
(840×1050, `site.photo`), obwohl das eigens gebaute Querformat-Social-Card-Bild
`public/og/dopanik.png` (1200×630, Standard-OG-Format) existiert und laut Grep
nirgends referenziert wird. Ist-Zustand in `src/layouts/BaseLayout.astro`:
`const ogImage = new URL(site.photo, site.url).toString();`

Umsetzung: `BaseLayout.astro` bekommt eine optionale `ogImage`-Prop mit Default
`/og/dopanik.png`. Die About-Seiten (DE+EN) übergeben explizit das Porträt
(`site.photo`) — dort ist das Gesicht das richtige Vorschaubild. `og:image:alt`
bzw. der bestehende Alt-Mechanismus muss zum jeweils gewählten Bild passen.

**Akzeptanzkriterien:**

- [ ] Home, Talks, Writing, Contact (DE+EN) rendern `og:image` + `twitter:image` mit absoluter URL auf `/og/dopanik.png`
- [ ] About (DE+EN) rendert weiterhin das Porträt als `og:image`
- [ ] `og:image:alt` (bzw. `twitter:image:alt`) beschreibt das tatsächlich gesetzte Bild in der jeweiligen Sprache
- [ ] Validiert im Build-Output (`dist/**/index.html` per Grep), nicht nur im Dev-Server

**Abgrenzung:** Ändert keine Title/Description-Texte (→ AP1-5) und keine
JSON-LD-Daten (`Person.image` bleibt das Porträt).

---

### AP1-2 · Dependabot für npm einrichten

**Backlog:** #4 · Aufwand 1 / Nutzen 3 / Risiko 1 · Bereich: Sicherheit/Prozess

**Beschreibung:**
Es existiert kein Update-Automatismus (kein Renovate/Dependabot). Die CI prüft
`npm audit` nur bei Push/PR — Sicherheitslücken in Dependencies werden nicht
proaktiv gemeldet. Anlegen: `.github/dependabot.yml` für das npm-Ökosystem,
wöchentlicher Schedule, sinnvolles PR-Limit (z. B. 5), Gruppierung von
Minor/Patch-Updates erlaubt, um PR-Rauschen zu begrenzen. Zusätzlich
`package-ecosystem: github-actions` aufnehmen, damit auch die CI-Actions
aktuell gehalten werden.

**Akzeptanzkriterien:**

- [ ] `.github/dependabot.yml` existiert mit `package-ecosystem: npm`, `schedule.interval: weekly`
- [ ] GitHub-Actions-Ecosystem ist ebenfalls konfiguriert
- [ ] Nach dem Merge auf `master` erscheint Dependabot unter _Insights → Dependency graph → Dependabot_ als aktiv
- [ ] Von Dependabot geöffnete PRs durchlaufen die bestehende CI (Required Check `Lint, typecheck & build`)

**Abgrenzung:** Keine Änderung an `ci.yml` und keine Dependency-Updates in
dieser Aufgabe selbst.

---

### AP1-4 · Illustrations-System: Entscheidung treffen und umsetzen

**Backlog:** #8 · Aufwand 1 / Nutzen 2 / Risiko 1 · Bereich: Technik/Marke

**Beschreibung:**
`src/components/astro/Illustration.astro` und die zugehörigen SVGs
(dev/skills/contact/footer) werden nirgends verwendet (`grep '<Illustration' src`
→ 0 Treffer), obwohl der Styleguide das monochrome Cartoon-Set als aktiven
Markenbestandteil beschreibt. Das ist eine Produktentscheidung mit zwei
zulässigen Ausgängen:

- **Option A — gezielt einbauen:** an 1–2 kuratierten Stellen (z. B.
  Skills-/Stack-Sektion auf About, Contact-Seite), im Einklang mit der
  Designleitlinie "ein Akzent pro Seite" (die Matrix-Signatur darf nicht
  konkurrenziert werden).
- **Option B — entfernen:** Komponente + ungenutzte SVGs löschen und den
  Styleguide-Abschnitt zum Illustrations-Set entsprechend anpassen, damit
  Doku und Code nicht widersprechen.

**Akzeptanzkriterien:**

- [ ] Entscheidung (A oder B) mit einem Satz Begründung im Commit-/PR-Text dokumentiert
- [ ] Bei A: Illustration(en) an den gewählten Stellen sichtbar, `decorative`/Alt-Verhalten korrekt, beide Themes geprüft
- [ ] Bei B: `grep -ri "illustration" src docs` liefert keine toten Referenzen mehr; Styleguide aktualisiert
- [ ] In beiden Fällen: kein ungenutzter Code-/Asset-Rest (Komponente, SVGs, CSS)

**Abgrenzung:** Keine Änderungen an der MatrixPortrait-/Backdrop-Signatur;
keine neuen Seitenbereiche erfinden.

**Umsetzungsentscheidung:** Option A. Illustrationen werden gezielt auf About
und Contact eingesetzt; die Matrix-Signatur bleibt der primäre visuelle Akzent.

---

### AP1-5 · SEO-Feinschliff: Home-Title kürzen, Descriptions ausbauen

**Backlog:** #9 · Aufwand 1 / Nutzen 2 / Risiko 1 · Bereich: SEO

**Beschreibung:**
Gemessene Zeichenlängen (siehe Architekturkarte, Abschnitt 8): Home-Title DE 66 /
EN 62 Zeichen — über der ~60-Zeichen-Richtgröße, Truncation-Risiko in den
Suchergebnissen. Writing- und Contact-Descriptions nutzen mit 85–92 Zeichen nur
~55–65 % der nutzbaren ~155 Zeichen. Anpassen in `src/i18n/de.ts` und
`src/i18n/en.ts` (Felder `seoTitle` / `seoDescription` der betroffenen Seiten).
Tonalität gemäß `docs/styleguide/01-brand-voice.md` einhalten.

**Akzeptanzkriterien:**

- [ ] Home-`seoTitle` ≤ 60 Zeichen in DE und EN
- [ ] Writing- und Contact-`seoDescription` jeweils 140–155 Zeichen in DE und EN
- [ ] Alle übrigen Seiten unverändert
- [ ] Zeichenlängen nachgemessen und im PR-Text als Tabelle dokumentiert
- [ ] Keyword-Kern bleibt erhalten (DevSecOps, Platform Engineering, Speaker/Trainer, Name)

**Abgrenzung:** Ändert nur `seoTitle`/`seoDescription`-Strings. Keine
OG-Bild-Logik (→ AP1-1), keine sichtbaren Seiteninhalte, keine Fakten-Korrekturen
(→ AP1-7).

---

### AP1-7 · Platzhalter-Daten klären und korrigieren

**Backlog:** #10 · Aufwand 2 / Nutzen 2 / Risiko 1 · Bereich: Content/Datenqualität

**Beschreibung:**
Drei Platzhalter-Befunde in sichtbarem Content bzw. strukturierten Daten:

1. `src/content/writing/{de,en}/linkedin-ki-wissensarbeit.md`:
   `date: '2024-01-01'` wirkt wie ein Platzhalter. Echtes Publikationsdatum des
   LinkedIn-Artikels recherchieren und in beiden Locales eintragen.
2. `informatik-aktuell-placeholder` (DE+EN) zeigt dauerhaft "Artikel in
   Vorbereitung". Redaktionsentscheidung einholen: Zieldatum ergänzen,
   Eintrag konkretisieren oder entfernen. Ergebnis umsetzen.
3. heise-Academy-Talk: das `SpeakingEvent`-JSON-LD nutzt den Jan-1-Fallback aus
   `src/lib/schema.ts`, weil im Talk kein echtes Datum steht. Falls das
   Kursdatum auffindbar ist: `startDate`/`endDate` im Frontmatter (DE+EN
   identisch) ergänzen. Falls nicht auffindbar: in `schema.ts` das
   `SpeakingEvent` ohne verlässliches Datum lieber **ohne** `startDate`
   ausgeben statt mit faktisch falschem Platzhalter.

**Akzeptanzkriterien:**

- [ ] LinkedIn-Eintrag trägt das echte Publikationsdatum (DE und EN identisch) — oder die Nicht-Auffindbarkeit ist im PR dokumentiert und das Datum entfernt
- [ ] Informatik-Aktuell: dokumentierte Entscheidung umgesetzt (Datum / Konkretisierung / Entfernung)
- [ ] Kein `SpeakingEvent`-JSON-LD im Build-Output enthält mehr ein Jan-1-Fallback-Datum
- [ ] DE/EN-Frontmatter-Parität bleibt 1:1 erhalten (Datumsfelder identisch)

**Abgrenzung:** Keine neuen Inhalte/Einträge verfassen; keine Änderungen an
`seoTitle`/`seoDescription` (→ AP1-5).

---

### AP1-3 · Hero-Status-Zeile aus der talks-Collection ableiten

**Backlog:** #7 · Aufwand 2 / Nutzen 3 / Risiko 1 · Bereich: Content/Wartung
**Hängt ab von:** AP1-7 (saubere `startDate`-Daten in der Collection)

**Beschreibung:**
`statusDeploy: 'aktuell · IT-Tage 2026'` (DE) bzw. `'live · IT-Tage 2026'` (EN)
in `src/i18n/{de,en}.ts` ist ein manuell gepflegter String ohne Bezug zur
`talks`-Collection. Nach dem Event zeigt die Startseite dauerhaft ein
veraltetes Event, wenn niemand von Hand aktualisiert.

Umsetzung: Zur **Build-Zeit** aus der `talks`-Collection den nächsten
zukünftigen Talk ermitteln (kleinstes `startDate` ≥ Build-Datum; Einträge ohne
`startDate` und mit `placeholder: true` ignorieren). Die i18n-Dateien behalten
nur das sprachabhängige **Format** (z. B. Präfix `aktuell · ` / `live · `);
der Event-Wert (`event` + Jahr) kommt aus der Collection. Fallback definieren,
wenn kein zukünftiger Talk existiert (z. B. neutraler Status wie
`verfügbar für anfragen` aus vorhandenen i18n-Strings — kein Event-Name).

**Akzeptanzkriterien:**

- [ ] Kein Event-Name mehr als Literal in `src/i18n/de.ts` / `en.ts`
- [ ] Startseite (DE+EN) zeigt den nächsten zukünftigen Talk aus der Collection
- [ ] Verhalten per Test-Build nachgewiesen: mit ausschließlich vergangenen `startDate`-Werten erscheint der definierte Fallback, nie ein vergangenes Event
- [ ] `astro check` grün (Typen für den neuen Datenfluss sauber)

**Abgrenzung:** Ändert nur die Status-Pill der Startseite. Keine Änderungen an
der Talks-Seite, am JSON-LD (→ AP1-7) oder an anderen i18n-Strings.

---

### AP1-6 · CONTENT.md auf den aktuellen Stand bringen

**Backlog:** #2 · Aufwand 2 / Nutzen 3 / Risiko 1 · Bereich: Prozess/Doku
**Hängt ab von:** AP1-1, AP1-3, AP1-5, AP1-7 (dokumentiert deren Endzustand)

**Beschreibung:**
`CONTENT.md` ist als "authoritative reference" deklariert, widerspricht aber der
Implementierung: Der Abschnitt "What Claude Code Still Needs to Implement"
beschreibt u. a. eine Remote-Foto-URL (`heise.cloudimg.io`) als Zielzustand —
tatsächlich ist das Foto lokal (`public/images/…`) und läuft über die
`MatrixPortrait`-Komponente. Alle 8 Implementierungspunkte sind erledigt, aber
nicht als solche markiert.

Umsetzung: `CONTENT.md` auf eine **Key-Facts-Referenz** reduzieren (Fakten zu
Person, Firma, Talks, Writing, Kontaktdaten — das, was ein LLM/Autor als Quelle
braucht). Die erledigte Implementierungs-Anleitung ersatzlos entfernen oder
in einen klar markierten Archiv-Abschnitt (`## Archiv (erledigt)`) verschieben.
Verweis auf `docs/styleguide/` für alles Gestalterische ergänzen.

**Akzeptanzkriterien:**

- [ ] `CONTENT.md` enthält keine offenen "Still Needs to Implement"-Anweisungen mehr, die bereits umgesetzt sind
- [ ] Keine Aussage in `CONTENT.md` widerspricht dem Code-Stand (Stichproben: Foto-Quelle, OG-Image, Status-Zeile, Datumsangaben)
- [ ] Key Facts vollständig erhalten (nichts Faktisches geht verloren)
- [ ] Querverweis auf `docs/styleguide/` und dieses Dokument (`docs/arbeitspakete.md`) vorhanden

**Abgrenzung:** Reine Doku-Aufgabe — keinerlei Code-, Content-Collection- oder
i18n-Änderungen.

---

## Paket 2 — Sicherheitsnetze (Tag 31–60)

Höherer Aufwand, aber **additiv** (kein Eingriff in bestehendes Verhalten).
Bewusst vor der riskanten CSP-Änderung in Paket 3 platziert, damit deren
Regressionen automatisch auffallen.

**Reihenfolge verbindlich:** AP2-1 → AP2-2 → AP2-3 (AP2-2/3 nutzen die
Infrastruktur aus AP2-1 bzw. ergänzen die CI koordiniert).

---

### AP2-1 · Playwright-Infrastruktur + Smoke-Tests für alle 12 Routen

**Backlog:** #3 (Teil 1) · Aufwand 4 / Nutzen 5 / Risiko 2 · Bereich: Technik/Qualität

**Beschreibung:**
Es existieren 0 Testdateien im Repo. Diese Aufgabe legt die **einzige**
Test-Infrastruktur an, die alle späteren Test-Aufgaben (AP2-2, AP3-1)
wiederverwenden — keine zweite parallele Einrichtung.

Umsetzung: Playwright als Dev-Dependency, `playwright.config.ts` mit
`webServer` gegen den Production-Build (`npm run build && npm run preview`),
Chromium als Basis-Projekt. Smoke-Test-Suite über alle 12 Routen
(`/`, `/about/`, `/talks/`, `/writing/`, `/contact/`, `/contact/success/`
jeweils + `/en/`-Pendant): Seite antwortet 200, `<h1>` sichtbar, keine
Konsolenfehler (`console.error`/`pageerror` als Test-Failure). Neuer CI-Job
`tests` in `.github/workflows/ci.yml`, der parallel zum bestehenden
`quality`-Job läuft; npm-Script `test` (bzw. `test:e2e`).

**Akzeptanzkriterien:**

- [ ] `npm test` läuft lokal grün gegen den Production-Build
- [ ] Alle 12 Routen abgedeckt: Status 200, sichtbares `<h1>`, keine Konsolenfehler
- [ ] CI-Job `tests` läuft bei PR gegen `master` und blockiert den Merge bei Rot (als Required Check ergänzt)
- [ ] Testlauf-Dauer in CI < 5 Minuten
- [ ] Kein Flaking: 3 aufeinanderfolgende CI-Läufe grün

**Abgrenzung:** Nur Smoke-Ebene — keine Interaktionstests (Formular, Theme,
Sprache → AP3-1), keine A11y-Assertions (→ AP2-2), keine Performance-Messung
(→ AP2-3).

---

### AP2-2 · Automatisierte A11y-Checks (axe-core) in der Test-Suite

**Backlog:** #5 (Teil 1) · Aufwand 3 / Nutzen 4 / Risiko 1 · Bereich: Technik/Qualität
**Hängt ab von:** AP2-1

**Beschreibung:**
Alle bisherigen Kontrast-/A11y-Prüfungen waren manuelle Einzelprüfungen ohne
Regressionsschutz. Auf Basis der AP2-1-Infrastruktur: `@axe-core/playwright`
einbinden und für alle 12 Routen A11y-Scans ausführen — **in beiden Themes**
(dark = Default und `[data-theme="light"]`), da die bekannten historischen
Kontrastfehler im Light-Theme lagen. WCAG-2.1-AA-Regelsatz; Violations der
Stufen `serious`/`critical` schlagen den Test fehl, `moderate` wird als
Report ausgegeben.

**Akzeptanzkriterien:**

- [ ] axe-Scan für alle 12 Routen × 2 Themes im bestehenden `tests`-CI-Job
- [ ] `serious`/`critical`-Violations ⇒ Test rot; aktueller Stand läuft grün (ggf. gefundene Verstöße im Rahmen dieser Aufgabe beheben)
- [ ] Dokumentierte, begründete Ausnahmen (falls nötig) zentral in einer Konfigurationsdatei, nicht verstreut in Tests
- [ ] Reduced-Motion-Verhalten bleibt unberührt (axe-Läufe erzwingen keine Animationen)

**Abgrenzung:** Keine neue CI-Job-Struktur (nutzt den `tests`-Job aus AP2-1);
keine Lighthouse-/Performance-Metriken (→ AP2-3).

---

### AP2-3 · Lighthouse-CI mit Performance-Budget

**Backlog:** #5 (Teil 2) · Aufwand 3 / Nutzen 4 / Risiko 1 · Bereich: Technik/Qualität
**Hängt ab von:** AP2-1 (koordiniert dieselbe `ci.yml`)

**Beschreibung:**
Lighthouse-CI (`treosh/lighthouse-ci-action` oder `@lhci/cli`) als eigener
CI-Job gegen den Production-Build, mobile Emulation, für die zwei
Referenz-Seiten `/` und `/about/`. Budget-Assertions aus den bereits gemessenen
Referenzwerten ableiten (gemessen: Home 99/95, About 97/96) mit Puffer:
**Performance ≥ 90, Accessibility ≥ 95**. Mehrere Runs (3) gegen Varianz,
Median zählt.

**Akzeptanzkriterien:**

- [ ] Eigener CI-Job führt Lighthouse mobil gegen `/` und `/about/` des Production-Builds aus
- [ ] Assertions: Performance ≥ 90 und Accessibility ≥ 95 ⇒ sonst rot
- [ ] 3 Runs pro Seite, Median als Bewertungsgrundlage (Flaking-Schutz)
- [ ] Ergebnis-Report als CI-Artefakt/Summary einsehbar

**Abgrenzung:** Keine Performance-Optimierungen am Code in dieser Aufgabe —
nur Messung + Gate. Keine axe-Regeln (→ AP2-2).

---

## Paket 3 — Strukturelle Härtung (Tag 61–90)

Die riskanteste Änderung (CSP) läuft zuletzt und wird durch die in Paket 2
aufgebauten Gates (Smoke, A11y, Lighthouse) automatisch auf Regressionen
geprüft.

**Reihenfolge verbindlich:** AP3-1 → AP3-2 → AP3-3.

---

### AP3-1 · Kernflow-Tests: Formular, Theme, Sprachwechsel

**Backlog:** #3 (Teil 2) · Aufwand 3 / Nutzen 4 / Risiko 1 · Bereich: Technik/Qualität
**Hängt ab von:** AP2-1

**Beschreibung:**
Die interaktivsten, fehleranfälligsten Pfade bekommen Interaktionstests auf der
bestehenden Playwright-Infrastruktur:

1. **Kontaktformular** (statisches Netlify-Formular): Pflichtfelder vorhanden,
   `data-netlify`/`form-name`-Attribute im Build-Output korrekt, Honeypot-Feld
   vorhanden und visuell verborgen, `action` zeigt auf die Success-Seite der
   jeweiligen Locale. (Kein echter Submit gegen Netlify — Attribut- und
   Verhaltens-Assertions genügen.)
2. **Theme-Umschaltung:** Toggle wechselt `data-theme`, Wahl überlebt Reload
   (LocalStorage `dpn-theme`) und Client-Navigation; kein FOUC-Regressionstest
   über `<html>`-Attribut beim Erstrender.
3. **Sprachwechsel:** `/about/` → EN-Switch landet auf `/en/about/` (Pfad bleibt
   erhalten, nicht Homepage); zurück analog; `hreflang`-Alternates konsistent.

**Akzeptanzkriterien:**

- [ ] Alle drei Flows als Playwright-Tests im `tests`-Job, lokal und in CI grün
- [ ] Formular-Assertions laufen gegen den **Build-Output** (dist), nicht nur den Dev-Server
- [ ] Theme-Test deckt beide Richtungen (dark→light→dark) inkl. Persistenz ab
- [ ] Sprachwechsel-Test für mindestens 2 verschiedene Seiten (nicht nur Home)

**Abgrenzung:** Keine visuelle Regression (bewusst außerhalb des
90-Tage-Fensters); keine CSP-bezogenen Assertions (→ AP3-3).

---

### AP3-2 · Inline-Styles und Inline-Scripts CSP-fähig machen

**Backlog:** #6 (Teil 1) · Aufwand 3 / Nutzen 3 / Risiko 3 · Bereich: Sicherheit
**Hängt ab von:** AP2-1, AP2-2 (Sicherheitsnetze aktiv)

**Beschreibung:**
Vorbereitung für die CSP-Verschärfung — diese Aufgabe ändert **nur Code**, noch
nicht den CSP-Header. Vollständiges Inventar und Ablösung aller Stellen, die
heute `'unsafe-inline'` benötigen:

1. **Inline-`style=""`-Attribute** (betroffen von `style-src`): u. a.
   TerminalWindow-Ampelpunkte, komponentenlokale CSS-Variablen-Übergaben
   (z. B. `--dpn-…`-Werte per `style`-Attribut). Ablösen durch Klassen bzw.
   `define:vars`-freie Lösungen (Datenattribute + CSS, oder generierte
   Klassen). Astro-`<style>`-Blöcke selbst sind unkritisch (werden im Build
   zu externen Dateien extrahiert).
2. **`<script is:inline>`** (betroffen von `script-src`): das
   Theme-FOUC-Script in `BaseLayout.astro` in eine kleine externe Datei
   auslagern, die früh im `<head>` geladen wird (`<script src>` ohne
   `defer`, damit der FOUC-Schutz erhalten bleibt).
3. **JSON-LD-Blöcke** (`<script type="application/ld+json">`) sind
   non-executable Data-Blocks und von `script-src` nicht betroffen —
   unverändert lassen, im PR kurz dokumentieren.

**Akzeptanzkriterien:**

- [ ] `grep -rn 'style="' dist/` nach Build: keine Treffer mehr in den HTML-Ausgaben (oder jede verbliebene Stelle im PR einzeln begründet)
- [ ] Kein `<script>` ohne `src` im Build-Output außer `application/ld+json`
- [ ] Theme-FOUC weiterhin verhindert: hartes Reload im Light-Theme zeigt keinen Dark-Flash (manuell + Playwright-Check aus AP3-1 grün)
- [ ] Komplette Test-Suite (Smoke, A11y, Kernflows) grün; visuell keine Regression in beiden Themes

**Abgrenzung:** Der CSP-Header in `netlify.toml` bleibt in dieser Aufgabe
unverändert (→ AP3-3).

---

### AP3-3 · CSP verschärfen: `unsafe-inline` entfernen

**Backlog:** #6 (Teil 2) · Aufwand 2 / Nutzen 3 / Risiko 3 · Bereich: Sicherheit
**Hängt ab von:** AP3-2 (zwingend), AP2-1–AP2-3 (Gates aktiv)

**Beschreibung:**
Nach der Code-Ablösung aus AP3-2 die ausgelieferten Header in
`public/_headers` verschärfen:
`'unsafe-inline'` aus `script-src` **und** `style-src` entfernen. Verifikation
auf einem Netlify Deploy-Preview (Header greifen nur dort, nicht im lokalen
Dev-Server): alle Seiten, beide Themes, beide Locales, Theme-Umschaltung,
Client-Navigation, Matrix-Effekte — Browser-Konsole muss frei von
CSP-Violation-Reports sein.

**Akzeptanzkriterien:**

- [ ] `netlify.toml`: `script-src 'self'` und `style-src 'self'` (kein `unsafe-inline` mehr)
- [ ] Deploy-Preview: 0 CSP-Violations in der Konsole über alle 12 Routen, beide Themes, inkl. Theme-Toggle und Navigation
- [ ] Komplette CI (Smoke, A11y, Lighthouse) auf dem PR grün
- [ ] Rollback-Pfad im PR dokumentiert (ein Revert des `netlify.toml`-Hunks genügt)

**Abgrenzung:** Keine weiteren Header-Änderungen (HSTS, Report-Only-Monitoring
etc. bleiben bewusst außerhalb des 90-Tage-Fensters, siehe Roadmap).

---

## Paket 4 — Astro-Best-Practice-Audit (ab Tag 91)

**Baseline dieses Pakets:** Branch `master` @ `97ef975`, verifiziert per
Repository-Analyse am 2026-08-20. Paket 1–3 (siehe Abschlussstatus oben) sind
vollständig umgesetzt — dieses Paket baut darauf auf und adressiert Punkte,
die außerhalb des ursprünglichen 90-Tage-Fensters lagen: Bild- und
JS-Auslieferungspipeline, Messbarkeit (KPIs) und deren Verankerung in der CI.

**Reihenfolge:** frei, außer wo `Hängt ab von:` es erzwingt. AP4-1 ist
zuerst umgesetzt, weil er das höchste Wartbarkeits-/Performance-Risiko trägt
und keine Abhängigkeiten zu anderen Punkten hat.

---

### AP4-1 · JS-Auslieferung entduplizieren und durch die Astro/Vite-Pipeline führen

**Backlog:** Audit 2026-08-20 · Aufwand 3 / Nutzen 5 / Risiko 2 · Bereich: Technik/Performance
**Status:** ✅ Erledigt am 2026-08-20

**Beschreibung:**
`public/scripts/*.js` lief vollständig am Astro/Vite-Build vorbei
(`is:inline` + `src=`, kein Bundling/Minify/Hashing) und war über
`eslint.config.js`s `ignores: ['public/**']` komplett ungeprüft. Die
Kern-Ticker-Engine der Matrix-Effekte war dabei **vierfach** dupliziert:
als toter, nie referenzierter `public/scripts/matrix-engine.js`, als toter,
nie importierter `src/scripts/matrix-engine.ts` (dokumentierte Quelle) und
zusätzlich noch einmal händisch hineinkopiert in sowohl
`matrix-backdrop.js` als auch `matrix-portrait.js`.

**Umsetzung:**

- Alle Skripte außer dem FOUC-kritischen Theme-Bootstrap nach
  `src/scripts/*.ts` migriert und über Astros reguläre (nicht-inline)
  `<script>`-Verarbeitung geladen (`<script>import '../../scripts/x';</script>`)
  → automatisches Bundling, Minify, Content-Hash über Vite.
  Betroffen: `theme-toggle`, `nav`, `role-rotator`, `matrix-backdrop`,
  `matrix-portrait`.
- `matrix-backdrop.ts` und `matrix-portrait.ts` importieren jetzt beide die
  eine reale `src/scripts/matrix-engine.ts` (`addMatrixInstance`,
  `clampedDpr`) statt sie zu duplizieren — Vite dedupliziert den gemeinsamen
  Code automatisch in einen einzigen gehashten Chunk (`matrix-engine.*.js`).
- **Ausnahme, bewusst:** `theme-bootstrap.ts` muss ein synchroner,
  nicht-modularer Head-Script bleiben (FOUC-Prävention vor dem ersten Paint) —
  Astros Standard-Skriptverarbeitung liefert dafür immer `type="module"`
  (deferred), was den Dark-Flash zurückbringen würde. Quelle bleibt daher in
  TS (`src/scripts/theme-bootstrap.ts`, typgeprüft/gelintet), wird aber per
  `scripts/build-critical-scripts.mjs` (esbuild, IIFE, minifiziert) zu
  `public/scripts/theme-bootstrap.js` gebaut — neue npm-Scripts
  `build:critical-scripts`, als `predev`/`prebuild`-Hook verdrahtet.
- Neuer CI-Schritt `Verify generated critical scripts are up to date`
  (`quality`-Job) verhindert Drift zwischen Quelle und generierter Datei.
- `matrix-portrait-referenz.js` (unversionierte Altlast im Repo-Root) sowie
  alle sechs toten `public/scripts/*.js`-Dateien entfernt.
- `eslint.config.js`: `public/**`-Blindspot geschlossen (nur noch die eine
  generierte Datei ausgenommen). `tsconfig.json`: dieselbe Datei von
  `astro check` ausgeschlossen (ist Build-Output, keine Quelle).

**Akzeptanzkriterien:**

- [x] Kein `public/scripts/*.js` mehr außer der generierten `theme-bootstrap.js`
- [x] `matrix-engine`-Logik existiert nur noch einmal (`src/scripts/matrix-engine.ts`), von beiden Matrix-Komponenten importiert
- [x] `eslint.config.js` schließt nur noch die eine generierte Datei aus, nicht mehr `public/**`
- [x] `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run build` grün
- [x] Vollständige Playwright-Suite (Smoke, A11y × 2 Themes, Kernflows — 40 Tests) grün gegen den neuen Build
- [x] CI verifiziert Drift zwischen `src/scripts/theme-bootstrap.ts` und dem generierten Output

**Abgrenzung:** Keine Verhaltensänderung der Skripte (1:1-Portierung der
Logik); keine CSP-Änderung (Scripts bleiben `'self'`); AP4-2 (Bilder) und
AP4-5 (CSS-Governance) sind separate Aufgaben.

---

### AP4-2 · `astro:assets` für alle Bilder nutzen

**Backlog:** Audit 2026-08-20 · Aufwand 2 / Nutzen 4 / Risiko 1 · Bereich: Performance
**Status:** ✅ Erledigt am 2026-08-20

**Beschreibung:**
`sharp` war als devDependency installiert, wurde aber nirgends verwendet.
Das Porträt (`MatrixPortrait.astro`, genutzt auf der About-Seite) war ein
rohes `<img src>` auf eine statische Datei in `public/images/` — kein
automatisches WebP/AVIF, kein responsives `srcset`, manuell gepflegte
`width`/`height`-Props (840×1050).

**Fund unterwegs:** `Avatar.astro` wird an keiner einzigen Stelle im Code
verwendet (`grep -rn '<Avatar' src` → 0 Treffer) — ähnlich wie das
`Illustration.astro`-Muster aus AP1-4. Diese Aufgabe hat daher **nur das
Porträt** migriert; `Avatar.astro` bleibt unangetastet und ist als offene
Produktentscheidung zu behandeln (einbauen oder entfernen), nicht Teil des
Bild-Pipeline-Themas.

**Umsetzung:** Entgegen der ursprünglichen Annahme unten ließ sich
`<Image>` aus `astro:assets` direkt verwenden — die Komponente rendert ein
einzelnes echtes `<img>`-Element ohne Wrapper, genau das, was der
Canvas-Overlay-Code in `matrix-portrait.ts` per `querySelector('img')`
erwartet. `src/assets/images/dominik-portrait.jpg` ist eine **Kopie** der
Originaldatei (die in `public/images/` bleibt unverändert bestehen, da
`site.photo` für `og:image` und das `Person`-JSON-LD eine stabile,
unprozessierte URL braucht). `MatrixPortrait.astro` erhält jetzt
`src: ImageMetadata` statt `src/width/height: string/number` und rendert
mit `densities={[1, 2]}` + `format="webp"` bei einer festen Layout-Breite
von 420px (passend zu `.dpn-portrait`s CSS-`max-width`).

**Ergebnis (Build-Log):**

```
▶ dominik-portrait…webp (1x, 420w): 53kB → 11kB (−79%)
▶ dominik-portrait…webp (2x, 840w): 53kB → 32kB (−40%)
```

Die meisten Besucher (Standard-Displays, nicht Retina) laden jetzt 11 kB
statt 53 kB für das wahrscheinliche LCP-Element der About-Seite.

**Akzeptanzkriterien:**

- [x] Porträt läuft durch `astro:assets` (Build-Output enthält optimierte, gehashte WebP-Dateien mit korrektem `srcset`)
- [x] `width`/`height` kommen aus den tatsächlichen Bilddaten (`MatrixPortrait.astro` braucht keine `width`/`height`-Props mehr)
- [x] WebP als Ausgabeformat (AVIF nicht zusätzlich — Dateigröße rechtfertigt den zusätzlichen Build-Zeit-Aufwand hier nicht)
- [x] `MatrixPortrait`-Canvas-Overlay funktioniert unverändert (52/52 Playwright-Tests grün, inkl. A11y auf `/about/` in beiden Themes; Screenshot-Sichtprüfung im echten Browser)
- [x] Bild-Bytes sinken messbar (Build-Log-Zahlen oben — direkter, präziserer Nachweis als ein erneuter Lighthouse-Lauf für denselben Sachverhalt)

**Abgrenzung:** Keine Änderung an `og/dopanik.png` (statisches Social-Card-Bild, bewusst nicht durch die Bildpipeline optimiert, da es 1:1 als Meta-Tag-URL referenziert wird) und keine Änderung an `Avatar.astro` (siehe Fund oben).

---

### AP4-3 · Lighthouse-Budget auf alle Routen ausweiten

**Backlog:** Audit 2026-08-20 · Aufwand 1 / Nutzen 3 / Risiko 1 · Bereich: Messbarkeit
**Status:** ✅ Erledigt am 2026-08-20 (verifizierter Testlauf: 48/48 Runs grün
über 16 Routen — die ursprünglichen 12 plus die 4 neuen Impressum-/
Datenschutz-Seiten aus AP4-6; proportional < 9 min Gesamtlaufzeit, klar
innerhalb des 15-Minuten-Budgets)

**Beschreibung:**
`.lighthouserc.cjs` prüfte ursprünglich nur `/` und `/about/`. Talks, Writing,
Contact und alle `/en/*`-Seiten waren Performance-blind, obwohl
`tests/site-routes.ts` bereits alle Routen kennt (dort für die A11y-Suite
genutzt).

**Umsetzung:** `collect.url` in `.lighthouserc.cjs` auf dieselben Pfade wie
`smokeRoutes` erweitert (Import aus `tests/site-routes.ts` ist wegen
CJS/ESM-Mix des LHCI-Configs nicht direkt möglich — Liste dupliziert
gepflegt, mit Kommentar-Verweis auf die Quelle der Wahrheit).

**Akzeptanzkriterien:**

- [x] Alle Routen in `collect.url` (12 ursprüngliche + 4 aus AP4-6, insgesamt 16)
- [x] 3 Runs pro Route (bestehende Einstellung beibehalten)
- [x] CI-Laufzeit des `lighthouse`-Jobs bleibt < 15 Minuten (lokal verifiziert: 48 Runs grün, deutlich unter dem Budget)
- [x] Kommentar in `.lighthouserc.cjs` verweist auf `tests/site-routes.ts` als Ort, an dem Routen zuerst gepflegt werden

**Abgrenzung:** Keine neuen Assertions/Budgets (→ AP4-4).

---

### AP4-4 · Harte Ressourcen-Budgets — zunächst als Audit, vorbereitet für Blocking

**Backlog:** Audit 2026-08-20 · Aufwand 2 / Nutzen 4 / Risiko 1 · Bereich: Messbarkeit
**Hängt ab von:** AP4-3
**Status:** ✅ Erledigt am 2026-08-20
**Entscheidung (2026-08-20):** Läuft zunächst **nicht-blockierend** (reine
Audit-/Reporting-Funktion). Struktur ist so angelegt, dass das Umschalten
auf blockierend eine Ein-Zeilen-Änderung pro Assertion ist (`warn` → `error`).

**Beschreibung:**
Zuvor nur `categories:performance`/`categories:accessibility` als
Score-Schwellen, beide auf `warn`. Ein Score kann trotz spürbarer
Byte-Regression (z. B. +80 kB JS) stabil bleiben — der Score allein ist kein
verlässliches Frühwarnsystem.

**Umsetzung:** In `.lighthouserc.cjs` unter `assert.assertions` ergänzt, mit
Schwellen aus einem echten Messlauf (nicht geraten) auf der aktuellen
`master`-Baseline (2026-08-20, nach AP4-1–AP4-7):

```js
// Baseline: schwerste Route (/about/, matrix-portrait-Bundle + optimiertes
// WebP-Porträt) maß ~14,2 KB Script, ~33,7 KB Bild, ~203 KB gesamt, 0ms
// unused-JS-Ersparnis. Schwellen unten geben ~30–50% Puffer.
'resource-summary:script:size': ['warn', { maxNumericValue: 20000 }], // BLOCKING: warn → error
'resource-summary:image:size': ['warn', { maxNumericValue: 50000 }], // BLOCKING: warn → error
'resource-summary:total:size': ['warn', { maxNumericValue: 260000 }], // BLOCKING: warn → error
'unused-javascript': ['warn', { maxNumericValue: 50 }], // BLOCKING: warn → error
```

**Korrektur gegenüber der ursprünglichen Planung:** `unused-javascript`s
`numericValue` ist eine geschätzte Ladezeit-Ersparnis in **Millisekunden**,
kein Byte-Wert — `maxLength` (für Array-Längen gedacht) wäre falsch gewesen.
Jetzt korrekt `maxNumericValue` in ms, mit kleinem Puffer (50ms) statt hartem
0, um bei minimalen Messschwankungen nicht unnötig auszuschlagen.

**Akzeptanzkriterien:**

- [x] Vier Assertions ergänzt, Schwellen aus echtem Messlauf (48/48 Runs grün) abgeleitet und im Config-Kommentar dokumentiert
- [x] Alle Assertions auf `warn` (CI wird durch diese Aufgabe nicht rot)
- [x] Jede neue Assertion trägt den `BLOCKING`-Kommentar zur einfachen späteren Umschaltung
- [x] Anleitung im Kommentarblock: `warn` → `error` pro Zeile, einzeln umschaltbar

**Abgrenzung:** Kein tatsächliches Umschalten auf `error` in dieser Aufgabe — das ist eine bewusste Folgeentscheidung, siehe Rückfrage im Chat-Verlauf.

---

### AP4-5 · Design-Token-Governance automatisieren (Stylelint)

**Backlog:** Audit 2026-08-20 · Aufwand 2 / Nutzen 3 / Risiko 1 · Bereich: Wartbarkeit
**Status:** ✅ Erledigt am 2026-08-20 — mit bewusst engerem Scope als ursprünglich geplant (siehe unten)

**Beschreibung:**
`CLAUDE.md` fordert explizit: "Never hardcode a hex, px-size, font, radius or
duration that a token already provides." Es gab aber keine Automatisierung.

**Tatsächlicher Scope (abweichend vom ursprünglichen Plan):** Bei der
Umsetzung zeigte sich, dass `--color-*`/`--radius-*`/`--duration-*` bereits
fast vollständig sauber sind (4 Hex-Ausnahmen, 1 legitime `border-radius: 50%`,
0 Duration-Verstöße außerhalb `tokens/`) — dort automatisiert durchsetzbar,
ohne Bestandswerte zu ändern. `font-size` dagegen ist zu 62 % (32 von 52
Deklarationen) literal statt `var(--text-*)`, teils mit Werten (14px, 19px,
26px), die gar keinem vorhandenen Token entsprechen — eine Durchsetzung hätte
entweder Dutzende Bestandswerte umschreiben oder Dutzende Ausnahme-Kommentare
erzeugen müssen, beides im Widerspruch zur Abgrenzung unten. `font-size` und
Spacing (`px` in `padding`/`margin`/`gap`) sind daher **bewusst nicht**
Teil dieser Aufgabe — Kandidat für eine spätere, eigene
Bestandsbereinigungs-Aufgabe.

**Umsetzung:** `stylelint` (kein zusätzliches Plugin nötig) als
Dev-Dependency, `stylelint.config.mjs` mit der eingebauten Regel
`declaration-property-value-disallowed-list`: verbietet rohe Hex-Werte auf
jeder Property, rohe `px`/`em`/`rem`-Werte auf `border-radius`, und rohe
`ms`/`s`-Werte auf `transition(-duration/-delay)`/`animation(-duration/-delay)`
— jeweils via `overrides` ausgenommen für `src/styles/tokens/**`. Neuer
`npm run lint:css`, in `ci.yml`s `quality`-Job nach `npm run lint` ergänzt.

Sechs gefundene Verstöße (Mask-Gradient-Alphastufen in `matrix-backdrop.css`
und `home.css`, `--_fg: #fff` im Danger-Button, die View-Transition-Dauer in
`global.css`, die Scroll-Fade-Dauer in `nav.css`, die Cursor-Blink-Rate in
`role-rotator.css`) sind allesamt begründete, bleibende Designentscheidungen
— mit `/* stylelint-disable(-next-line) */` samt Begründungskommentar markiert,
keine Werte verändert.

**Akzeptanzkriterien:**

- [x] `npm run lint:css` lokal grün auf dem Bestand (6 Ausnahmen, alle begründet und minimal)
- [x] Neuer roher Hex-/`border-radius`-Wert außerhalb `tokens/` lässt `lint:css` fehlschlagen (mit Testfall in `badge.css` verifiziert, danach entfernt)
- [x] CI-Schritt in `quality`-Job ergänzt (`Lint CSS (design tokens)`)
- [x] `docs/styleguide/07-checklist.md` verweist auf den neuen automatisierten Check (inkl. Hinweis, was er _nicht_ abdeckt)

**Abgrenzung:** Keine Umformulierung bestehender CSS-Werte über die
notwendigen Ausnahme-Kommentare hinaus. `font-size` und Spacing (`px` in
`padding`/`margin`/`gap`) sind nicht durchgesetzt (siehe oben) —
Bestandsbereinigung ist eine separate, spätere Aufgabe.

---

### AP4-6 · Datenschutzfreundliches Tracking (Plausible) + Feld-Performance-Daten

**Backlog:** Audit 2026-08-20 · Aufwand 2 / Nutzen 4 / Risiko 1 · Bereich: Messbarkeit/Recht
**Teilstatus (2026-08-20):** Schritt 1, 2 und 4 der Umsetzung sind erledigt
(Script-Einbindung + CSP + Impressum/Datenschutz-Platzhalterseiten). Nur
Schritt 3 (CWV-Custom-Event) ist **offen** und bewusst zurückgestellt — dafür
ist eine Entscheidung zum Plausible-Plan nötig (siehe Einrichtungsanleitung).
**Entscheidung (2026-08-20):** Tool ist **Plausible Analytics**
(Plausible Insights OÜ, Estland; EU-Hosting-Option in Frankfurt via Hetzner),
gewählt wegen EU-Sitz, keinem Cookie-Bedarf und nativer Custom-Events-Unterstützung
für die Feld-CWV-Anbindung.

**Beschreibung:**
Lighthouse CI liefert ausschließlich Lab-Daten (synthetische Bedingungen).
Ohne Felddaten (echte Nutzer:innen, echte Geräte/Netzwerke) bleibt unklar,
ob Optimierungen im Feld ankommen — das widerspricht direkt der Prämisse
"nur was wir messen, können wir verbessern". Aktuell ist auf der Seite kein
Analytics-Tool aktiv.

**Wichtiger rechtlicher Hinweis:** Das Repository enthält aktuell **keine
Datenschutzerklärung und kein Impressum** (`grep` über `src/pages` liefert
keine Treffer). Auch ein cookie-freies, DSGVO-konformes Tool wie Plausible
befreit nicht von der Informationspflicht nach Art. 13 DSGVO — die
Datenverarbeitung muss in einer Datenschutzerklärung offengelegt werden,
und ein Impressum ist für eine Seite mit klarem geschäftlichem Bezug
(§5 TMG / §18 MStV) ohnehin unabhängig vom Tracking-Thema fällig. Diese
Aufgabe liefert eine technische Vorlage (Struktur, Pflichtangaben als
Platzhalter) — keine Rechtsberatung. Vor Go-Live: anwaltliche Prüfung oder
ein Generator (z. B. e-recht24, Datenschutz-Generator.de) empfohlen.

**Umsetzung:**

1. Plausible-Script in `BaseLayout.astro` einbinden, nur in Production
   (`import.meta.env.PROD`-Guard), damit lokale Dev-Sessions nicht mitzählen.
2. `public/_headers`: CSP um `script-src` + `connect-src` für die
   Plausible-Domain erweitern (exakte Domain hängt von EU- vs.
   Standard-Hosting ab, siehe Einrichtungsanleitung unten).
3. Custom Event `pageview-props` bzw. eigenes Event für Core-Web-Vitals
   (LCP/INP/CLS) aus dem `web-vitals`-Package an Plausible senden
   (Growth-Plan+ für Custom Properties nötig) — alternativ, falls kein
   Growth-Plan gewünscht: CWV weiterhin nur über Google Search Console
   beziehen und Plausible nur für Seitenaufrufe/Referrer nutzen.
4. ~~Minimal-Datenschutzerklärung und Impressum als eigene Seiten anlegen.~~
   ✅ erledigt — `/impressum` + `/en/impressum`, `/datenschutz` +
   `/en/datenschutz` (gleicher Slug in beiden Locales, damit die
   hreflang-Logik in `BaseLayout.astro` unverändert bleibt). Inhalte über
   `t.legal`/`t.privacy` in `src/i18n/{de,en}.ts`, im Footer verlinkt
   (`Footer.astro`), in `tests/site-routes.ts` und `.lighthouserc.cjs`
   mitaufgenommen (16 statt 12 Routen).

**Stand der Platzhalter (2026-08-20):** Drei von vier offenen Punkten sind
geklärt:

- USt-IdNr.: keine vorhanden → Abschnitt aus beiden Locales entfernt.
- EU-Streitschlichtung: Standardformulierung ("nicht bereit und nicht
  verpflichtet, teilzunehmen") eingetragen.
- Netlify-Rechtsgrundlage (EU-US Data Privacy Framework / Standardvertragsklauseln):
  recherchiert und eingetragen, ohne Rückfrage nötig.
- Nebenbei korrigiert: TMG wurde zum 14.05.2024 vom Digitale-Dienste-Gesetz
  (DDG) abgelöst — `§ 5 TMG` → `§ 5 DDG`. Die genauen Haftungs-Paragrafen
  (vormals §§ 7–10 TMG) lassen sich wegen der Überlappung mit dem EU Digital
  Services Act nicht sicher 1:1 übertragen — der Abschnitt „Haftung für
  Inhalte" benennt daher DDG/DSA als einschlägige Rahmenwerke, ohne einen
  einzelnen Paragrafen zu zitieren, den ich nicht zweifelsfrei verifizieren
  konnte.

**Noch offen: die Anschrift.** Der Nutzer möchte die Privatadresse nicht
veröffentlichen. Rechtlich zulässig ist jede Adresse, unter der tatsächlich
Post ankommt und die Person erreichbar ist ("ladungsfähige Anschrift") — ein
reines Postfach genügt laut Rechtsprechung nicht, eine Geschäfts-/Büroadresse
(Coworking-Space, virtuelle Geschäftsadresse) dagegen schon. Der Platzhalter
in `src/i18n/de.ts`/`en.ts` weist jetzt genau darauf hin. Die
Datenschutzerklärung verweist nur noch auf "Anschrift wie im Impressum"
(keine doppelte Pflege). Sobald eine Adresse feststeht: einfach die
Platzhalterzeile ersetzen lassen.

**Einrichtungsanleitung (für dich, manuell — kann ich nicht automatisiert für dich tun):**

1. ~~Account unter <https://plausible.io/register> anlegen.~~ ✅ erledigt (Snippet lag bereits vor)
2. ~~Domain hinzufügen, EU-Datenhaltung prüfen.~~ ✅ erledigt
3. ~~Snippet an mich übergeben.~~ ✅ erledigt — eingebaut in `src/layouts/BaseLayout.astro`
   (Production-Guard) und `public/scripts/plausible-init.js`; CSP in
   `public/_headers` um `https://plausible.io` (script-src + connect-src) erweitert.
4. **Bei dir:** nach dem nächsten Deploy im Plausible-Dashboard
   verifizieren, dass Seitenaufrufe ankommen (kann einige Minuten dauern).
5. **Bei dir:** echte Impressum-/Datenschutz-Texte besorgen (siehe oben)
   und mir zum Eintragen geben.
6. Optional, für Custom Events (Kontaktformular-Absendung, Talk-Link-Klicks,
   CWV-Beacon): im Plausible-Plan auf "Growth" oder höher wechseln — sag
   Bescheid, wenn das gewünscht ist, dann ergänze ich die Event-Aufrufe im Code.

**Akzeptanzkriterien:**

- [x] Plausible-Script nur im Production-Build aktiv, CSP entsprechend angepasst
- [x] `/impressum` und `/datenschutz` (+ EN-Pendants) existieren, im Footer verlinkt, als Platzhalter klar mit einem Prüfhinweis markiert
- [x] Datenschutzerklärung nennt Plausible als Auftragsverarbeiter, Zweck, keine Cookies, keine personenbezogenen Daten — Inhalt vorhanden, weiterhin mit Prüfhinweis auf der Seite (kein Ersatz für eine Rechtsprüfung)
- [ ] Erste echte Seitenaufrufe im Plausible-Dashboard sichtbar (manuell nach Deploy verifiziert — **Aktion bei dir**)
- [ ] Entscheidung zu Custom Events (CWV-Beacon ja/nein, welcher Plan) dokumentiert

**Abgrenzung:** Keine automatisierte Auswertung/Reporting-Pipeline der
Plausible-Daten in dieser Aufgabe (z. B. kein wöchentlicher CI-Report) —
das Dashboard selbst ist die erste Stufe der Messbarkeit.

---

### AP4-7 · RSS-Feed für die Writing-Collection

**Backlog:** Audit 2026-08-20 · Aufwand 1 / Nutzen 2 / Risiko 1 · Bereich: SEO/Reichweite
**Status:** ✅ Erledigt am 2026-08-20

**Beschreibung:** `src/content/writing/*` existiert nur als Linkliste zu
dev.to/LinkedIn-Artikeln, kein Feed vorhanden.

**Umsetzung:** `@astrojs/rss` eingebunden, `src/lib/rss.ts` baut den Feed
(Filter: `!placeholder && url` gesetzt, gleiche Sortierung wie
`WritingPage.astro`), `src/pages/rss.xml.ts` (DE) und
`src/pages/en/rss.xml.ts` (EN) als schlanke Endpoints, Titel/Beschreibung
aus `t.writing.seoTitle`/`seoDescription` (kein neuer i18n-String nötig).
`<link rel="alternate" type="application/rss+xml">` in `BaseLayout.astro`
ergänzt, locale-abhängig verlinkt.

**Akzeptanzkriterien:**

- [x] `/rss.xml` und `/en/rss.xml` im Build-Output (verifiziert: korrektes XML, Escaping stimmt)
- [x] Item-Anzahl entspricht den nicht-Platzhalter-Einträgen mit URL je Locale (4 DE, 4 EN)
- [x] `<link rel="alternate">` in `BaseLayout.astro` ergänzt, pro Locale auf den richtigen Feed

**Abgrenzung:** Kein Feed für `talks` (Veranstaltungen sind kein
klassischer Feed-Inhalt).

---

### AP4-8 · Dynamische OG-Image-Generierung

**Backlog:** Audit 2026-08-20 · Aufwand 3 / Nutzen 2 / Risiko 2 · Bereich: SEO
**Status:** ✅ Erledigt am 2026-08-20

**Beschreibung:** Nur `AboutPage.astro` überschrieb `ogImage` (Porträt);
Talks, Writing, Contact teilten sich das eine statische `/og/dopanik.png`.

**Umsetzung:** `src/lib/og-image.ts` rendert mit `satori` + `@resvg/resvg-js`
zur Build-Zeit ein 1200×630-PNG im Design-System-Look (Terminal-Chrome mit
Ampel-Punkten, `//`-Eyebrow in Phosphor-Grün, Titel in JetBrains Mono 800,
DoPaNik-Wortmarke) — Farben sind die aufgelösten Hex-Werte aus
`src/styles/tokens/colors.css` (Satori kann keine CSS-Custom-Properties
lesen). Vier schlanke Astro-Endpoints (`src/pages/og/{talks,writing}.png.ts`

- `en/`-Pendants) rufen das gemeinsam genutzte Modul auf, analog zum
  `src/lib/rss.ts`-Muster aus AP4-7.

**Zwei Stolpersteine unterwegs, beide gelöst:**

1. Satori kann die WOFF2-Variable-Font-Dateien aus `public/fonts/` nicht
   parsen (`Unsupported OpenType signature wOF2`) — und selbst eine TTF-Variable-Font
   von Google Fonts scheiterte an einem `fvar`-Table-Parsing-Fehler in Satoris
   `opentype.js`-Fork. Lösung: `scripts/fetch-og-fonts.mjs` (nach dem Muster von
   `fetch-portrait.mjs` — einmalig ausgeführt, Ergebnis committed) lädt
   statische, nicht-variable JetBrains-Mono-TTFs direkt vom offiziellen
   JetBrains-Repo nach `src/assets/fonts/`.
2. `import.meta.url`-relative Pfade zu den Font-Dateien brachen im Build,
   weil Astro/Vite den Endpoint-Code nach `dist/.prerender/chunks/`
   verschiebt. Gelöst über `path.join(process.cwd(), 'src/assets/fonts')` —
   `astro build` läuft immer vom Projekt-Root aus.

**Nebenbei gefundener und behobener Bestandsfehler:** `og:image:width`/
`og:image:height` in `BaseLayout.astro` waren fest auf 840×1050
(Porträt-Maße) verdrahtet — auch für das 1200×630-Standardbild auf allen
anderen Seiten. Jetzt echte Props mit Default 1200×630, `AboutPage.astro`
überschreibt explizit auf 840×1050.

**Akzeptanzkriterien:**

- [x] Talks- und Writing-Übersichtsseite (DE+EN) bekommen ein kontextspezifisches OG-Bild
- [x] Generierung läuft zur Build-Zeit (verifiziert: `dist/og/{talks,writing}.png` + `en/`-Pendants nach `npm run build`, kein Laufzeit-Rendering)
- [x] Bildgröße/-format entspricht dem bisherigen Standard (1200×630 PNG, verifiziert per `file`)
- [x] Fallback auf `/og/dopanik.png` bleibt für Seiten ohne spezifisches Bild erhalten (Home/Contact/Impressum/Datenschutz unverändert)

**Abgrenzung:** Niedrigste Priorität in Paket 4 — nach AP4-1 bis AP4-6 angegangen. Kein OG-Bild pro einzelnem Talk/Artikel (keine eigenen Permalinks auf dieser Seite).

---

### AP4-9 · Nachgelagertes Aufräumen (Restspuren aus AP4-1)

**Backlog:** Audit 2026-08-20 · Aufwand 1 / Nutzen 1 / Risiko 1 · Bereich: Wartbarkeit
**Hängt ab von:** AP4-1
**Status:** ✅ Erledigt am 2026-08-20

**Beschreibung:** Kontrollpunkt, ob nach AP4-1 wirklich keine Restspuren
bleiben (z. B. falls in einem parallelen Branch neue `is:inline`-Skripte
hinzukamen, die denselben Fehler wiederholen).

**Ergebnis:** Zwei neue `is:inline`-Stellen sind seit AP4-1 dazugekommen
(AP4-6, Plausible) — beide bewusst und aus demselben Grund wie der
ursprüngliche Theme-Bootstrap-Fall (CSP-konformes, nicht gebündeltes
Vendor-Snippet): der externe Plausible-Tracker-Script-Tag und
`public/scripts/plausible-init.js`. Keine unbeabsichtigte Drift — die
Kriterien unten sind entsprechend präzisiert.

**Akzeptanzkriterien:**

- [x] `grep -rn 'is:inline' src` liefert nur den JSON-LD-Block, den
      Theme-Bootstrap-Fall und die zwei Plausible-Script-Tags aus
      `BaseLayout.astro` — alle vier dokumentiert und begründet, keine
      unbegründeten neuen Treffer
- [x] `public/scripts/` enthält ausschließlich `theme-bootstrap.js`
      (generiert, AP4-1) und `plausible-init.js` (Vendor-Stub, AP4-6) —
      keine weiteren, undokumentierten Dateien

**Abgrenzung:** Reiner Kontrollpunkt, keine neue Funktionalität.

---

### AP4-10 · Visuelles Regressionstesting

**Backlog:** Audit 2026-08-20 · Aufwand 3 / Nutzen 3 / Risiko 1 · Bereich: Qualität
**Hinweis:** Bisher unter "Bewusst nicht enthalten" geführt — wird mit
Paket 4 aktiv eingeplant, da die Basis aus Paket 2/3 (Playwright-Infrastruktur)
jetzt seit Monaten stabil läuft.

**Beschreibung:** Bei einem stark gestalteten Dual-Theme-System (Dark/Light,
Matrix-Canvas-Effekte) gibt es keine Screenshot-Snapshots. Unbeabsichtigte
visuelle Drift bei CSS-Refactorings fällt aktuell nur manuell auf.

**Umsetzung:** `toHaveScreenshot()`-Assertions für die 12 Routen × 2 Themes
in einem neuen, separaten Playwright-Projekt/Testfile, das **nicht** den
`tests`-Job blockiert (eigener CI-Job, `continue-on-error: true` oder nur
bei manuellem `workflow_dispatch`), da Screenshot-Diffs bei bewussten
Redesigns hohe Update-Last erzeugen.

**Akzeptanzkriterien:**

- [ ] Baseline-Screenshots für alle 12 Routen × 2 Themes committed
- [ ] Neuer CI-Job/Step meldet Diffs, ohne den PR standardmäßig zu blockieren
- [ ] Dokumentierter Befehl zum bewussten Update der Baseline (`--update-snapshots`)

**Abgrenzung:** Kein Cross-Browser-Vergleich (nur Chromium, konsistent mit der bestehenden Suite).

---

## Bewusst nicht enthalten (aus der Roadmap übernommen)

- **CSP-Report-Only-Monitoring** mit Reporting-Endpoint — bräuchte einen
  Report-Collector und damit Infrastruktur außerhalb des Backend-losen Setups.

---

## Abschlussstatus — 2026-08-19

Die Implementierung von AP1-1 bis AP3-3 wurde auf `redesign-astro`
abgeschlossen, im Pull Request #1 verifiziert und ist seither vollständig in
`master` aufgegangen (`redesign-astro` wurde nach Bestätigung der Identität
beider Bäume gelöscht):

- `format:check`, `lint`, `typecheck` und `build` grün
- Playwright: alle 12 Routen, beide Locales und beide Themes grün
  (`tests/smoke.spec.ts`, `a11y.spec.ts`, `core-flows.spec.ts`)
- axe-core: keine blockierenden A11y-Verstöße
- Lighthouse CI: 3 Läufe für `/` und `/about/`, Budgets grün
- Deploy Preview: Build, Forms, Header-Regeln und Preview-Status grün
- CSP: `script-src`/`style-src` ohne `unsafe-inline`; keine Inline-Styles aus
  der Anwendung

Die zuvor offene externe Verifikation ist erledigt: Dependabot ist unter
`master` aktiv, der Required Check `Lint, typecheck & build` greift korrekt.
Dabei zeigte sich ein zusätzlicher Punkt außerhalb der ursprünglichen
Arbeitspakete — drei ausstehende Dependabot-PRs scheiterten am
`npm audit --omit=dev --audit-level=high`-Schritt wegen transitiver
Hochrisiko-Funde in `js-yaml`, `nanoid` und `postcss`, unabhängig vom
jeweiligen PR-Inhalt. Behoben per `overrides` in `package.json` (PR #21,
gleiches Muster wie die bestehenden `tmp`/`uuid`-Einträge). Alle sechs
offenen PRs sind verarbeitet (gemergt, als Duplikat geschlossen oder nach
Rebase leer/no-op geschlossen); es gibt keine offenen PRs und kein offenes
Arbeitspaket mehr im Repository.
