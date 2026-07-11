(() => {
  // The nav is re-rendered on every ClientRouter navigation, so nothing here may
  // hold a reference to a specific element: query fresh on each event instead.
  const onScroll = () => {
    document.getElementById('dpn-nav')?.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('astro:page-load', onScroll);

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const burger = target.closest('#dpn-nav-burger');
    if (!burger) return;

    const navLinks = document.getElementById('dpn-nav-links');
    const isOpen = navLinks?.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });
})();
