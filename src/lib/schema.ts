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
    image: new URL(site.photo, site.url).toString(),
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
  /** ISO-8601 date/datetime, extracted from the talk content when known. */
  startDate?: string;
  /** ISO-8601 date/datetime, extracted from the talk content when known. */
  endDate?: string;
}

export function buildSpeakingEventSchema(talk: TalkLike, lang: Locale) {
  // Placeholder fallback (Jan 1 of the talk's year) for the rare talk whose
  // content doesn't reveal a concrete date — syntactically valid ISO-8601,
  // but not a real event date.
  const startDate = talk.startDate ?? `${talk.year}-01-01`;
  const endDate = talk.endDate ?? talk.startDate ?? `${talk.year}-01-01`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakingEvent',
    name: talk.title,
    description: talk.description,
    startDate,
    endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    // All talks so far are in-person events (conference venue / classroom course).
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
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
