import { site } from '../data/site';
import { getDictionary } from '../i18n/utils';
import type { Locale } from '../i18n/utils';

export function buildPersonSchema(lang: Locale) {
  const t = getDictionary(lang);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    alternateName: site.handle,
    url: site.url,
    email: site.email,
    description: t.about.bio,
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
  /** True when the event is delivered online rather than in person. */
  online?: boolean;
  url?: string;
  /** ISO-8601 date/datetime, extracted from the talk content when known. */
  startDate?: string;
  /** ISO-8601 date/datetime, extracted from the talk content when known. */
  endDate?: string;
}

export function buildSpeakingEventSchema(talk: TalkLike, lang: Locale) {
  const dates =
    talk.startDate || talk.endDate
      ? {
          startDate: talk.startDate ?? talk.endDate,
          endDate: talk.endDate ?? talk.startDate,
        }
      : {};

  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakingEvent',
    name: talk.title,
    description: talk.description,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: talk.online
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
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
    ...dates,
  };
}
