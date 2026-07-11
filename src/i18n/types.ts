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
    statusUptime: string;
    statusDeployPrefix: string;
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
}
