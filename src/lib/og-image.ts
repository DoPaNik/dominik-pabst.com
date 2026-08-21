import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Mirrors src/styles/tokens/colors.css (dark theme — OG images always render
// dark regardless of the viewer's preference) and TerminalWindow.astro's
// traffic-light colors. Satori can't read CSS custom properties, so these
// are the resolved hex values; keep in sync if the palette changes.
const COLORS = {
  bg: '#0b0e14', // --bg / --ink-950
  border: '#2a323f', // --border / --ink-600
  textStrong: '#e8ecf1', // --text-strong / --ink-050
  textMuted: '#a7b2bf', // --text-muted / --ink-200
  brand: '#37d67a', // --brand / --green-500
  brandStrong: '#5fe39b', // --brand-strong / --green-400
  danger: '#f2545b',
  warning: '#f2b544',
} as const;

const WIDTH = 1200;
const HEIGHT = 630;

let fontsPromise: Promise<{ name: string; data: Buffer; weight: 400 | 700 | 800 }[]> | null = null;

// import.meta.url isn't reliable here: Astro/Vite relocates this module into
// dist/.prerender/chunks/ at build time, which breaks any path resolved
// relative to the module's own location. `astro build` always runs from the
// project root, so process.cwd() is the stable anchor instead.
const FONTS_DIR = join(process.cwd(), 'src/assets/fonts');

function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(join(FONTS_DIR, 'jetbrains-mono-400.ttf')),
    readFile(join(FONTS_DIR, 'jetbrains-mono-700.ttf')),
    readFile(join(FONTS_DIR, 'jetbrains-mono-800.ttf')),
  ]).then(([regular, bold, extrabold]) => [
    { name: 'JetBrains Mono', data: regular, weight: 400 as const },
    { name: 'JetBrains Mono', data: bold, weight: 700 as const },
    { name: 'JetBrains Mono', data: extrabold, weight: 800 as const },
  ]);
  return fontsPromise;
}

function dot(color: string) {
  return {
    type: 'div',
    props: {
      style: { width: '12px', height: '12px', borderRadius: '999px', background: color },
    },
  };
}

interface OgImageOptions {
  /** Terminal title-bar path, e.g. "~/talks". */
  termPath: string;
  eyebrow: string;
  title: string;
}

/** Renders a 1200×630 OG-card PNG at build time. No runtime/serverless cost — called once per static route from a `.png.ts` endpoint's GET(). */
export async function renderOgImage({ termPath, eyebrow, title }: OgImageOptions): Promise<Buffer> {
  const fonts = await loadFonts();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          display: 'flex',
          flexDirection: 'column',
          background: COLORS.bg,
          border: `1px solid ${COLORS.border}`,
          fontFamily: 'JetBrains Mono',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '28px 56px',
                borderBottom: `1px solid ${COLORS.border}`,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', gap: '8px' },
                    children: [dot(COLORS.danger), dot(COLORS.warning), dot(COLORS.brand)],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { color: COLORS.textMuted, fontSize: '20px', marginLeft: '16px' },
                    children: `${termPath} — dopanik.de`,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                padding: '56px',
                justifyContent: 'center',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '28px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { width: '18px', height: '2px', background: COLORS.brand },
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            color: COLORS.brand,
                            fontSize: '24px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                          },
                          children: eyebrow,
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      color: COLORS.textStrong,
                      fontSize: '64px',
                      fontWeight: 800,
                      lineHeight: 1.15,
                      maxWidth: '980px',
                    },
                    children: title,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', padding: '0 56px 44px' },
              children: {
                type: 'div',
                props: {
                  style: { display: 'flex', fontSize: '22px', fontWeight: 800 },
                  children: [
                    {
                      type: 'span',
                      props: { style: { color: COLORS.textStrong }, children: 'Do' },
                    },
                    {
                      type: 'span',
                      props: { style: { color: COLORS.brandStrong }, children: 'Pa' },
                    },
                    {
                      type: 'span',
                      props: { style: { color: COLORS.textStrong }, children: 'Nik' },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
    { width: WIDTH, height: HEIGHT, fonts },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } });
  return Buffer.from(resvg.render().asPng());
}
