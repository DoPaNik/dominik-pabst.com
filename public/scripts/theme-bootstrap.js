(() => {
  function applyStoredTheme() {
    try {
      const stored = localStorage.getItem('dpn-theme');
      if (stored === 'light') document.documentElement.setAttribute('data-theme', 'light');
      else document.documentElement.removeAttribute('data-theme');
    } catch {
      // localStorage may be unavailable (e.g. private browsing) — keep the default theme.
    }
  }

  applyStoredTheme();
  // ClientRouter swaps <html> attributes on navigation — re-apply the theme.
  document.addEventListener('astro:after-swap', applyStoredTheme);
})();
