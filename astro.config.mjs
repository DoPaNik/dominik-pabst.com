// @ts-check
import { execSync } from 'node:child_process';
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import postcssCustomMedia from 'postcss-custom-media';
import postcssGlobalData from '@csstools/postcss-global-data';

// https://astro.build/config
// Thank-you pages are only reachable after a form submission and have no
// search value — keep them out of the sitemap alongside their noindex tag.
const noindexPaths = ['/contact/success', '/en/contact/success'];

// Netlify sets COMMIT_REF to the full deployed SHA; fall back to git for
// local builds. Surfaced in the footer so a stale mobile cache is obvious
// at a glance instead of looking like a broken feature (see Footer.astro).
function getBuildCommit() {
  if (process.env.COMMIT_REF) return process.env.COMMIT_REF.slice(0, 7);
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'dev';
  }
}

const buildCommit = getBuildCommit();
const buildTime = new Date().toISOString();

export default defineConfig({
  site: 'https://dopanik.de',
  devToolbar: {
    enabled: false,
  },
  build: {
    inlineStylesheets: 'never',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !noindexPaths.some((path) => new URL(page).pathname.replace(/\/$/, '') === path),
    }),
  ],
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    css: {
      postcss: {
        plugins: [
          postcssGlobalData({
            files: ['src/styles/tokens/spacing.css'],
          }),
          postcssCustomMedia(),
        ],
      },
    },
    define: {
      'import.meta.env.PUBLIC_BUILD_COMMIT': JSON.stringify(buildCommit),
      'import.meta.env.PUBLIC_BUILD_TIME': JSON.stringify(buildTime),
    },
  },
});
