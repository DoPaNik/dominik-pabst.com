import { defineConfig, devices } from '@playwright/test';

const chromeExecutable =
  process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : undefined;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4322',
    trace: 'on-first-retry',
    launchOptions: chromeExecutable ? { executablePath: chromeExecutable } : undefined,
  },
  webServer: {
    // The sandbox does not allow binding to 0.0.0.0 during test startup.
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4322',
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: '**/visual.spec.ts',
    },
    {
      // Separate project so `npm test` (the required CI check) never runs
      // these — screenshot baselines must come from an actual GitHub
      // Actions run, not this sandbox, so `npm run test:visual` is the only
      // thing that targets it. See tests/visual.spec.ts.
      name: 'visual',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/visual.spec.ts',
    },
  ],
});
