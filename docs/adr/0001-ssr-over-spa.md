# ADR-0001: Server-rendered Next.js over a client-side SPA

Status: accepted — June 2026

## Context

The current candidate portal is a hash-routed React SPA serving an empty HTML
shell. The apex domain redirects into it, so NTN's effective front door is
invisible to crawlers, link unfurlers, and no-JS contexts. SEO today is
carried entirely by legacy ColdFusion pages.

## Decision

Use Next.js App Router. Marketing and catalog pages are statically
prerendered at build time; the authenticated dashboard remains a client-side
island. Path-based routing throughout; `sitemap.ts` and `robots.ts` ship as
build artifacts.

## Alternatives considered

- **Prerender service in front of the existing SPA** (e.g. Prerender.io):
  fixes crawlability only; leaves bundle size, link previews, and the
  three-property fragmentation untouched. Adds a cache layer to operate.
- **Astro/SvelteKit static site for marketing only**: excellent for the
  marketing tier but introduces a fourth stack and a second design system
  the moment candidate flows need auth. The engagement's existing skill base
  is React/TypeScript.
- **Keep MUI + React SPA, add React Router v7 SSR**: viable, but Next on
  Amplify Hosting gets SSR compute, image optimization, and route-level code
  splitting with no custom server to maintain.

## Consequences

- Every public page is full HTML at the edge; Lighthouse SEO defects in the
  audit are eliminated structurally rather than patched.
- The dashboard chunk (Amplify libraries, ~optional) loads only on
  `/dashboard`, replacing today's 2.1 MB single bundle with route-sized ones.
- SSR compute is a new runtime dependency on Amplify Hosting; mitigated by
  prerendering everything that does not require a session.
