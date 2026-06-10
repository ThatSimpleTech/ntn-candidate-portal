# ADR-0004: Python pricing Lambda via the CDK escape hatch

Status: accepted — June 2026

## Context

The client operates a SAM/Python API layer alongside their Amplify Gen2
stack. The demo should prove the team can carry Python workloads inside the
Gen2 deployment model rather than treating them as a separate system.
Amplify's `defineFunction` is TypeScript-first.

## Decision

Define `ntn-pricing-quote` (Python 3.12, arm64) as a plain
`aws_lambda.Function` in a dedicated stack created via
`backend.createStack('python-api')` in `amplify/backend.ts`, exposed through
a Lambda Function URL with CORS, and published to the frontend via
`backend.addOutput({ custom: { pricingQuoteUrl } })`.

## Alternatives considered

- **Port the logic to TypeScript**: erases the point — the engagement
  explicitly involves maintaining Python Lambdas.
- **API Gateway REST in front**: closer to the legacy SAM layout but adds a
  stage, a deployment, and cost for a single public GET endpoint. A Function
  URL is sufficient; swap to API Gateway when routes multiply or usage plans
  / WAF are needed.
- **AppSync custom data source**: would force GraphQL onto a plain pricing
  calculation and couple the public estimator to the authenticated API.

## Consequences

- One `git push` deploys TypeScript and Python functions together; the
  Python asset is bundled by CDK from `amplify/python/pricing_quote/`.
- The function is auth-`NONE` by design (public pricing data, no PII);
  documented here so it is never copied for a privileged endpoint.
- The frontend mirrors the calculation locally as a labeled fallback, so the
  page works in sandbox-less local dev and degrades gracefully.
