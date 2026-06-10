# Engineer Onboarding

Goal: productive within the hour. No AWS access is required for frontend work.

## 1. Run it (5 minutes)

```bash
git clone git@github.com:ThatSimpleTech/ntn-candidate-portal.git
cd ntn-candidate-portal && npm install && npm run dev
```

Open http://localhost:3000. You are in **demo mode**: every page works, the
dashboard shows sample data, pricing quotes compute locally. The UI labels
demo behavior explicitly, so you always know which mode you're in.

## 2. The mental model (10 minutes)

- **`src/lib/content.ts`** — the catalog (tests, departments, jobs, FAQs).
  Marketing pages prerender from it; `scripts/seed.ts` pushes the same data
  to AppSync. Change content here, never in page files.
- **`src/app/`** — App Router pages. Everything public is a server component
  prerendered at build; `dashboard/` is the only authenticated island.
- **`amplify/`** — the backend, all TypeScript CDK:
  - `auth/resource.ts` — Cognito pool, groups, MFA policy
  - `data/resource.ts` — AppSync schema + authorization directives (read
    ADR-0003 before touching these)
  - `functions/score-summary/` — TypeScript Lambda behind the
    `getScoreSummary` GraphQL query
  - `python/pricing_quote/` + `backend.ts` — Python Lambda attached via CDK
- **`src/lib/amplify-client.ts`** — feature-detects the committed
  `amplify_outputs.json` stub vs real outputs. This is why builds never
  require AWS.

Read `docs/ARCHITECTURE.md` next, then the four ADRs (10 minutes total).

## 3. Work with a real backend (15 minutes)

```bash
aws sso login --profile tst   # or your account profile
npx ampx sandbox              # personal, isolated cloud stack
```

When the sandbox finishes, `amplify_outputs.json` is real: `/dashboard` now
runs Cognito sign-up (use a real email for the verification code) and
AppSync. Your sandbox is yours — break it freely, `npx ampx sandbox delete`
when done.

## 4. Conventions

- TypeScript strict; tabs; single quotes (match the existing files).
- Design tokens live in `src/app/globals.css` (`--ink`, `--signal`, etc.) —
  use the utility classes (`display`, `eyebrow`, `mono`, `card-lift`) rather
  than re-declaring fonts/colors.
- Every public page exports `metadata` (and JSON-LD where a schema.org type
  fits). If you add a route, add it to `src/app/sitemap.ts`.
- Schema changes: update `amplify/data/resource.ts`, let the `Schema` type
  propagate — the compiler will point at every affected call site.
- Commits: imperative subject, no signing. PRs against `main`; a push to
  `main` deploys.

## 5. First-PR candidates

- Add a department + job posting to `content.ts` (touches the full static
  pipeline: board, detail page, sitemap, JSON-LD).
- Add a `START` transit test product (exists in content terms but not as a
  catalog entry).
- Wire `Application.scheduledFor` into the dashboard card.
