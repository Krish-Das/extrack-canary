# Environment and Webhooks

Read this file when you need the runtime configuration story: required environment variables, the Clerk-to-Convex webhook, and how onboarding gets triggered.

## Environment Variables

The project currently depends on these main variables:

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_URL` | app base URL |
| `NEXT_PUBLIC_CONVEX_URL` | frontend Convex client URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend auth |
| `CLERK_SECRET_KEY` | Clerk server auth |
| `CLERK_FRONTEND_API_URL` | Convex auth provider configuration |
| `CLERK_WEBHOOK_SIGNING_SECRET` | Clerk webhook verification in Convex |

## Placement Rules

- `NEXT_PUBLIC_*` variables are frontend-readable runtime configuration
- `CLERK_WEBHOOK_SIGNING_SECRET` belongs in Convex deployment config for the webhook handler
- webhook secrets should not be treated as plain frontend environment values

## Clerk to Convex Webhook

The project uses a Convex HTTP endpoint for Clerk webhooks.

Current route:

- `/clerk-users-webhook`

Important operational rules:

- the webhook target must use the Convex deployment URL
- this is not a Next.js API route
- Svix headers are verified before the payload is trusted

## Webhook Behavior

At the moment, the main event of interest is `user.created`.

When that event is verified successfully:

1. Convex extracts the Clerk user ID.
2. Convex runs the internal onboarding mutation.
3. The user's initial accounts, categories, and preference row are created.

## Why the Webhook Matters

Protected backend functions assume a stored `user` row exists.

That means signup is not complete from the application's point of view until:

- Clerk has created the identity
- the webhook has been delivered
- onboarding has created the user's initial Convex state

## Related Files

- `convex/webhook.ts`
- `convex/userOnboarding.ts`
- `convex/auth.config.ts`
- `example.env`

## Read Next

- `doc/auth-and-data-flow.md` for authenticated request flow
- `doc/product-flow.md` for the user lifecycle this webhook supports
