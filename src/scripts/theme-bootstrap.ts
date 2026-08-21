/**
 * FOUC-prevention script. Must run synchronously, before first paint, as a
 * classic (non-module) script — Astro's processed <script> tags are always
 * emitted as deferred `type="module"`, which would flash the wrong theme.
 * Built separately via `npm run build:critical-scripts` (esbuild, IIFE) into
 * public/scripts/theme-bootstrap.js and loaded there with is:inline + src.
 * Edit this file, never the generated one.
 */
function applyStoredTheme() {
  try {
    const stored = localStorage.getItem('dpn-theme');
    if (stored === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
  } catch {
    // localStorage may be unavailable (e.g. private browsing) — keep the default theme.
  }
}

applyStoredTheme();
// ClientRouter swaps <html> attributes on navigation — re-apply the theme.
document.addEventListener('astro:after-swap', applyStoredTheme);
