# Testing Guide

Read this file when you are writing or reviewing backend tests for the Convex layer.

## Test Stack

- Vitest for test execution
- `convex-test` for running Convex functions against the schema in tests

## Test Location

Backend tests live under `convex/tests/`.

Recommended layout:

```text
convex/tests/
├── helpers.ts
├── accounts/
├── categories/
├── transactions/
├── users/
└── lib/
```

General rules:

- keep backend tests inside `convex/tests/`
- prefer one test file per function
- keep filenames aligned with the function under test
- import shared helpers instead of rewriting them locally when possible

## Auth Setup in Tests

Authenticated backend tests should:

1. create `convexTest(schema)`
2. attach a Clerk-shaped identity with `t.withIdentity(...)`
3. run onboarding before using functions that require the stored user row

Without onboarding, many authenticated functions will fail with `USER_NOT_STORED`.

## Valid Document IDs

Do not fabricate IDs by casting strings.

Prefer one of these approaches:

- reuse an ID returned by a real mutation
- insert directly with `t.run(...)`
- insert and then delete when testing not-found cases

## Preferred Test Order

The project prefers this `describe` order:

1. auth
2. entity existence
3. ownership
4. feature-specific constraints
5. function logic
6. isolation

## Seed Helpers

Shared helpers live in `convex/tests/helpers.ts`.

Use them whenever they already cover the test shape you need.

Only create a local helper when:

- the setup is specific to one test file
- the shared helpers do not express the needed shape clearly

## Safety Rules

- do not use TypeScript non-null assertions in tests or helpers
- use explicit guards for possibly missing values
- keep setup deterministic
- make ownership and auth intent obvious in each test

## Read Next

- `convex/tests/CONVEX_TESTING.md` for the detailed canonical testing reference
- `doc/backend-api.md` for the functions you are testing
- `doc/error-handling.md` for expected error shapes
