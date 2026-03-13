# Architecture

Read this file when you want the technical layout of the codebase, the main subsystems, and where to look for a given kind of logic.

## Stack

| Area | Choice |
| --- | --- |
| Frontend | Next.js `15`, React `19`, TypeScript |
| Backend | Convex |
| Auth | Clerk |
| Styling | Tailwind CSS `4` |
| Forms | React Hook Form, TanStack Form, Zod |
| UI primitives | React Aria Components, Base UI, Motion |
| Testing | Vitest, `convex-test` |
| Formatting and linting | Biome via Ultracite |
| Package manager | Bun |

## Top-Level Layout

```text
.
├── convex/    # backend schema, queries, mutations, internal functions, webhook
├── doc/       # documentation
├── lib/       # shared framework-agnostic code
├── public/    # static assets
└── src/       # Next.js app and frontend code
```

## Responsibility by Directory

### `convex/`

This directory owns backend behavior.

Typical contents:

- `schema.ts` for persisted tables and indexes
- public modules such as `account.ts`, `category.ts`, `transaction.ts`, and `analytics.ts`
- internal behavior such as onboarding and balance maintenance
- webhook entry points
- backend tests and test helpers

### `src/`

This directory owns the frontend.

Typical contents:

- route files under `src/app/`
- feature components under `src/components/`
- frontend hooks and runtime helpers under `src/hooks/` and `src/lib/`

### `lib/`

This directory is shared by both the frontend and backend.

It exists outside `src/` on purpose so both the Next.js app and Convex functions can import from it safely.

Files here should stay framework-agnostic and pure TypeScript only.

Typical examples:

- shared constants
- shared types
- seed data
- error primitives

## Path Aliases

| Alias | Target |
| --- | --- |
| `@/*` | `src/*` |
| `#/convex/*` | `convex/*` |
| `#lib/*` | `lib/*` |

## App Structure at a Glance

The authenticated product is centered around a few route groups and pages:

- `src/app/(index)/` for the home experience
- `src/app/activity/` for transaction history
- `src/app/settings/` for account and category management

Shared route-level layouts keep the floating navigation visible and reserve bottom spacing for it.

## Backend Structure at a Glance

The current Convex code is organized by domain:

- `account.ts`
- `category.ts`
- `transaction.ts`
- `analytics.ts`
- `userOnboarding.ts`
- `webhook.ts`

Supporting backend helpers live under `convex/lib/`.

## Frontend Structure at a Glance

The frontend code is organized by a mix of route ownership and reusable components.

Important areas include:

- provider setup in `src/components/provider/`
- Convex preloading helpers in `src/lib/convex/`
- transaction entry flows under `src/components/transaction/` and `src/components/form/transaction/`
- settings screens under `src/app/settings/`
- activity list components under `src/app/activity/local-comps/`

## Architectural Decisions That Matter

### Shared Code Lives in `lib/`

If code must be imported from both Convex and Next.js, it belongs in `lib/`, not `src/`.

### Balance Is Derived

The account balance model is centered on `startingBalance + netFlow`, not a directly managed mutable current balance field.

### Backend Modules Stay Singular

Convex tables are plural, but backend module names stay singular for cleaner API usage.

### Protected Routes Assume Auth

The app uses Clerk middleware to protect almost the entire route surface, then relies on backend guards to ensure the user has also been onboarded.

## Read Next

- `doc/auth-and-data-flow.md` for how data gets from Clerk and Convex into the UI
- `doc/backend-api.md` for the domain modules and function reference
- `doc/testing-guide.md` for backend test structure
