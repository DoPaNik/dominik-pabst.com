import { expect, test } from '@playwright/test';
import { contactRoutes, languageSwitchRoutes } from './site-routes';

test('contact form wiring is correct on both locales', async ({ page }) => {
  for (const { path, successPath } of contactRoutes) {
    await page.goto(path);

    const form = page.locator('form[name="contact"]');
    await expect(form).toHaveAttribute('data-netlify', 'true');
    await expect(form).toHaveAttribute('method', 'POST');
    await expect(form).toHaveAttribute('action', successPath);
    await expect(page.locator('input[name="form-name"]')).toHaveValue('contact');
    await expect(page.locator('input[name="language"]')).toHaveValue(
      path.startsWith('/en') ? 'en' : 'de',
    );
    await expect(page.locator('input[name="name"]')).toHaveAttribute('required', '');
    await expect(page.locator('input[name="email"]')).toHaveAttribute('required', '');
    await expect(page.locator('textarea[name="message"]')).toHaveAttribute('required', '');
    await expect(page.locator('p.visually-hidden')).toHaveClass(/visually-hidden/);
    await expect(page.locator('p.visually-hidden')).toHaveCSS('position', 'absolute');
  }
});

test('burger button stays hidden and the CTA stays visible on desktop', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#dpn-nav-burger')).toBeHidden();
  await expect(page.locator('.dpn-nav__cta')).toBeVisible();
});

test('theme toggle persists and survives client navigation', async ({ page }) => {
  await page.goto('/');
  const root = page.locator('html');
  const toggle = page.locator('#dpn-theme-toggle');

  await page.evaluate(() => localStorage.removeItem('dpn-theme'));
  await expect(root).not.toHaveAttribute('data-theme', 'light');

  await toggle.click();
  await expect(root).toHaveAttribute('data-theme', 'light');

  await page.reload();
  await expect(root).toHaveAttribute('data-theme', 'light');

  await page.getByRole('link', { name: /about|über mich/i }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(root).toHaveAttribute('data-theme', 'light');

  await toggle.click();
  await expect(root).not.toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(root).not.toHaveAttribute('data-theme', 'light');
});

for (const { source, target } of languageSwitchRoutes) {
  test(`language switch keeps the current path: ${source}`, async ({ page }) => {
    await page.goto(source);

    await page.locator('.dpn-lang-switch').click();
    await expect(page).toHaveURL(target);
    await expect(page.locator('h1').first()).toBeVisible();

    await page.locator('.dpn-lang-switch').click();
    await expect(page).toHaveURL(source);
  });
}
