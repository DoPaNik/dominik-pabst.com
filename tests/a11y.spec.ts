import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { smokeRoutes, themeModes } from './site-routes';

for (const path of smokeRoutes) {
  for (const theme of themeModes) {
    test(`a11y: ${path} [${theme}]`, async ({ page }) => {
      await page.addInitScript((selectedTheme) => {
        if (selectedTheme === 'light') localStorage.setItem('dpn-theme', 'light');
        else localStorage.removeItem('dpn-theme');
      }, theme);

      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      const blockingViolations = results.violations.filter((violation) =>
        ['serious', 'critical'].includes(violation.impact ?? ''),
      );

      test.info().attach('axe-report', {
        body: JSON.stringify(results, null, 2),
        contentType: 'application/json',
      });

      expect(blockingViolations, JSON.stringify(blockingViolations, null, 2)).toHaveLength(0);
    });
  }
}
