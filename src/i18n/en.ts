import type { Dictionary } from './types';

export const en: Dictionary = {
  common: {
    skipToContent: 'skip to content',
    nav: {
      about: 'about',
      talks: 'talks',
      writing: 'writing',
      contact: 'contact',
    },
    hireMe: 'work with me',
    themeToggle: 'toggle theme',
    langSwitch: 'switch language',
    footerTagline: '// versioned with care',
    footerLegal: {
      imprint: 'imprint',
      privacy: 'privacy',
    },
    portraitAlt: 'Portrait of Dominik Pabst',
    socialCardAlt: 'Social card of Dominik Pabst',
  },
  home: {
    seoTitle: 'Dominik Pabst – DevSecOps & Platform Engineering | CGI',
    seoDescription:
      'Executive Consultant for DevSecOps, Platform Engineering, and Cloud at CGI Germany. Speaker at IT-Tage Frankfurt. Trainer at heise Academy.',
    eyebrow: 'dominik@dopanik:~$ whoami',
    headingLine1: "I'm",
    headingLine2: 'Dominik Pabst.',
    rolePrefix: '$ role=',
    roles: ['DevSecOps', 'Platform Engineering', 'Cloud', 'AI Engineering'],
    intro:
      'I help development teams bake security, platforms and AI into their software supply chain properly — as an Executive Consultant at CGI Germany, as a speaker, and as a trainer.',
    ctaPrimary: 'view talks',
    ctaSecondary: 'work with me',
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
      gateState: 'approved',
    },
  },
  about: {
    seoTitle: 'About – Dominik Pabst | DevSecOps Consultant & Speaker',
    seoDescription:
      'About Dominik Pabst: Executive Consultant at CGI Germany, speaker at IT-Tage Frankfurt, trainer at heise Academy for DevSecOps and AI.',
    eyebrow: '// about',
    title: 'Security, platforms, AI — brought together properly.',
    bio: "I'm an Executive Consultant for DevOps & Platform Engineering at CGI Germany — formerly Novatec Consulting, acquired by CGI in June 2025. For over a decade, I've helped development teams bake security, automation, and platform thinking into their software supply chain from day one, rather than bolting it on at the end. As a recurring speaker at IT-Tage Frankfurt and trainer at heise Academy, I share that knowledge — most recently in a joint course with Andreas Falk on DevSecOps and AI.",
    collabLine: '# > DevSecOps is a culture shift — not a toolchain decision.',
    stackEyebrow: '// focus',
    stackTitle: 'What I speak, write, and consult about.',
    stackTerminalLine: 'dominik@dopanik:~$ cat ~/.focus',
    focusAreas: [
      'DevSecOps',
      'Platform Engineering',
      'Cloud',
      'CI/CD',
      'GitOps',
      'Infrastructure as Code',
      'AI in software development',
    ],
  },
  talks: {
    seoTitle: 'Talks & Workshops – Dominik Pabst | DevSecOps Speaker',
    seoDescription:
      'Workshops and talks on DevSecOps, Platform Engineering, and AI security – IT-Tage Frankfurt 2023, 2025 & 2026, heise Academy.',
    eyebrow: '// talks',
    title: 'Talks & workshops.',
    intro:
      'Workshops and talks on DevSecOps, Platform Engineering, and secure AI adoption in software development — at IT-Tage Frankfurt and heise Academy.',
    workshopLabel: 'workshop',
    talkLabel: 'talk',
  },
  writing: {
    seoTitle: 'Articles & Posts – Dominik Pabst | DevSecOps & DevOps',
    seoDescription:
      'Technical articles on DevOps, DevSecOps, CI/CD, and Infrastructure as Code by Dominik Pabst. Plus practical notes on AI in knowledge work and practice.',
    eyebrow: '// writing',
    title: 'Articles & posts.',
    intro:
      'Technical articles on DevOps, CI/CD, security, and Infrastructure as Code — plus thoughts on AI in knowledge work.',
    readMore: 'read more →',
  },
  contact: {
    seoTitle: 'Contact – Dominik Pabst | DevSecOps Consulting & Training',
    seoDescription:
      'Get in touch for DevSecOps consulting, training, and speaking on platform engineering, cloud, and AI in modern software projects, delivery, and teams.',
    eyebrow: '// contact',
    title: "Let's talk.",
    intro:
      'Open to consulting, training, and speaking inquiries around DevSecOps, Platform Engineering, and cloud infrastructure.',
    formNameLabel: 'Name',
    formNamePlaceholder: 'Ada Lovelace',
    formEmailLabel: 'Email',
    formEmailPlaceholder: 'ada@example.com',
    formMessageLabel: 'Message',
    formMessagePlaceholder: 'Tell me about your project …',
    submitLabel: 'send message',
    successTitle: '✔ message sent.',
    successBody: "# exit 0 — I'll get back to you shortly.",
    successCta: 'back to homepage',
    basedIn: 'Based in Germany 🇩🇪 — open to consulting, training, and speaking.',
    socialsIntro: 'or connect directly:',
  },
  legal: {
    seoTitle: 'Imprint – Dominik Pabst',
    seoDescription:
      'Imprint and provider identification for dopanik.de under German law (§ 5 DDG).',
    eyebrow: '// imprint',
    title: 'Imprint.',
    updated: 'Draft as of August 20, 2026',
    noticeBanner:
      '⚠ Draft: this page has been technically prepared but not yet legally reviewed, and still contains placeholders. This English version is for convenience only — the German version is the legally binding one. Before publishing: have the text produced by a generator (e.g. e-recht24.de, Datenschutz-Generator.de) or reviewed by a lawyer, and replace every [PLACEHOLDER] with real information.',
    sections: [
      {
        heading: 'Service provider',
        body: [
          'Dominik Pabst',
          '[PLACEHOLDER: address where service of legal documents is possible — street, number, postal code, city. This does not have to be a home address: a business/office address (e.g. a coworking space or virtual business address) is acceptable as long as mail is actually received and the person can be reached there — German courts have held that a plain PO box is not sufficient.]',
          'Email: hi@dopanik.de',
        ],
      },
      {
        heading: 'Responsible for editorial content',
        body: [
          'Responsible for the content under § 18(2) MStV (German Interstate Media Treaty): Dominik Pabst (address as above).',
        ],
      },
      {
        heading: 'EU dispute resolution',
        body: [
          'The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/. I am neither willing nor obligated to participate in dispute resolution proceedings before a consumer arbitration board.',
        ],
      },
      {
        heading: 'Liability for content',
        body: [
          "As a service provider, I am responsible for my own content on these pages under general law. Liability privileges under the Digitale-Dienste-Gesetz (DDG, Germany's Digital Services Act implementation) and the EU Digital Services Act (DSA) apply to third-party information that is merely transmitted or cached; under these, no general obligation exists to monitor transmitted or stored third-party information.",
        ],
      },
      {
        heading: 'Liability for links',
        body: [
          'This website links to external third-party content (e.g. dev.to, LinkedIn) whose design I have no influence over. No liability is therefore assumed for this external content; the respective provider is always responsible for the content of linked pages.',
        ],
      },
      {
        heading: 'Copyright',
        body: [
          'The content and works created by the site operator on these pages are subject to German copyright law.',
        ],
      },
    ],
  },
  privacy: {
    seoTitle: 'Privacy Policy – Dominik Pabst',
    seoDescription: 'Privacy policy for dopanik.de under Art. 13 GDPR.',
    eyebrow: '// privacy',
    title: 'Privacy policy.',
    updated: 'Draft as of August 20, 2026',
    noticeBanner:
      '⚠ Draft: this page has been technically prepared but not yet legally reviewed, and still contains placeholders. This English version is for convenience only — the German version is the legally binding one. Before publishing: have the text produced by a generator (e.g. e-recht24.de, Datenschutz-Generator.de) or reviewed by a lawyer, and replace every [PLACEHOLDER] with real information.',
    sections: [
      {
        heading: 'Controller',
        body: [
          'The party responsible for data processing on this website is:',
          'Dominik Pabst',
          '[PLACEHOLDER: address as stated in the imprint]',
          'Email: hi@dopanik.de',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You have the right to free information about your stored personal data, its origin and recipients, and the purpose of its processing, as well as a right to rectification, restriction, or deletion of this data. You also have a right to data portability and a right to lodge a complaint with the competent supervisory authority.',
        ],
      },
      {
        heading: 'Hosting',
        body: [
          'This website is hosted with Netlify, Inc. (San Francisco, USA). Personal data (in particular server log files) may therefore be transferred to the US. According to its Data Processing Agreement, Netlify bases this transfer on the EU-US Data Privacy Framework (and its UK Extension) and, where that does not apply, on the standard contractual clauses published by the European Commission. More information: https://www.netlify.com/gdpr-ccpa/ and https://www.netlify.com/legal/subprocessors/',
        ],
      },
      {
        heading: 'Server log files',
        body: [
          'When you visit this website, the hosting provider automatically collects technical access data (e.g. IP address, date and time of access, page requested, browser used). This data is used for the technical delivery and security of the website, is not combined with other data sources, and is kept only as long as necessary for that purpose.',
          '[PLACEHOLDER: if a specific retention period is configured in the Netlify dashboard, replace this with the exact period.]',
        ],
      },
      {
        heading: 'Contact form',
        body: [
          'If you use the contact form, the data you provide (name, email address, message) is processed to handle your request. The legal basis is Art. 6(1)(b) GDPR (steps to enter into a contract). The form is processed via Netlify Forms and kept for as long as needed to handle your request and to meet any applicable statutory retention obligations.',
          '[PLACEHOLDER: if a specific retention period is configured in the Netlify dashboard, replace this with the exact period.]',
        ],
      },
      {
        heading: 'Web analytics with Plausible Analytics',
        body: [
          'This website uses Plausible Analytics, a privacy-friendly analytics service by Plausible Insights OÜ (Tartu, Estonia). Plausible uses no cookies and stores no personal data or cross-device identifiers; it collects only aggregated, anonymous usage statistics (e.g. page views, referrers, coarse device/browser category). No data can be attributed to individual persons. The legal basis is the legitimate interest in reach-based analysis and improvement of the website (Art. 6(1)(f) GDPR). More information: https://plausible.io/data-policy',
        ],
      },
      {
        heading: 'Cookies & local storage',
        body: [
          'This website sets no tracking or marketing cookies. Your choice of light or dark color scheme is stored, for technical necessity, in your browser\'s local storage (key "dpn-theme") and never leaves your device.',
        ],
      },
      {
        heading: 'Changes to this privacy policy',
        body: [
          'This privacy policy will be updated as needed, for example when the website or legal requirements change. The version currently published on this page always applies.',
        ],
      },
    ],
  },
};
