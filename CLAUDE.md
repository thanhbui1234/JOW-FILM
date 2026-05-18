# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Development (all apps in parallel via Turborepo)
pnpm dev

# Single app dev
pnpm --filter user-next-app dev      # Next.js on port 3000
pnpm --filter admin-vite-app dev     # Vite on port 3001

# Build
pnpm build                           # All apps (respects dependency order)
pnpm --filter user-next-app build
pnpm --filter admin-vite-app build

# Lint
pnpm lint

# Add packages
pnpm --filter <package-name> add <pkg>
```

No test framework is currently configured.

## Architecture

This is a **pnpm + Turborepo monorepo** with two apps sharing UI components:

```
apps/
  user-next-app/     → Next.js 15 (App Router), customer-facing site
  admin-vite-app/    → Vite + React 19, admin dashboard

packages/
  shared-ui/         → shadcn/ui components (Button, Spinner, etc.), exports via index.ts
  config/            → Shared ESLint config + tsconfig.base.json
```

**Key architectural decisions:**
- Tailwind CSS v4 with native framework plugins (`@tailwindcss/postcss` for Next.js, `@tailwindcss/vite` for Vite)
- shadcn/ui components live in `packages/shared-ui/` with new-york style variant
- `cn()` utility from `shared-ui/lib/utils.ts` (clsx + tailwind-merge)
- CSS variables in oklch color space for theming (`shared-ui/styles/globals.css`)
- Next.js uses `transpilePackages: ["shared-ui"]` to consume shared components
- Path alias `@/*` maps to `./src/` in both apps
- Root tsconfig has `@ui/*` → `packages/shared-ui/*`

**Turborepo pipeline:** `build` tasks depend on `^build` (packages build before apps). `dev` is persistent and uncached.

## Deployment

Vercel with two separate projects pointing to the same repo:
- user-next-app: root directory `apps/user-next-app`
- admin-vite-app: root directory `apps/admin-vite-app`

Vercel handles Turborepo remote caching and skips builds for unaffected apps automatically.
