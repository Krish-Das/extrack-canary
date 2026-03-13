# Contributor Conventions

Read this file when you are changing code and want the project-wide working agreements that are not tied to one single feature.

## Source of Truth Order

When you are unsure which document or implementation to trust, use this order:

1. `convex/schema.ts`
2. current Convex source files in `convex/`
3. current frontend source files in `src/`
4. shared code in `lib/`
5. focused docs in `doc/`

## Core Working Agreements

- treat Extrack, not `Nextkit`, as the product identity
- keep Convex table names plural and backend module names singular
- keep shared cross-runtime code in `lib/`
- use the derived balance model for account work
- prefer explicit naming over broad or vague naming
- keep auth, ownership, and domain invariants obvious in the code

## Error Conventions

- use `AppError` for domain and business errors
- attach clear, structured context to those errors
- use shared helpers such as `getDoc` instead of repeating the same checks

Read `doc/error-handling.md` for the full pattern.

## Testing Conventions

- use deterministic seed helpers
- avoid fake ID casts
- avoid non-null assertions in tests
- group test cases by intent

Read `doc/testing-guide.md` for the testing workflow.

## Known Legacy Artifacts

The repository still contains some transitional details that can be confusing:

- starter-template naming in the root `README.md`
- the `nextkit` package name in `package.json`
- older examples that still refer to legacy API shapes or balance fields

Prefer the current code and current docs over those leftovers.

## Where to Look First

If you want to find something quickly:

- product intent: `doc/about-extrack.md`
- user journeys: `doc/product-flow.md`
- backend constraints: `doc/backend-business-rules.md`
- codebase structure: `doc/architecture.md`
- auth and data movement: `doc/auth-and-data-flow.md`
- backend function ownership: `doc/backend-api.md`
- tests: `doc/testing-guide.md`

## Read Next

- `doc/architecture.md`
- `doc/backend-business-rules.md`
- `doc/backend-api.md`
