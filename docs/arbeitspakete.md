# Arbeitspakete — dominik-pabst.com

> **Zweck:** Umsetzbare Aufgabenliste aus der Repository-Analyse (Architekturkarte,
> `debt_backlog.csv`, 30/60/90-Roadmap). Dieses Dokument ist die einzige Quelle
> für die Abarbeitung — es ersetzt die Roadmap-Prosa für operative Zwecke.
>
> **Baseline:** Branch `redesign-astro` @ `9a9941d`. Alle Datei-Referenzen und
> Ist-Zustände wurden gegen diesen Stand verifiziert.

## Hinweise zur Abarbeitung (für Mensch & LLM)

1. **Paket-Reihenfolge ist verbindlich:** Paket 1 → Paket 2 → Paket 3.
   Innerhalb eines Pakets gilt die angegebene Reihenfolge nur, wo eine
   Abhängigkeit (`Hängt ab von:`) es erzwingt — sonst ist sie frei.
2. **Eine Aufgabe = ein Commit/PR.** Conventional Commits
   (`fix:`, `feat:`, `test:`, `chore:`, `docs:`, `refactor:`).
3. **Abgrenzungen beachten:** Jede Aufgabe listet unter `Abgrenzung:` explizit,
   was sie *nicht* ändert. Das verhindert Überschneidungen — nicht "nebenbei
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

| Datei | Rolle |
|---|---|
| `src/layouts/BaseLayout.astro` | `<head>`: Meta, OG/Twitter, canonical/hreflang, JSON-LD, Theme-FOUC-Script |
| `src/data/site.ts` | Einzige Quelle für Name/Firma/Kontakt/Social-Links/Foto-Pfad |
| `src/i18n/de.ts`, `src/i18n/en.ts` | Alle User-Facing-Strings, typisiert über `src/i18n/types.ts` |
| `src/content.config.ts` | Zod-Schemata der Content Collections (`talks`, `writing`) |
| `src/lib/schema.ts` | JSON-LD-Generatoren (`Person`, `SpeakingEvent`) |
| `netlify.toml` | Build-Kommando, Security-Header inkl. CSP |
| `.github/workflows/ci.yml` | CI: Format → Lint → Typecheck → Build → `npm audit` |
| `CONTENT.md` | Deklarierte "authoritative reference" für Inhalts-Fakten |

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
- [ ] Nach dem Merge auf `master` erscheint Dependabot unter *Insights → Dependency graph → Dependabot* als aktiv
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
Nach der Code-Ablösung aus AP3-2 den Header in `netlify.toml` verschärfen:
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

## Bewusst nicht enthalten (aus der Roadmap übernommen)

- **Visuelle Regressionstests** — erst sinnvoll, wenn die Basis aus Paket 2/3 steht.
- **CSP-Report-Only-Monitoring** mit Reporting-Endpoint — bräuchte einen
  Report-Collector und damit Infrastruktur außerhalb des Backend-losen Setups.
