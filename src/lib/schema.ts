import { site } from '../data/site';
import type { Locale } from '../i18n/utils';

export function buildPersonSchema(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    alternateName: site.handle,
    url: site.url,
    email: site.email,
    jobTitle: site.role,
    worksFor: {
      '@type': 'Organization',
      name: site.company,
    },
    image: site.photo,
    sameAs: site.socials.map((s) => s.url),
    knowsAbout: [
      'DevSecOps',
      'Platform Engineering',
      'Cloud',
      'CI/CD',
      'GitOps',
      'Infrastructure as Code',
      'AI in software development',
    ],
    inLanguage: lang,
  };
}

interface TalkLike {
  title: string;
  description: string;
  event: string;
  year: number;
  url?: string;
}

export function buildSpeakingEventSchema(talk: TalkLike, lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakingEvent',
    name: talk.title,
    description: talk.description,
    startDate: String(talk.year),
    location: {
      '@type': 'Place',
      name: talk.event,
    },
    performer: {
      '@type': 'Person',
      name: site.name,
    },
    url: talk.url ?? site.url,
    inLanguage: lang,
  };
}
