module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      // Kept in sync by hand with `smokeRoutes` in tests/site-routes.ts —
      // that file is the source of truth for "all routes on the site".
      url: [
        '/',
        '/about/',
        '/talks/',
        '/writing/',
        '/contact/',
        '/contact/success/',
        '/en/',
        '/en/about/',
        '/en/talks/',
        '/en/writing/',
        '/en/contact/',
        '/en/contact/success/',
        '/impressum/',
        '/datenschutz/',
        '/en/impressum/',
        '/en/datenschutz/',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
