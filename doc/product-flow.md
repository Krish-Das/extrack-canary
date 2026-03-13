# Product Flow

Read this file when you want to understand how the product behaves from the user's perspective and how that user journey maps to the backend.

## New User Lifecycle

1. A visitor lands on the app.
2. The visitor signs up or signs in with Clerk.
3. Clerk creates the user.
4. Clerk sends a webhook event to Convex.
5. Convex runs the onboarding mutation.
6. The app creates the user's initial data.
7. The user can now create transactions and manage settings.

## What Onboarding Creates

Onboarding creates the minimum data required for the app to work well immediately:

- one `user` row storing preferences
- two starter accounts
- vendor categories for both supported transaction types

The onboarding flow is intentionally idempotent. If the user already has seeded data, onboarding exits without creating duplicates.

## Main User Flows

### Add a Transaction

This is the primary user action.

1. The user clicks the `+` button.
2. The user chooses `income` or `expense`.
3. The app opens a drawer with the transaction form.
4. The form requests defaults and available choices from Convex.
5. The user submits the transaction.
6. The backend stores the transaction and updates account flow.

### Browse Activity

1. The user opens the activity page.
2. The app loads paginated transactions.
3. Transactions are grouped by date for display.
4. Selecting a row opens the transaction detail drawer.

### Manage Accounts

1. The user opens settings.
2. The user goes to the accounts section.
3. The app lists current accounts and aggregate balance information.
4. The user can add accounts or open a specific account's detail view.
5. In account detail, the user can change metadata, active state, default state, or balance settings within the business rules.

### Manage Categories

1. The user opens settings.
2. The user goes to the categories section.
3. The app lists expense and income categories.
4. The user can create, edit, or delete non-protected categories.

## Route-Level Product Surfaces

| Route                     | User-facing purpose                |
| ------------------------- | ---------------------------------- |
| `/`                       | home dashboard and summary widgets |
| `/activity`               | transaction history                |
| `/settings`               | settings landing page              |
| `/settings/accounts`      | account management                 |
| `/settings/accounts/[id]` | account detail and controls        |
| `/settings/categories`    | category management                |

## Flow Assumptions the Product Depends On

The app assumes:

- an authenticated user exists before protected routes are used
- onboarding has completed before protected business queries and mutations run
- a user has at least one valid account set as default
- a user has valid categories for both transaction types

When those assumptions are violated, backend guards fail early instead of trying to continue with incomplete state.

## Read Next

- `doc/auth-and-data-flow.md` for how auth and Convex data access support these flows
- `doc/backend-business-rules.md` for the constraints that limit each action
- `doc/backend-api.md` for the specific backend functions involved
