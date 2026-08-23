// Pre-commit guard: rejects binary/office/archive file types that don't
// belong in this repo (this exists because a PDF got committed by
// accident once). Runs across every staged file regardless of what
// lint-staged's own glob patterns match.
import { execFileSync } from 'node:child_process';
import { extname } from 'node:path';

const blockedExtensions = new Set([
  '.pdf',
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
  '.xls',
  '.xlsx',
  '.zip',
  '.tar',
  '.gz',
  '.rar',
  '.7z',
  '.dmg',
  '.key',
  '.pem',
]);

const stagedFiles = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACM'], {
  encoding: 'utf8',
})
  .split('\n')
  .filter(Boolean);

const blocked = stagedFiles.filter((file) => blockedExtensions.has(extname(file).toLowerCase()));

if (blocked.length > 0) {
  console.error('commit blocked: these file types do not belong in this repo:');
  for (const file of blocked) {
    console.error(`  ${file}`);
  }
  console.error(
    '\nIf this is genuinely needed, ask before adding an exception in scripts/check-staged-file-types.mjs.',
  );
  process.exit(1);
}
