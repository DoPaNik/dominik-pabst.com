// Netlify serves the single static dist/_headers file for every route, so a
// hand-written CSP can't list per-page hashes for the JSON-LD <script> blocks
// BaseLayout.astro renders inline (their content — and thus their required
// CSP hash — differs per page). This scans the built HTML after `astro
// build`, hashes every inline (non-`src`) <script> body it finds, and adds
// those hashes to the script-src directive so the browser's CSP actually
// allows them instead of silently dropping the structured data.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const distDir = 'dist';
const headersPath = join(distDir, '_headers');

function collectHtmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectHtmlFiles(full));
    else if (extname(entry.name) === '.html') files.push(full);
  }
  return files;
}

const inlineScriptPattern = /<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi;
const hashes = new Set();

for (const file of collectHtmlFiles(distDir)) {
  const html = readFileSync(file, 'utf8');
  for (const [, content] of html.matchAll(inlineScriptPattern)) {
    if (!content.trim()) continue;
    const hash = createHash('sha256').update(content, 'utf8').digest('base64');
    hashes.add(`'sha256-${hash}'`);
  }
}

if (hashes.size > 0) {
  const headers = readFileSync(headersPath, 'utf8');
  const updated = headers.replace(
    /(script-src[^;\n]*)/,
    (match) => `${match} ${[...hashes].join(' ')}`,
  );
  writeFileSync(headersPath, updated);
}

console.log(`inject-csp-hashes: added ${hashes.size} inline-script hash(es) to dist/_headers`);
