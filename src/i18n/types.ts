interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageDictionary {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  updated: string;
  noticeBanner: string;
  sections: LegalSection[];
}

export interface Dictionary {
  common: {
    skipToContent: string;
    nav: {
      about: string;
      talks: string;
      writing: string;
      contact: string;
    };
    hireMe: string;
    themeToggle: string;
    langSwitch: string;
    footerTagline: string;
    footerLegal: {
      imprint: string;
      privacy: string;
    };
    portraitAlt: string;
    socialCardAlt: string;
  };
  home: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    rolePrefix: string;
    roles: string[];
    intro: string;
    ctaPrimary: string;
    ctaSecondary: string;
    pipeline: {
      title: string;
      command: string;
      steps: { label: string; meta: string }[];
      gateLabel: string;
      gateState: string;
    };
  };
  about: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    title: string;
    bio: string;
    collabLine: string;
    stackEyebrow: string;
    stackTitle: string;
    stackTerminalLine: string;
    focusAreas: string[];
  };
  talks: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    workshopLabel: string;
    talkLabel: string;
    webinarLabel: string;
  };
  writing: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    readMore: string;
  };
  contact: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    formNameLabel: string;
    formNamePlaceholder: string;
    formEmailLabel: string;
    formEmailPlaceholder: string;
    formMessageLabel: string;
    formMessagePlaceholder: string;
    submitLabel: string;
    successTitle: string;
    successBody: string;
    successCta: string;
    basedIn: string;
    socialsIntro: string;
  };
  legal: LegalPageDictionary;
  privacy: LegalPageDictionary;
}
