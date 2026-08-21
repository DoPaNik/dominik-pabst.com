import { renderOgImage } from '../../lib/og-image';
import { de } from '../../i18n/de';

export async function GET() {
  const png = await renderOgImage({
    termPath: '~/talks',
    eyebrow: de.talks.eyebrow,
    title: de.talks.title,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
