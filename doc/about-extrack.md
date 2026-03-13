# About Extrack

Extrack is a personal finance app for tracking income, expenses, accounts, and category-level money flow.

This file is the least technical project overview. Read it first if you want to understand what the product is, who it is for, and what it is trying to do before diving into implementation details.

## What the Product Is

Extrack is a web app that helps a user:

- sign in and start quickly
- manage a small set of accounts
- record income and expense transactions
- organize transactions with categories
- review balances and flow summaries over time

The product is intentionally narrow and opinionated. It does not try to be a full accounting system.

## Core Product Shape

At a high level, Extrack centers around four concepts:

- `accounts` represent where money lives
- `transactions` represent money movement
- `categories` describe why a transaction happened
- the `user` record stores preferences, including the default account

## Experience Goals

The current implementation and project rules point to a few clear product goals:

- fast onboarding with useful default data
- low-friction transaction entry
- predictable, easy-to-understand balance behavior
- a codebase that favors clarity over cleverness

## Current Scope

The app currently supports:

- Clerk-based authentication
- automatic onboarding after signup
- two transaction types: `income` and `expense`
- account management
- category management
- transaction activity views
- flow summary analytics

## Seeded Starting Experience

New users are not dropped into an empty product. The app seeds an initial working setup so the first useful action can happen immediately.

Each new user gets:

- a `user` row with a default account preference
- two starter accounts: `Main` and `Cash`
- vendor income categories
- vendor expense categories

## Naming and Project State

The product described by the current source code is Extrack, but the repository still contains some starter-template leftovers.

Examples:

- the root `README.md` still describes `Nextkit`
- `package.json` still uses the name `nextkit`

Treat those as legacy artifacts, not product direction.

## Read Next

- `doc/product-flow.md` for the user lifecycle and feature flow
- `doc/architecture.md` for the technical layout of the app
- `doc/backend-business-rules.md` for the domain constraints that shape the implementation
