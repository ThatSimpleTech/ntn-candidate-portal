# NTN Web Presence Modernization — Audit & Proposal

Prepared by That Simple Tech, June 2026.

## 1. What exists today

NTN's public web presence is split across three properties on three stacks:

| Property | Stack | Role |
|---|---|---|
| `candidates.nationaltestingnetwork.com` | React + Vite + MUI SPA on S3/CloudFront | Jobs, scheduling, payment, scores |
| `www.nationaltestingnetwork.com/publicsafetyjobs/*.cfm` | Adobe ColdFusion | FAQs, pricing, test info, per-state pages |
| `departments.nationaltestingnetwork.com` | WordPress | Agency marketing |

The apex domain 302-redirects to the candidate SPA's hash route
(`/#/welcome`), making the SPA the effective front door.

## 2. Measured defects (June 2026)

1. **The front door is invisible to search.** The SPA serves an 894-byte HTML
   shell with an empty `<div id="root">` — no meta description, no Open Graph
   tags, no structured data. Everything after the `#` in hash-based routes is
   never sent to servers, so crawlers see one blank page.
2. **`robots.txt` is broken.** The CloudFront SPA fallback rewrites
   `/robots.txt` to the HTML shell. There is no sitemap.
3. **One 2.1 MB JavaScript bundle** (~636 KB gzipped) with no code splitting.
   Stripe, Cognito/Amplify, reCAPTCHA, MUI, and every route's code load on
   first paint, on every device.
4. **No content without JavaScript.** Screen readers, low-bandwidth users, and
   link previews all receive an empty page.
5. **Three brands, three navigations.** A candidate researching a department
   bounces between a 2026 React app, ColdFusion pages, and a WordPress site.
   The organic search traffic NTN does earn lands on the oldest-looking tier
   (the `.cfm` pages), which then hands off to the SPA.
6. **Trust friction.** Candidates' most common complaints (test cost clarity,
   score opacity, what-happens-next) are addressable with content and UX, not
   policy changes.

## 3. What this demo changes

| Defect | Fix in this codebase |
|---|---|
| Hash routing, empty shell | Path-based routes, every page server-rendered/prerendered with full HTML, meta, OG tags |
| Broken robots/sitemap | `robots.ts` + `sitemap.ts` metadata routes, generated at build |
| No structured data | JSON-LD: `Organization`, `JobPosting` per job, `Service` per exam, `FAQPage` |
| Monolithic bundle | App Router code splitting; the Amplify/Cognito chunk loads only on `/dashboard` |
| Three properties | One IA: candidates, exams, pricing, departments, FAQ in a single design system |
| Score opacity | Candidate dashboard with per-section performance bands and concrete next steps (proprietary weights stay server-side in the scoring Lambda) |
| Pricing opacity | Transparent fee table plus a live cost estimator backed by the pricing API |

## 4. Architecture alignment

The backend intentionally mirrors NTN's production environment (Amplify Gen2,
AppSync with owner/group authorization, Cognito user pools, TypeScript and
Python Lambdas) so the demo doubles as a migration blueprint rather than a
throwaway mock. See `docs/ARCHITECTURE.md` and `docs/adr/`.

## 5. Suggested roadmap (post-demo)

1. **Phase 1 — Front door.** Ship the SSR marketing/IA layer (this demo) on
   the apex domain; keep the existing SPA serving authenticated flows.
2. **Phase 2 — Content consolidation.** Migrate ColdFusion test/state pages
   into the new framework (programmatic state × test pages); 301 every `.cfm`
   URL.
3. **Phase 3 — Candidate flows.** Move scheduling/checkout into the unified
   app route-by-route, reusing the existing AppSync/Cognito backend.
4. **Phase 4 — Departments.** Replace the WordPress portal with the
   `/departments` tier and an Agencies-group dashboard.
