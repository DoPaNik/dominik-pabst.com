import type { Dictionary } from './types';

export const de: Dictionary = {
  common: {
    skipToContent: 'zum Inhalt springen',
    nav: {
      about: 'über mich',
      talks: 'talks',
      writing: 'schreiben',
      contact: 'kontakt',
    },
    hireMe: 'projekt anfragen',
    themeToggle: 'Theme umschalten',
    langSwitch: 'sprache wechseln',
    footerTagline: '// versioniert mit sorgfalt',
    footerLegal: {
      imprint: 'impressum',
      privacy: 'datenschutz',
    },
    portraitAlt: 'Porträt von Dominik Pabst',
    socialCardAlt: 'Social-Card von Dominik Pabst',
  },
  home: {
    seoTitle: 'Dominik Pabst – DevSecOps & Platform Engineering | CGI',
    seoDescription:
      'Executive Consultant für DevSecOps, Platform Engineering und Cloud bei CGI Deutschland. Speaker auf den IT-Tagen Frankfurt. Trainer bei der heise Academy.',
    eyebrow: 'dominik@dopanik:~$ whoami',
    headingLine1: 'Ich bin',
    headingLine2: 'Dominik Pabst.',
    rolePrefix: '$ rolle=',
    roles: ['DevSecOps', 'Platform Engineering', 'Cloud', 'AI Engineering'],
    intro:
      'Ich helfe Entwicklungsteams, Sicherheit, Plattformen und KI sinnvoll in ihre Software-Lieferkette einzubauen — als Executive Consultant bei CGI Deutschland, als Speaker und als Trainer.',
    ctaPrimary: 'talks ansehen',
    ctaSecondary: 'projekt anfragen',
    pipeline: {
      title: '~/pipeline — deploy.yml',
      command: 'gh workflow run deploy.yml --ref main',
      steps: [
        { label: 'build', meta: '2.1s' },
        { label: 'unit-tests', meta: '128 passed' },
        { label: 'sast · semgrep', meta: '0 findings' },
        { label: 'sca · trivy', meta: '0 critical' },
        { label: 'sign · cosign', meta: 'verified' },
        { label: 'policy · opa gate', meta: 'passed' },
      ],
      gateLabel: 'deploy → production',
      gateState: 'freigegeben',
    },
  },
  about: {
    seoTitle: 'Über mich – Dominik Pabst | DevSecOps Consultant & Speaker',
    seoDescription:
      'Über Dominik Pabst: Executive Consultant bei CGI Deutschland, Speaker auf den IT-Tagen Frankfurt, Trainer bei heise Academy für DevSecOps und KI.',
    eyebrow: '// über mich',
    title: 'Sicherheit, Plattformen, KI — sauber zusammengeführt.',
    bio: 'Ich bin Executive Consultant für DevOps & Platform Engineering bei CGI Deutschland — vormals Novatec Consulting, im Juni 2025 von CGI übernommen. Seit über einem Jahrzehnt helfe ich Entwicklungsteams dabei, Sicherheit, Automatisierung und Plattformdenken von Anfang an in ihre Software-Lieferkette zu integrieren, statt am Ende nachzurüsten. Als regelmäßiger Speaker auf den IT-Tagen Frankfurt und Trainer bei der heise Academy gebe ich dieses Wissen weiter — zuletzt in einem gemeinsamen Kurs mit Andreas Falk über DevSecOps und KI.',
    collabLine: '# > DevSecOps ist eine Kulturveränderung — keine Toolchain-Entscheidung.',
    stackEyebrow: '// fokus',
    stackTitle: 'Worüber ich spreche, schreibe und berate.',
    stackTerminalLine: 'dominik@dopanik:~$ cat ~/.fokus',
    focusAreas: [
      'DevSecOps',
      'Platform Engineering',
      'Cloud',
      'CI/CD',
      'GitOps',
      'Infrastructure as Code',
      'KI in der Softwareentwicklung',
    ],
  },
  talks: {
    seoTitle: 'Vorträge & Workshops – Dominik Pabst | DevSecOps Speaker',
    seoDescription:
      'Workshops und Vorträge zu DevSecOps, Platform Engineering und KI-Sicherheit – IT-Tage Frankfurt 2023, 2025 & 2026, heise Academy.',
    eyebrow: '// talks',
    title: 'Vorträge & Workshops.',
    intro:
      'Workshops und Vorträge zu DevSecOps, Platform Engineering und dem sicheren Einsatz von KI in der Softwareentwicklung — auf den IT-Tagen Frankfurt und der heise Academy.',
    workshopLabel: 'workshop',
    talkLabel: 'vortrag',
  },
  writing: {
    seoTitle: 'Artikel & Beiträge – Dominik Pabst | DevSecOps & DevOps',
    seoDescription:
      'Technische Artikel zu DevOps, DevSecOps, CI/CD und Infrastructure as Code von Dominik Pabst. Dazu Einordnungen zu KI in der Wissensarbeit und Praxis.',
    eyebrow: '// schreiben',
    title: 'Artikel & Beiträge.',
    intro:
      'Technische Artikel zu DevOps, CI/CD, Security und Infrastructure as Code — sowie Gedanken zu KI in der Wissensarbeit.',
    readMore: 'weiterlesen →',
  },
  contact: {
    seoTitle: 'Kontakt – Dominik Pabst | DevSecOps Consulting & Training',
    seoDescription:
      'Jetzt Kontakt aufnehmen für DevSecOps Consulting, Trainings und Speaking rund um Platform Engineering, Cloud und KI in modernen Softwareprojekten.',
    eyebrow: '// kontakt',
    title: 'Lassen Sie uns sprechen.',
    intro:
      'Offen für Consulting-, Trainings- und Speaking-Anfragen rund um DevSecOps, Platform Engineering und Cloud-Infrastruktur.',
    formNameLabel: 'Name',
    formNamePlaceholder: 'Ada Lovelace',
    formEmailLabel: 'E-Mail',
    formEmailPlaceholder: 'ada@example.com',
    formMessageLabel: 'Nachricht',
    formMessagePlaceholder: 'Erzählen Sie mir von Ihrem Projekt …',
    submitLabel: 'nachricht senden',
    successTitle: '✔ Nachricht gesendet.',
    successBody: '# exit 0 — ich melde mich in Kürze zurück.',
    successCta: 'zurück zur startseite',
    basedIn: 'Basiert in Deutschland 🇩🇪 — offen für Consulting, Trainings und Speaking.',
    socialsIntro: 'oder direkt vernetzen:',
  },
  legal: {
    seoTitle: 'Impressum – Dominik Pabst',
    seoDescription: 'Impressum und Anbieterkennzeichnung gemäß § 5 DDG für dopanik.de.',
    eyebrow: '// impressum',
    title: 'Impressum.',
    updated: 'Aktualisiert am 21. August 2026',
    noticeBanner:
      'Diese Seite basiert auf dem kostenlosen Datenschutz-Generator.de von Dr. Thomas Schwenke, ergänzt um Angaben zu Hosting (Netlify) und Webanalyse (Plausible).',
    sections: [
      {
        heading: 'Diensteanbieter',
        body: [
          'Dominik Pabst',
          'c/o flexdienst – #21920',
          'Kurt-Schumacher-Straße 76',
          '67663 Kaiserslautern',
          'Deutschland',
        ],
      },
      {
        heading: 'Kontaktmöglichkeiten',
        body: ['E-Mail-Adresse: hi@dopanik.de'],
      },
      {
        heading: 'Haftungs- und Schutzrechtshinweise',
        body: [
          'Links auf fremde Webseiten: Die Inhalte fremder Webseiten, auf die ich direkt oder indirekt verweise, liegen außerhalb meines Verantwortungsbereiches und ich mache sie mir nicht zu Eigen. Für alle Inhalte und Nachteile, die aus der Nutzung der in den verlinkten Webseiten aufrufbaren Informationen entstehen, übernehme ich keine Verantwortung.',
          'Urheberrechte und Markenrechte: Alle auf dieser Website dargestellten Inhalte, wie Texte, Fotografien, Grafiken, Marken und Warenzeichen sind durch die jeweiligen Schutzrechte (Urheberrechte, Markenrechte) geschützt. Die Verwendung, Vervielfältigung usw. unterliegen meinen Rechten oder den Rechten der jeweiligen Urheber bzw. Rechteinhaber.',
          'Hinweise auf Rechtsverstöße: Sollten Sie innerhalb meines Internetauftritts Rechtsverstöße bemerken, bitte ich Sie, mich darauf hinzuweisen. Ich werde rechtswidrige Inhalte und Links nach Kenntnisnahme unverzüglich entfernen.',
        ],
      },
    ],
  },
  privacy: {
    seoTitle: 'Datenschutzerklärung – Dominik Pabst',
    seoDescription: 'Datenschutzerklärung gemäß Art. 13 DSGVO für dopanik.de.',
    eyebrow: '// datenschutz',
    title: 'Datenschutzerklärung.',
    updated: 'Entwurf vom 20. August 2026',
    noticeBanner:
      '⚠ Entwurf: Diese Seite wurde technisch vorbereitet, ist aber inhaltlich noch nicht rechtlich geprüft und enthält Platzhalter. Vor Veröffentlichung: Text über einen Generator (z. B. e-recht24.de, Datenschutz-Generator.de) erstellen lassen oder anwaltlich prüfen und alle [PLATZHALTER] durch echte Angaben ersetzen.',
    sections: [
      {
        heading: 'Verantwortlicher',
        body: [
          'Verantwortlich für die Datenverarbeitung auf dieser Website ist:',
          'Dominik Pabst',
          '[PLATZHALTER: Anschrift wie im Impressum]',
          'E-Mail: hi@dopanik.de',
        ],
      },
      {
        heading: 'Ihre Rechte',
        body: [
          'Sie haben das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung, sowie ein Recht auf Berichtigung, Einschränkung oder Löschung dieser Daten. Zudem steht Ihnen ein Recht auf Datenübertragbarkeit sowie ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.',
        ],
      },
      {
        heading: 'Hosting',
        body: [
          'Diese Website wird bei Netlify, Inc. (San Francisco, USA) gehostet. Dabei können personenbezogene Daten (insbesondere Server-Logfiles) in die USA übermittelt werden. Netlify stützt diese Übermittlung laut eigener Data Processing Agreement auf das EU-US Data Privacy Framework (bzw. dessen UK-Erweiterung) sowie, wo dieses nicht greift, auf die von der Europäischen Kommission veröffentlichten Standardvertragsklauseln. Weitere Informationen: https://www.netlify.com/gdpr-ccpa/ und https://www.netlify.com/legal/subprocessors/',
        ],
      },
      {
        heading: 'Server-Logfiles',
        body: [
          'Beim Aufruf dieser Website erfasst der Hosting-Anbieter automatisch technische Zugriffsdaten (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, verwendeter Browser). Diese Daten dienen der technischen Bereitstellung und Absicherung der Website und werden nicht mit anderen Datenquellen zusammengeführt. Sie werden nur so lange gespeichert, wie es für diesen Zweck erforderlich ist.',
          '[PLATZHALTER: falls im Netlify-Dashboard eine abweichende, konkrete Aufbewahrungsfrist eingestellt ist, hier durch die genaue Frist ersetzen.]',
        ],
      },
      {
        heading: 'Kontaktformular',
        body: [
          'Wenn Sie das Kontaktformular nutzen, werden die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung Ihrer Anfrage verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anfrage zur Anbahnung eines Vertrags). Das Formular wird über Netlify Forms verarbeitet und so lange gespeichert, wie es zur Bearbeitung Ihrer Anfrage und zur Erfüllung etwaiger gesetzlicher Aufbewahrungspflichten erforderlich ist.',
          '[PLATZHALTER: falls im Netlify-Dashboard eine abweichende, konkrete Aufbewahrungsfrist eingestellt ist, hier durch die genaue Frist ersetzen.]',
        ],
      },
      {
        heading: 'Webanalyse mit Plausible Analytics',
        body: [
          'Diese Website nutzt Plausible Analytics, einen datenschutzfreundlichen Webanalysedienst der Plausible Insights OÜ (Tartu, Estland). Plausible verzichtet vollständig auf Cookies und auf jegliche Speicherung personenbezogener Daten oder geräteübergreifender Kennungen; erfasst werden ausschließlich aggregierte, anonyme Nutzungsstatistiken (z. B. Seitenaufrufe, Referrer, grobe Geräte- und Browserkategorie). Eine Zuordnung zu einzelnen Personen ist nicht möglich. Rechtsgrundlage ist das berechtigte Interesse an der reichweitenbasierten Analyse und Verbesserung des Webangebots (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen: https://plausible.io/data-policy',
        ],
      },
      {
        heading: 'Cookies & lokale Speicherung',
        body: [
          'Diese Website setzt keine Tracking- oder Marketing-Cookies. Ihre Auswahl des hellen oder dunklen Farbschemas wird technisch notwendig im Local Storage Ihres Browsers gespeichert (Schlüssel „dpn-theme“) und verlässt Ihr Gerät nicht.',
        ],
      },
      {
        heading: 'Änderungen dieser Datenschutzerklärung',
        body: [
          'Diese Datenschutzerklärung wird bei Bedarf angepasst, etwa bei Änderungen der Website oder der rechtlichen Vorgaben. Es gilt jeweils die aktuell auf dieser Seite veröffentlichte Fassung.',
        ],
      },
    ],
  },
};
