import { devices, expect, test } from '@playwright/test';

// Regression coverage for a cascade bug where two CSS rules tied on
// specificity with `.dpn-btn`/`.dpn-iconbtn` (imported globally) and lost
// depending on stylesheet bundling order: the burger button stayed visible
// at desktop widths, and the "hide on mobile" rule for the CTA button lost
// too, leaving it in the flex row where it pushed the burger off-screen and
// intercepted taps meant for it. See src/styles/components/nav.css.
//
// Pixel 5 (not an iPhone preset) deliberately: iOS device presets default to
// `defaultBrowserType: 'webkit'`, but this project only installs Chromium
// (see playwright.config.ts and the CI workflow) — an iPhone preset would
// fail here with "browser not installed" rather than testing anything.
test.use({ ...devices['Pixel 5'] });

test.describe('mobile navigation', () => {
  test('burger button is fully inside the viewport and the CTA is hidden', async ({ page }) => {
    await page.goto('/');
    const viewport = page.viewportSize();
    const burgerBox = await page.locator('#dpn-nav-burger').boundingBox();

    expect(burgerBox).not.toBeNull();
    expect(burgerBox!.x).toBeGreaterThanOrEqual(0);
    expect(burgerBox!.x + burgerBox!.width).toBeLessThanOrEqual(viewport!.width);
    await expect(page.locator('.dpn-nav__cta')).toBeHidden();
  });

  test('tapping the burger opens and closes the nav panel', async ({ page }) => {
    await page.goto('/');
    const burger = page.locator('#dpn-nav-burger');
    const navLinks = page.locator('#dpn-nav-links');

    await expect(navLinks).toBeHidden();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');

    await burger.click();
    await expect(navLinks).toBeVisible();
    await expect(burger).toHaveAttribute('aria-expanded', 'true');

    await burger.click();
    await expect(navLinks).toBeHidden();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
  });

  test('a nav link inside the open panel is tappable and navigates', async ({ page }) => {
    await page.goto('/');
    await page.locator('#dpn-nav-burger').click();
    await page
      .locator('#dpn-nav-links')
      .getByRole('link', { name: /über mich|about/i })
      .click();

    await expect(page).toHaveURL(/\/about\/?$/);
  });

  test('theme toggle is reachable and switches the theme', async ({ page }) => {
    await page.goto('/');
    const root = page.locator('html');
    const toggle = page.locator('#dpn-theme-toggle');

    await page.evaluate(() => localStorage.removeItem('dpn-theme'));
    await expect(root).not.toHaveAttribute('data-theme', 'light');

    await toggle.click();
    await expect(root).toHaveAttribute('data-theme', 'light');

    await toggle.click();
    await expect(root).not.toHaveAttribute('data-theme', 'light');
  });
});

for (const path of ['/en/', '/about/', '/talks/', '/contact/']) {
  test(`burger stays inside the viewport and is tappable on ${path}`, async ({ page }) => {
    await page.goto(path);
    const viewport = page.viewportSize();
    const burger = page.locator('#dpn-nav-burger');
    const burgerBox = await burger.boundingBox();

    expect(burgerBox).not.toBeNull();
    expect(burgerBox!.x + burgerBox!.width).toBeLessThanOrEqual(viewport!.width);

    await burger.click();
    await expect(page.locator('#dpn-nav-links')).toBeVisible();
  });
}
