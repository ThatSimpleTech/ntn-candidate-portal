# ADR-0002: Amplify Gen2 (code-first CDK) for the backend

Status: accepted — June 2026

## Context

The backend needs Cognito auth, a GraphQL API with fine-grained
authorization, and Lambda functions — matching the client's existing
production environment (Amplify Gen2, AppSync, Cognito, Lambda fleet). The
demo must also be deployable per-branch and cheap to tear down.

## Decision

Define the backend in TypeScript with Amplify Gen2 (`defineBackend`,
`defineAuth`, `defineData`, `defineFunction`). Non-Amplify constructs (the
Python pricing Lambda) attach through the CDK escape hatch in
`amplify/backend.ts`.

## Alternatives considered

- **Raw CDK app**: maximum control, but re-implements the Cognito↔AppSync↔
  frontend config plumbing (`amplify_outputs.json`, typed client generation)
  that Gen2 provides; slower to a working demo and divergent from the
  client's tooling.
- **SAM/API Gateway REST**: matches the client's legacy Python layer but not
  the direction of their platform; no typed frontend client.
- **Amplify Gen1 (CLI/JSON)**: superseded; Gen2's typed schema and
  per-branch sandboxes are the reasons the client adopted Gen2.

## Consequences

- `npx ampx sandbox` gives every engineer an isolated cloud environment;
  `ampx pipeline-deploy` keeps branch deployments reproducible from git.
- The `ClientSchema` type flows end-to-end: schema → Lambda handler types →
  frontend `generateClient<Schema>()`. Schema drift is a compile error.
- CDK escape hatch usage is documented in ADR-0004 so the boundary between
  "Amplify-managed" and "hand-rolled CDK" stays legible.
