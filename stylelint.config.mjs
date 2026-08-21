// Design-token governance (see CLAUDE.md: "never hardcode a hex, px-size,
// radius or duration that a token already provides"). Deliberately narrow —
// this is not a general CSS style linter (Prettier already formats CSS),
// just a gate against value categories that are actually clean, so new
// drift gets caught without piling up disable comments for pre-existing
// literals. Spacing (px in padding/margin/gap) is NOT enforced yet — that's
// still a much bigger, unaudited surface than font-size was.
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
        // font-size must come from the --text-* scale in typography.css.
        'font-size': [/^-?[\d.]+(px|em|rem)\b/],
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
