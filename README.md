# NTN Candidate Portal — Modernization Concept

A working demonstration of a modernized National Testing Network web presence,
built by That Simple Tech. One codebase replaces the current three-property
split (React SPA + ColdFusion marketing pages + WordPress agency site) with a
server-rendered, fully crawlable application on AWS Amplify Gen2.

> Demo content only. Not affiliated with or endorsed by National Testing
> Network or Ergometrics & Applied Personnel Research, Inc.

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router, SSG/SSR) + TypeScript + Tailwind CSS 4 |
| Auth | Amazon Cognito user pool (Amplify Gen2 `defineAuth`, optional TOTP MFA, Admins/Agencies groups) |
| API | AWS AppSync GraphQL (Amplify Gen2 `defineData`) with per-model authorization directives |
| Functions | TypeScript Lambda (`score-summary`, AppSync custom query) + Python 3.12 Lambda (`pricing-quote`, Function URL via CDK escape hatch) |
| Infra | Amplify Gen2 (CDK-based), deployed by `ampx pipeline-deploy` on git push |
| Hosting | AWS Amplify Hosting (SSR compute) |

## Local development

```bash
npm install
npm run dev            # frontend only, demo mode (no AWS needed)

npx ampx sandbox       # personal cloud sandbox; writes amplify_outputs.json
npm run dev            # now /dashboard uses live Cognito + AppSync
```

`amplify_outputs.json` is committed as a stub so the frontend builds without a
backend; the sandbox and the Amplify pipeline both overwrite it with real
outputs. Without a backend the site runs in demo mode (sample dashboard data,
locally computed pricing quotes) and labels itself accordingly.

## Deployment

Connected to AWS Amplify Hosting; every push to `main` runs `amplify.yml`:
backend deploy via `ampx pipeline-deploy`, then `next build`. See
`docs/RUNBOOK.md` for environment setup, seeding, and rollback.

## Documentation

- `MODERNIZATION.md` — the audit of the current NTN web presence and the case for this architecture
- `docs/ARCHITECTURE.md` — system design and data flow
- `docs/adr/` — architecture decision records
- `docs/RUNBOOK.md` — deploy, seed, rollback, troubleshoot
- `docs/ONBOARDING.md` — new-engineer guide (first PR in under an hour)
