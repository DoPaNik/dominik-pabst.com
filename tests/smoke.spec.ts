import { expect, test } from '@playwright/test';
import { smokeRoutes } from './site-routes';

for (const path of smokeRoutes) {
  test(`smoke: ${path}`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });

    const response = await page.goto(path);
    expect(response, `no response for ${path}`).not.toBeNull();
    expect(response?.status(), `unexpected status for ${path}`).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });
}
