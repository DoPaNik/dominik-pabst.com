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
      'Workshops and talks on DevSecOps, Platform Engineering, and AI security – IT-Tage Frankfurt 2023 & 2025, heise Academy.',
    eyebrow: '// talks',
    title: 'Talks & workshops.',
    intro:
      'Workshops and talks on DevSecOps, Platform Engineering, and secure AI adoption in software development — at IT-Tage Frankfurt and heise Academy.',
    workshopLabel: 'workshop',
    talkLabel: 'talk',
    webinarLabel: 'webinar',
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
    updated: 'Updated August 21, 2026',
    noticeBanner:
      'This English version is for convenience only — the German version (based on the free Datenschutz-Generator.de by Dr. Thomas Schwenke) is the legally binding one.',
    sections: [
      {
        heading: 'Service provider',
        body: [
          'Dominik Pabst',
          'c/o flexdienst – #21920',
          'Kurt-Schumacher-Straße 76',
          '67663 Kaiserslautern',
          'Germany',
        ],
      },
      {
        heading: 'Contact',
        body: ['Email address: hi@dopanik.de'],
      },
      {
        heading: 'Liability and intellectual property notices',
        body: [
          'Links to third-party websites: The content of third-party websites that I link to directly or indirectly is outside my area of responsibility, and I do not adopt it as my own. I assume no responsibility for any content or damages arising from the use of information available on linked websites.',
          'Copyright and trademarks: All content presented on this website, such as text, photographs, graphics, brands, and trademarks, is protected by the respective intellectual property rights (copyright, trademark rights). Use, reproduction, etc. are subject to my rights or the rights of the respective authors or rights holders.',
          'Notice of legal violations: If you notice any legal violations on my website, please let me know. I will remove unlawful content and links as soon as I become aware of them.',
        ],
      },
    ],
  },
  privacy: {
    seoTitle: 'Privacy Policy – Dominik Pabst',
    seoDescription: 'Privacy policy for dopanik.de under Art. 13 GDPR.',
    eyebrow: '// privacy',
    title: 'Privacy policy.',
    updated: 'Updated August 21, 2026',
    noticeBanner:
      'This English version is for convenience only — the German version (based on the free template from e-recht24.de, extended with the hosting and analytics specifics below) is the legally binding one.',
    sections: [
      {
        heading: 'Controller',
        body: [
          'The party responsible for data processing on this website is:',
          'Dominik Pabst (address: see the imprint)',
          'Email: hi@dopanik.de',
        ],
      },
      {
        heading: 'Applicable legal bases',
        body: [
          'Where I obtain your consent for processing personal data, Art. 6(1)(a) GDPR serves as the legal basis. For data required to fulfil a contract or to carry out pre-contractual measures, Art. 6(1)(b) GDPR is the legal basis. Where processing is necessary to protect my legitimate interests or those of a third party, and your interests, fundamental rights, and freedoms do not override them, Art. 6(1)(f) GDPR serves as the legal basis. Which legal basis applies in a given case is stated alongside the relevant processing activity in this policy.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Access, rectification, and erasure: Under the applicable statutory provisions, you have the right at any time to free information about your personal data stored by me, its origin and recipients, and the purpose of its processing, and, where applicable, a right to rectification or erasure of this data.',
          'Right to restriction of processing: You have the right to request that processing of your personal data be restricted, for example while you contest the accuracy of the data or while an objection you have raised has not yet been finally assessed.',
          'Withdrawing your consent: Many data-processing operations are only possible with your express consent. You may withdraw consent already given at any time with effect for the future; the lawfulness of processing carried out until the withdrawal remains unaffected.',
          'Right to object: IF THE PROCESSING OF YOUR PERSONAL DATA IS BASED ON ART. 6(1)(E) OR (F) GDPR, YOU HAVE THE RIGHT AT ANY TIME, FOR REASONS ARISING FROM YOUR PARTICULAR SITUATION, TO OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA. IF YOU OBJECT, I WILL NO LONGER PROCESS YOUR PERSONAL DATA UNLESS I CAN DEMONSTRATE COMPELLING LEGITIMATE GROUNDS FOR THE PROCESSING THAT OVERRIDE YOUR INTERESTS, RIGHTS, AND FREEDOMS, OR THE PROCESSING SERVES THE ESTABLISHMENT, EXERCISE, OR DEFENCE OF LEGAL CLAIMS (OBJECTION UNDER ART. 21(1) GDPR).',
          'Right to data portability: You have the right to receive data that I process automatically on the basis of your consent or in performance of a contract in a common, machine-readable format, or to request its direct transfer to another controller, insofar as this is technically feasible.',
          'Right to lodge a complaint: You also have the right to lodge a complaint with the competent data protection supervisory authority, in particular in the member state of your habitual residence, place of work, or the place of the alleged infringement.',
        ],
      },
      {
        heading: 'Recipients of personal data',
        body: [
          'I only disclose personal data to third parties where this is necessary to fulfil a contract, where I am legally obligated to do so, or where I have a legitimate interest in the disclosure (Art. 6(1)(f) GDPR). Where service providers process personal data on my behalf (processors, e.g. hosting or analytics providers), corresponding data processing agreements are in place.',
        ],
      },
      {
        heading: 'Security measures',
        body: [
          'For security reasons and to protect the transmission of confidential content, in particular inquiries via the contact form, this website uses TLS encryption (HTTPS). You can recognise an encrypted connection by the fact that your browser\'s address bar changes from "http://" to "https://".',
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
        ],
      },
      {
        heading: 'General information on retention',
        body: [
          'Unless a more specific retention period is stated elsewhere in this policy, your personal data remains with me until the purpose for processing it no longer applies. If you make a legitimate request for erasure or withdraw your consent, your data will be deleted unless I have other legally permissible grounds for continued storage (e.g. statutory retention obligations under tax or commercial law) — in that case, the data is deleted once those grounds no longer apply.',
        ],
      },
      {
        heading: 'Contact form',
        body: [
          'If you use the contact form, I process the data you provide (name, email address, message) to handle your request and any follow-up questions. The form is processed via Netlify Forms. The legal basis is Art. 6(1)(b) GDPR where your inquiry relates to entering into a contract, otherwise my legitimate interest in handling your inquiry effectively (Art. 6(1)(f) GDPR). Your data remains with me until you request its deletion or the purpose for storing it no longer applies; statutory retention obligations remain unaffected.',
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
