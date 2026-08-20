import type { APIContext } from 'astro';
import { buildWritingFeed } from '../lib/rss';

export function GET(context: APIContext) {
  return buildWritingFeed('de', context.site!);
}
