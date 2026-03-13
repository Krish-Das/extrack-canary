# Auth and Data Flow

Read this file when you want to understand how authentication, route protection, Convex access, and preloaded data fit together.

## High-Level Flow

At runtime, the app layers Clerk authentication on top of Convex data access:

1. Clerk authenticates the user.
2. Next.js middleware protects routes.
3. The frontend uses Clerk-backed Convex providers.
4. Backend functions validate auth again before reading user-owned data.
5. Server components can preload authenticated Convex queries.
6. Client components hydrate those results and keep them live.

## Route Protection

`src/middleware.ts` uses Clerk middleware to protect the app.

Current public routes are limited to sign-in and sign-up. Everything else is treated as protected.

## Frontend Provider Stack

`src/components/provider/index.tsx` wires together the client-side runtime stack:

- `ClerkProvider`
- `ConvexProviderWithClerk`
- `RouterProvider`

This is what makes authenticated Convex hooks work naturally in the React app.

## Backend Auth Guard

Backend code uses `getCurrentUserOrThrow` from `convex/lib/utils.ts`.

That helper enforces two conditions:

- a Clerk identity exists
- a corresponding `user` row exists in Convex

If either condition fails, the request stops early.

The current guard error codes are:

- `UNAUTHENTICATED`
- `USER_NOT_STORED`

## Server-Side Preloading

`src/lib/convex/server.ts` provides the authenticated preload helpers.

This layer:

- gets a Clerk token for Convex
- calls Convex `preloadQuery`
- returns a preloaded payload that can be passed into client providers

Use this pattern when a server-rendered page should start with authenticated Convex data and remain live after hydration.

## Client-Side Preloaded Context Pattern

`src/lib/convex/context.tsx` provides `createPreloadedQueryContext`.

This pattern wraps `usePreloadedQuery` in a React context so feature code can:

- preload on the server
- read on the client
- avoid passing the same data through many component layers

## Known Preloading Limitations

The current Convex preloading pattern has a few practical limitations already acknowledged by the project:

- `usePreloadedQuery` has no `skip` equivalent
- server snapshots can briefly appear before the live subscription catches up
- Clerk token refresh can cause short-lived re-auth behavior
- preserving certain preloaded results may require local state plus `useEffect`

These limitations affect UX trade-offs, not the security model.

## How Product Flows Depend on Auth

Protected product flows rely on this stack in two layers:

- route-level protection keeps unauthenticated users out of most app screens
- backend guards make sure the user is both authenticated and onboarded before domain logic runs

That second layer matters because being signed in is not enough. The backend still needs the user's stored Convex record and seeded setup.

## Read Next

- `doc/product-flow.md` for the user-facing lifecycle
- `doc/environment-and-webhooks.md` for webhook-driven onboarding
- `doc/backend-api.md` for the functions called after auth succeeds
