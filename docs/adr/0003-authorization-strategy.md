# ADR-0003: AppSync authorization — userPool default, scoped API key, owner/group directives

Status: accepted — June 2026

## Context

The data layer serves two very different audiences: anonymous candidates
browsing the public catalog, and authenticated candidates whose application
and score records are sensitive. Agencies need read access to applications
routed to them; content admins need catalog write access.

## Decision

- Default authorization mode: **Cognito user pool**.
- **API key** mode exists solely for `read` on catalog models (Department,
  JobPosting, TestProduct), enabling public pages and previews without a
  session. The key is non-privileged by construction — it cannot mutate.
- **`allow.owner()`** scopes Application records to the candidate who created
  them; Cognito injects the owner claim, AppSync enforces it per record.
- **Groups**: `Agencies` gets `read` on Application; `Admins` gets full
  catalog and application access. Group membership rides on the access-token
  claims, evaluated by AppSync directives — no resolver code.
- The `score-summary` Lambda accesses the API via `allow.resource()` (IAM
  policy generated for that function only), not a shared service key.

## Alternatives considered

- **identityPool guest IAM for public reads**: more moving parts (identity
  pool, unauth role) for the same outcome; API key with `read`-only scope is
  simpler and rotates on a fixed 365-day expiry.
- **Lambda authorizer**: needed only if authorization logic outgrows
  owner/group semantics (e.g., per-department row filters by contract tier).
  Revisit then.

## Consequences

- The public surface cannot write, even if the API key leaks (it ships in
  the client bundle by design, as all AppSync API keys do).
- Candidate PII isolation is enforced at the API layer, not in UI code.
- Adding an agency portal later is a directive change, not a refactor.
