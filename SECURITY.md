# Security Policy

This is Dominik Pabst's personal site — a static Astro site with no
backend, no user accounts, and no stored user data (the contact form is
handled entirely by Netlify Forms). The realistic attack surface is small,
but reports are still welcome and taken seriously.

## Reporting a vulnerability

Please report security issues privately rather than opening a public
GitHub issue:

- **Preferred:** use GitHub's [private vulnerability
  reporting](https://github.com/DoPaNik/dominik-pabst.com/security/advisories/new)
  for this repository.
- **Alternative:** email **hi@dopanik.de** with a description of the issue
  and, if possible, steps to reproduce.

You should get an acknowledgement within a few days. This is a
solo-maintained project, so please be patient with the fix timeline —
there's no SLA, but real issues will be addressed.

## Scope

In scope: the site's source code, build pipeline, and deployed
configuration (`public/_headers`, `netlify.toml`, CSP, etc.) in this
repository. Out of scope: third-party services this site links to or
loads from (Plausible Analytics, Netlify's own infrastructure, GitHub) —
please report those directly to the respective provider.

For the technical detail behind the current security posture (CSP,
headers, dependency scanning), see
[`docs/SECURITY.md`](./docs/SECURITY.md).
