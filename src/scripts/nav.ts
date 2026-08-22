// The nav is re-rendered on every ClientRouter navigation, so nothing here may
// hold a reference to a specific element: query fresh on each event instead.
const onScroll = () => {
  document.getElementById('dpn-nav')?.classList.toggle('is-scrolled', window.scrollY > 24);
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
document.addEventListener('astro:page-load', onScroll);

const closeNav = () => {
  const navLinks = document.getElementById('dpn-nav-links');
  if (!navLinks?.classList.contains('is-open')) return;
  navLinks.classList.remove('is-open');
  document.getElementById('dpn-nav-burger')?.setAttribute('aria-expanded', 'false');
};

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const burger = target.closest('#dpn-nav-burger');
  if (burger) {
    const navLinks = document.getElementById('dpn-nav-links');
    const isOpen = navLinks?.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(Boolean(isOpen)));
    if (isOpen) (navLinks?.querySelector('a') as HTMLElement | null)?.focus();
    return;
  }

  // Tapping the scrim or any other content outside the panel closes it.
  if (!target.closest('#dpn-nav-links')) closeNav();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const wasOpen = document.getElementById('dpn-nav-links')?.classList.contains('is-open');
  if (!wasOpen) return;

  closeNav();
  document.getElementById('dpn-nav-burger')?.focus();
});
