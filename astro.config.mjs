// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import postcssCustomMedia from 'postcss-custom-media';
import postcssGlobalData from '@csstools/postcss-global-data';

// https://astro.build/config
// Thank-you pages are only reachable after a form submission and have no
// search value — keep them out of the sitemap alongside their noindex tag.
const noindexPaths = ['/contact/success', '/en/contact/success'];

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
  },
});
