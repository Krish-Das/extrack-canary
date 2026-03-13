# Backend Business Rules

Read this file when you want the domain rules, data constraints, and backend conventions that shape the implementation.

## Core Domain Model

The product revolves around four persisted entities:

| Table | Purpose | Important fields |
| --- | --- | --- |
| `user` | user preferences | `ownerId`, `defaultAccount` |
| `accounts` | money containers | `ownerId`, `name`, `startingBalance`, `netFlow`, `is_active`, `is_archived`, `icon` |
| `categories` | transaction classification | `ownerId`, `name`, `type`, `color`, `icon`, `is_vendor` |
| `transactions` | money movement | `ownerId`, `amount`, `note`, `type`, `category`, `account`, `date` |

## Global Rules

- Every protected query and mutation assumes the user has a stored `user` row.
- All money values are stored in **cents**.
- Only two transaction types are supported: `income` and `expense`.

## Account Rules

- Each user must always have a default account.
- The default account cannot be deleted.
- The default account cannot be deactivated.
- An inactive account cannot become the default account.
- Transactions belong to exactly one account.
- Deleting an account deletes its transactions.
- The maximum number of accounts per user is `ACCOUNTS_PER_USER_MAX`.

## Category Rules

- Every category belongs to exactly one transaction type.
- A transaction's type must match its category's type.
- Vendor categories are seeded at onboarding time.
- Vendor categories are protected defaults and should not be deleted.
- Deleting a category deletes its transactions.
- The maximum number of categories per user per overall set is controlled by `CATEGORIES_PER_USER_MAX`.

## Transaction Rules

- A transaction must reference an account owned by the authenticated user.
- A transaction must reference a category owned by the authenticated user.
- Creating a transaction updates the linked account's derived flow.
- Deleting a transaction reverses that flow update.

## Derived Balance Model

Extrack does not treat current balance as an independently managed source of truth.

Instead:

```text
current balance = startingBalance + netFlow
```

This model exists so the product can:

- let the user adjust the starting point without replaying history
- keep transaction writes small and predictable
- support a separate recomputation path when needed

### Meaning of Each Field

- `startingBalance` is the user-controlled baseline
- `netFlow` is the system-managed signed change from transactions

### Why This Matters in Practice

- creating an income increases `netFlow`
- creating an expense decreases `netFlow`
- deleting a transaction applies the opposite adjustment
- reconciling an account recomputes `netFlow` from transaction history

## Shared Constraints

The current shared limits are:

| Constraint | Value |
| --- | --- |
| `TRANSACTION_AMOUNT_MIN` | `10` cents |
| `TRANSACTION_AMOUNT_MAX` | `10_000_000` cents |
| `ACCOUNT_STARTING_BALANCE_MIN` | `0` cents |
| `ACCOUNT_STARTING_BALANCE_MAX` | `100_000_000` cents |
| `TRANSACTION_NOTE_MAX_LENGTH` | `50` characters |
| `ACCOUNT_NAME_MAX_LENGTH` | `25` characters |
| `CATEGORY_NAME_MAX_LENGTH` | `15` characters |
| `TRANSACTIONS_PER_PAGE` | `10` |
| `ACCOUNTS_PER_USER_MAX` | `5` |
| `CATEGORIES_PER_USER_MAX` | `20` |

## Backend Naming Conventions

The project follows these naming rules:

- database table names stay plural, such as `accounts`
- Convex modules and API references stay singular, such as `api.account.create`
- field names use explicit, readable names
- avoid encoding implementation details into exported API names

Examples:

- prefer `category.delete` plus internal guards over a specialized exported name
- prefer clear booleans like `is_archived`

## Errors and Domain Enforcement

Business failures use the shared `AppError` model wrapped in `ConvexError`.

Read `doc/error-handling.md` for the full throw pattern, code taxonomy, and context rules.

## Read Next

- `doc/backend-api.md` for the actual Convex function layout
- `doc/architecture.md` for the surrounding codebase structure
- `doc/error-handling.md` for the detailed error reference
