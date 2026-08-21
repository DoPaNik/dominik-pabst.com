import { renderOgImage } from '../../../lib/og-image';
import { en } from '../../../i18n/en';

export async function GET() {
  const png = await renderOgImage({
    termPath: '~/en/talks',
    eyebrow: en.talks.eyebrow,
    title: en.talks.title,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
