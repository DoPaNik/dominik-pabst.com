import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getDictionary } from '../i18n/utils';
import type { Locale } from '../i18n/utils';

export async function buildWritingFeed(lang: Locale, site: URL) {
  const t = getDictionary(lang);

  const entries = (
    await getCollection(
      'writing',
      ({ data }) => data.lang === lang && !data.placeholder && Boolean(data.url),
    )
  ).sort((a, b) => {
    if (!a.data.date) return 1;
    if (!b.data.date) return -1;
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return rss({
    title: t.writing.seoTitle,
    description: t.writing.seoDescription,
    site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      link: entry.data.url as string,
      pubDate: entry.data.date ? new Date(entry.data.date) : undefined,
    })),
  });
}
