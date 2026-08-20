import { writeFile, mkdir } from 'node:fs/promises';

/**
 * Fetches static (non-variable) JetBrains Mono TTFs for the build-time OG
 * image generator (src/lib/og-image.ts). Satori can't parse the variable
 * font Google Fonts serves (fvar table parsing fails), so this pulls the
 * static per-weight files JetBrains publishes directly instead — same
 * family, just not variable. Not run automatically (like fetch-portrait.mjs):
 * the result is committed, this only needs re-running if the weights change.
 */
const BASE =
  'https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-';
const OUTPUT_DIR = 'src/assets/fonts';
const WEIGHTS = [
  { file: 'Regular.ttf', out: 'jetbrains-mono-400.ttf' },
  { file: 'Bold.ttf', out: 'jetbrains-mono-700.ttf' },
  { file: 'ExtraBold.ttf', out: 'jetbrains-mono-800.ttf' },
];

await mkdir(OUTPUT_DIR, { recursive: true });

for (const { file, out } of WEIGHTS) {
  const res = await fetch(`${BASE}${file}`);
  if (!res.ok) throw new Error(`Fetch failed for ${file}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(`${OUTPUT_DIR}/${out}`, buf);
  console.log(`${OUTPUT_DIR}/${out} (${buf.length} bytes)`);
}
