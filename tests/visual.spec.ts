import { expect, test } from '@playwright/test';
import { smokeRoutes, themeModes } from './site-routes';

// The matrix-portrait/backdrop canvases only animate without this — with it
// they skip straight to the static end state, which is what makes these
// screenshots deterministic at all.
test.use({ contextOptions: { reducedMotion: 'reduce' } });

// Baselines aren't committed from local/sandbox runs — Chromium rendering
// (font hinting, anti-aliasing) isn't guaranteed pixel-identical to the
// actual GitHub Actions runner, and a baseline generated anywhere else risks
// permanent false diffs. The `visual-regression` CI job (continue-on-error)
// writes missing baselines and uploads them as an artifact on its first run;
// download that and commit it to `tests/visual.spec.ts-snapshots/` to lock
// it in. To update deliberately after a redesign: run this job's workflow
// again (or `npm run test:visual -- --update-snapshots` in an environment
// that matches CI) and commit the new baseline the same way.
for (const path of smokeRoutes) {
  for (const theme of themeModes) {
    test(`visual: ${path} [${theme}]`, async ({ page }) => {
      await page.addInitScript((selectedTheme) => {
        if (selectedTheme === 'light') localStorage.setItem('dpn-theme', 'light');
        else localStorage.removeItem('dpn-theme');
      }, theme);

      await page.goto(path);
      await expect(page).toHaveScreenshot(`${path.replace(/\//g, '_')}${theme}.png`, {
        fullPage: true,
      });
    });
  }
}
