// Regenerates the static OG/Twitter-card image at public/og/dopanik.png.
// Run with: node scripts/generate-og-image.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0B0E14" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" />

  <circle cx="80" cy="78" r="7" fill="#F2545B" />
  <circle cx="106" cy="78" r="7" fill="#F2B544" />
  <circle cx="132" cy="78" r="7" fill="#37D67A" />

  <text x="80" y="280" font-family="monospace" font-size="84" font-weight="700" letter-spacing="-2">
    <tspan fill="#E8ECF1">Do</tspan><tspan fill="#37D67A">Pa</tspan><tspan fill="#E8ECF1">Nik</tspan>
  </text>

  <text x="80" y="340" font-family="monospace" font-size="30" fill="#A7B2BF">
    dominik@dopanik:~$ whoami
  </text>
  <text x="80" y="390" font-family="monospace" font-size="30" fill="#CFD6DE">
    Dominik Pabst — DevOps &amp; Platform Engineering
  </text>

  <rect x="80" y="440" width="56" height="3" fill="#37D67A" />
  <text x="80" y="480" font-family="monospace" font-size="22" fill="#7C8896">
    DevSecOps · Platform Engineering · Cloud · KI
  </text>

  <text x="80" y="560" font-family="monospace" font-size="20" fill="#586575">
    dopanik.de
  </text>
</svg>
`;

const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(new URL('../public/og/dopanik.png', import.meta.url), buffer);
console.log('Wrote public/og/dopanik.png');
