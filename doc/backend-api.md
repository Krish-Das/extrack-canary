# Backend API Layout

Read this file when you want to know how the Convex backend is organized, what each module owns, and which functions are available.

## Public Convex Modules

### `account`

The `account` module owns account reads, writes, default-account behavior, and balance-related operations.

| Function | Type | Purpose |
| --- | --- | --- |
| `list` | query | list the user's accounts |
| `get` | query | fetch an account by typed ID |
| `getByStringId` | query | normalize and fetch an account from a raw string ID |
| `create` | mutation | create a new account |
| `update` | mutation | change account name and icon |
| `toggleActive` | mutation | toggle account active state |
| `setDefault` | mutation | set the user's default account |
| `setStartingBalance` | mutation | update the baseline balance |
| `getBalance` | query | read one account balance or the combined balance |
| `delete` | mutation | delete a non-default account and its transactions |

Internal account behavior also includes:

- `applyTransactionFlow`
- `reconcileBalance`

### `category`

The `category` module owns category reads and writes.

| Function | Type | Purpose |
| --- | --- | --- |
| `list` | query | list all user categories |
| `get` | query | fetch a category by ID |
| `listByType` | query | list categories for `income` or `expense` |
| `create` | mutation | create a new category |
| `update` | mutation | update a category |
| `delete` | mutation | delete a non-vendor category and its transactions |

### `transaction`

The `transaction` module owns transaction CRUD, date-based listing, pagination, and form-default context.

| Function | Type | Purpose |
| --- | --- | --- |
| `list` | query | list all user transactions |
| `get` | query | fetch a transaction by ID |
| `create` | mutation | create a transaction and update account flow |
| `listByTimeframe` | query | list transactions within a time range |
| `listPaginatedDetailed` | query | list paginated transactions with joined account and category data |
| `getCreateContext` | query | load default account, category, and available options for the transaction form |
| `delete` | mutation | delete a transaction and reverse account flow |

### `analytics`

The `analytics` module currently exposes summary-style reads.

| Function | Type | Purpose |
| --- | --- | --- |
| `getFlowSummary` | query | aggregate flow data by account set and timeframe list |

## Internal Modules

### `userOnboarding`

`onboardUser` is an internal mutation that creates a user's initial setup after signup.

It seeds:

- starter accounts
- starter categories
- the `user` row with a default account

### `webhook`

`convex/webhook.ts` defines the Convex HTTP route used for Clerk events.

Today its main business role is handling `user.created` so onboarding can happen automatically.

## Backend Helpers

### `getDoc`

`convex/lib/doc.ts` provides reusable existence and ownership checks.

Use it when you want:

- `.mustExist()`
- `.mustBeOwnedBy(ownerId)`

### `getCurrentUserOrThrow`

`convex/lib/utils.ts` provides the standard backend auth and onboarding guard.

Use it when a query or mutation requires the current stored user.

## Design Notes for Contributors

### Public vs Internal Functions

- use public queries and mutations for client-facing behavior
- use internal mutations for backend-only orchestration such as onboarding and balance maintenance

### Ownership Checks Are Part of the API Contract

Functions that act on a document should verify ownership unless they are intentionally internal and trust a validated caller.

### The API Favors Intentional Names

Keep exported names short and explicit. Avoid naming that leaks old implementation detail or temporary constraints.

## Read Next

- `doc/backend-business-rules.md` for the domain rules behind these functions
- `doc/error-handling.md` for the expected error pattern inside Convex modules
- `doc/testing-guide.md` for how to test these functions
