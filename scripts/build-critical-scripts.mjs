// Builds the handful of scripts that must stay classic, synchronous <head>
// scripts (Astro's processed <script> tags are always deferred `type="module"`,
// which would reintroduce a theme-FOUC flash). Source of truth is TypeScript
// under src/scripts/; this emits the minified, browser-ready file that
// BaseLayout.astro loads via `<script is:inline src="...">`.
import { build } from 'esbuild';

const entries = [
  { in: 'src/scripts/theme-bootstrap.ts', out: 'public/scripts/theme-bootstrap.js' },
];

for (const entry of entries) {
  await build({
    entryPoints: [entry.in],
    outfile: entry.out,
    bundle: true,
    minify: true,
    format: 'iife',
    target: 'es2020',
    legalComments: 'none',
  });
}

console.log(`build-critical-scripts: wrote ${entries.length} file(s)`);
