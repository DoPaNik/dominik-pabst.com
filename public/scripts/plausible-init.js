/* global plausible */
// Plausible Analytics init stub — verbatim from the Plausible dashboard
// snippet for dopanik.de. Kept as a same-origin file (not inline) so it
// satisfies the CSP `script-src 'self'` without needing 'unsafe-inline'
// or a content hash. `plausible` becomes a real global via the
// `window.plausible = ...` assignment below; the directive above just
// tells the linter that's intentional.
window.plausible =
  window.plausible ||
  function () {
    (plausible.q = plausible.q || []).push(arguments);
  };
plausible.init = plausible.init || function (i) {
  plausible.o = i || {};
};
plausible.init();
