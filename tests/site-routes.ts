export const smokeRoutes = [
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
] as const;

export const themeModes = ['dark', 'light'] as const;

export const languageSwitchRoutes = [
  { source: '/about/', target: '/en/about/' },
  { source: '/writing/', target: '/en/writing/' },
] as const;

export const contactRoutes = [
  { path: '/contact/', successPath: '/contact/success/' },
  { path: '/en/contact/', successPath: '/en/contact/success/' },
] as const;
