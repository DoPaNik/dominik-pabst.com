// Design-token governance (see CLAUDE.md: "never hardcode a hex, radius or
// duration that a token already provides"). Deliberately narrow — this is
// not a general CSS style linter (Prettier already formats CSS), just a
// gate against three specific, currently-clean value categories drifting
// back into raw literals. Font-size and spacing are NOT enforced yet: the
// existing codebase mixes literal px and var(--text-*)/var(--space-*)
// extensively already, so enforcing those now would mean either rewriting
// a large amount of unrelated CSS or piling up dozens of disable comments —
// both out of scope here. That's tracked as a future cleanup task.
export default {
  rules: {
    'declaration-property-value-disallowed-list': [
      {
        // Any hex color literal, on any property or custom property.
        '/.+/': [/#[0-9a-fA-F]{3,8}\b/],
        // border-radius must come from --radius-* tokens. `%` stays allowed
        // (circles like `border-radius: 50%` aren't a point on the radius
        // scale — they're a shape, not a corner rounding value).
        'border-radius': [/^-?[\d.]+(px|em|rem)\b/],
        // Transition/animation timing must come from --dur-* tokens.
        '/^(transition|animation)(-duration|-delay)?$/': [/\b[\d.]+m?s\b/],
      },
      {
        message: (property, value) =>
          `"${value}" for "${property}" bypasses the design tokens in src/styles/tokens/ — use a var(--...) token instead (see docs/styleguide/02-color.md, 04-layout-effects.md).`,
      },
    ],
  },
  overrides: [
    {
      files: ['src/styles/tokens/**/*.css'],
      rules: {
        'declaration-property-value-disallowed-list': null,
      },
    },
  ],
};
