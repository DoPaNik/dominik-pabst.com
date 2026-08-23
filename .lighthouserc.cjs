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

        // Resource budgets — audit-only for now (all `warn`), so a
        // regression shows up in CI without blocking the merge. To make one
        // of these blocking, change its `warn` to `error` (do it per line,
        // not all at once — see docs/QUALITY_SCORE.md).
        //
        // Thresholds below are derived from a real measurement run on
        // 2026-08-20 (master, post AP4-1–AP4-7), not guessed: the heaviest
        // route (`/about/`, carrying the matrix-portrait bundle + optimized
        // WebP portrait) measured ~14.2 KB script, ~33.7 KB image, ~203 KB
        // total, 0ms unused-JS savings. Budgets below give that baseline
        // roughly 30–50% headroom.
        'resource-summary:script:size': ['warn', { maxNumericValue: 20000 }], // BLOCKING: warn → error
        'resource-summary:image:size': ['warn', { maxNumericValue: 50000 }], // BLOCKING: warn → error
        'resource-summary:total:size': ['warn', { maxNumericValue: 260000 }], // BLOCKING: warn → error
        // unused-javascript's numericValue is an estimated load-time saving
        // in ms if the unused code were removed, not a byte count — 0ms
        // today across every route, so a small allowance (not a hard 0)
        // avoids flagging trivial future variance.
        'unused-javascript': ['warn', { maxNumericValue: 50 }], // BLOCKING: warn → error
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
