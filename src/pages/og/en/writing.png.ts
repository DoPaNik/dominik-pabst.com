import { renderOgImage } from '../../../lib/og-image';
import { en } from '../../../i18n/en';

export async function GET() {
  const png = await renderOgImage({
    termPath: '~/en/writing',
    eyebrow: en.writing.eyebrow,
    title: en.writing.title,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
