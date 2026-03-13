# Extrack Handbook

This file is now the docs hub for Extrack.

The original single-file handbook was useful as a first pass, but it was too dense for quick lookup. The docs are now split into focused files so contributors can find the right information faster.

## Start Here

Use this file when you want to know **which document to read next**.

## Docs Map

### Product and Project Context

| Read this file | When you need |
| --- | --- |
| `doc/about-extrack.md` | the product identity, scope, and non-technical overview |
| `doc/product-flow.md` | the user lifecycle and main product flows |

### Codebase and System Design

| Read this file | When you need |
| --- | --- |
| `doc/architecture.md` | the repo layout, stack, subsystems, and where code lives |
| `doc/auth-and-data-flow.md` | how Clerk, route protection, Convex, and preloaded data work together |

### Backend and Domain Behavior

| Read this file | When you need |
| --- | --- |
| `doc/backend-business-rules.md` | the business constraints, domain model, and balance logic |
| `doc/backend-api.md` | the Convex module layout and function ownership |
| `doc/error-handling.md` | the detailed `AppError` and `ConvexError` error pattern |

### Contributing and Operations

| Read this file | When you need |
| --- | --- |
| `doc/testing-guide.md` | backend testing patterns and test organization |
| `doc/environment-and-webhooks.md` | environment variables, webhook setup, and onboarding trigger flow |
| `doc/contributor-conventions.md` | project-wide working agreements and source-of-truth guidance |

## Fast Paths

If you are trying to answer a specific question, start here:

- “What is this product?” → `doc/about-extrack.md`
- “How does a user move through the app?” → `doc/product-flow.md`
- “Where is this logic supposed to live?” → `doc/architecture.md`
- “How do auth and Convex interact?” → `doc/auth-and-data-flow.md`
- “What are the backend constraints?” → `doc/backend-business-rules.md`
- “Which backend function owns this behavior?” → `doc/backend-api.md`
- “How should errors be thrown?” → `doc/error-handling.md`
- “How should I write tests for this?” → `doc/testing-guide.md`
- “Which env vars and webhooks matter?” → `doc/environment-and-webhooks.md`

## Current Project Reality

Before working in the codebase, keep these points in mind:

- the product is **Extrack**, even though some starter-template naming remains
- Convex table names are plural, but backend module names are singular
- account balance is derived from `startingBalance + netFlow`
- older README files remain for history, not as the primary source of truth

## Working Rule

If more than one doc seems relevant, read in this order:

1. `doc/architecture.md`
2. the most specific focused doc for your task
3. the matching source files in `convex/`, `src/`, or `lib/`
