# Runbook

## Prerequisites

- Node 20+, npm 10+
- AWS credentials for the target account (`AWS_PROFILE=tst` for the TST demo
  deployment). Verify with `aws sts get-caller-identity`.

## Local development

| Goal | Command |
|---|---|
| Frontend only (demo mode, no AWS) | `npm run dev` |
| Personal cloud backend | `npx ampx sandbox` (keep running; writes `amplify_outputs.json`) |
| Type-check backend | `npx tsc --noEmit -p amplify` |
| Production build check | `npm run build` |
| Lint | `npm run lint` |

Sandbox teardown: `npx ampx sandbox delete` (removes the personal stack;
nothing shared is affected).

## Deploy (hosted)

Deployment is git-driven. Push to `main` → Amplify Hosting runs `amplify.yml`:

1. `npm ci`
2. `npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID`
   (CloudFormation deploy of auth/data/functions; writes real
   `amplify_outputs.json` into the build)
3. `npm run build`

Watch progress: Amplify Console → the app → branch `main`, or
`aws amplify list-jobs --app-id <APP_ID> --branch-name main --max-items 1`.

### First-time app creation

1. Amplify Console → New app → Host web app → GitHub →
   `ThatSimpleTech/ntn-candidate-portal`, branch `main`.
2. Confirm it detected a Gen2 backend (build settings come from `amplify.yml`).
3. The app's service role needs the `AmplifyBackendDeployFullAccess` managed
   policy (console offers to create this).

## Seeding catalog data

Catalog models are API-key read-only; seeding requires an Admins-group user.

One-time admin user setup (replace pool ID from `amplify_outputs.json`):

```bash
aws cognito-idp admin-create-user \
  --user-pool-id <POOL_ID> --username seed-admin@thatsimpletech.com \
  --user-attributes Name=email,Value=seed-admin@thatsimpletech.com \
                    Name=email_verified,Value=true \
                    Name=given_name,Value=Seed Name=family_name,Value=Admin \
  --message-action SUPPRESS
aws cognito-idp admin-set-user-password \
  --user-pool-id <POOL_ID> --username seed-admin@thatsimpletech.com \
  --password '<STRONG_PASSWORD>' --permanent
aws cognito-idp admin-add-user-to-group \
  --user-pool-id <POOL_ID> --username seed-admin@thatsimpletech.com \
  --group-name Admins
```

Then:

```bash
AMPLIFY_SEED_EMAIL=seed-admin@thatsimpletech.com \
AMPLIFY_SEED_PASSWORD='<STRONG_PASSWORD>' \
npx tsx scripts/seed.ts
```

The script is not idempotent (no upsert); to reseed, clear the tables first
or tear down/redeploy the sandbox.

## Rollback

- **Frontend/backend together**: Amplify Console → branch → Redeploy a
  previous successful build (backend CFN rolls to that build's state), or
  `git revert` + push.
- **Backend stuck in UPDATE_ROLLBACK_FAILED**: CloudFormation console →
  the `amplify-...-main-...` stack → Continue update rollback; re-run the
  Amplify build.

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| `/dashboard` shows DEMO MODE on a deployed build | Build used the stub outputs — confirm `ampx pipeline-deploy` ran in the backend phase and the branch app ID matches. |
| Pricing widget shows `ESTIMATE` instead of `LIVE API` | `custom.pricingQuoteUrl` missing from outputs (backend not deployed) or the Function URL is blocked — `curl "<url>?test=fireteam&departments=3"`. |
| Sign-up emails not arriving | Cognito default email has low limits; check spam, or configure SES in `amplify/auth/resource.ts` for production volume. |
| `ampx sandbox` fails on credentials | SSO session expired: `aws sso login --profile tst`. |
| Build fails on `amplify_outputs.json` import | The stub was deleted; restore it from git (`git checkout amplify_outputs.json`). |

## Cost & teardown

Demo steady-state is <$5/month (DynamoDB on-demand, near-zero Lambda
invocations, Amplify build minutes). Full teardown: delete the Amplify app
(console) — this removes hosting and the backend stacks; verify in
CloudFormation that `amplify-ntncandidateportal-*` stacks are gone.
