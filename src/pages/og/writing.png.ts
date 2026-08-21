import { renderOgImage } from '../../lib/og-image';
import { de } from '../../i18n/de';

export async function GET() {
  const png = await renderOgImage({
    termPath: '~/writing',
    eyebrow: de.writing.eyebrow,
    title: de.writing.title,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
