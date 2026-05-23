# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 app for Thai EV car data with Sanity as the CMS. App routes live in `app/`, including localized pages under `app/[locale]/`, API routes in `app/api/`, and Sanity Studio in `app/studio/`. Reusable UI is grouped in `components/` by domain: `car/`, `brand/`, `compare/`, `layout/`, and shared `ui/`. Data access, formatting, SEO, Sanity queries, schemas, and types live in `lib/`. Translations are in `messages/en.json` and `messages/th.json`. Static public assets are in `public/`; local image assets are in `images/`. Operational scripts are in `scripts/`, and project notes live in `docs/`.

## Build, Test, and Development Commands

- `npm run dev`: start the local Next.js development server.
- `npm run build`: build and type-check the production app.
- `npm run start`: run the production build locally.
- `npm run lint`: run ESLint across the repository.
- `npm run sanity:seed`: seed Sanity from `lib/data/seed.ts`.
- `npm run sanity:migrate-variants`: migrate existing Sanity variant fields.
- `npm run sanity:clean`: delete managed Sanity documents.

Sanity commands require `.env.local` with `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_TOKEN`.

## Coding Style & Naming Conventions

Use TypeScript and React Server Components by default; add `"use client"` only when state, effects, or browser APIs are required. Follow existing formatting: two-space indentation in JSON, compact TypeScript imports, and semicolon-free style. Components use PascalCase, hooks/helpers use camelCase, and route folders follow Next.js conventions such as `[locale]` and `[slug]`. Prefer existing helpers like `localize`, `formatThb`, and Sanity normalizers before adding new utilities.

## Testing Guidelines

No dedicated test framework is configured yet. Treat `npm run lint` and `npm run build` as required verification for every change. For UI changes, manually check affected localized routes in both Thai and English where relevant.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit prefixes, mainly `feat:` and `fix:`. Keep commits focused, for example `feat: add variant sale fields` or `fix: eager load first car card image`. Pull requests should describe the user-facing change, list verification commands run, mention Sanity schema or migration impact, and include screenshots for visible UI changes.

## Security & Configuration Tips

Do not commit `.env.local` or Sanity tokens. Keep CMS migrations explicit and reversible where possible. When changing schemas, update TypeScript types, GROQ projections, normalizers, seed/import scripts, and affected UI together.

## Repository expectations

- Do not Run `npm run lint` and  `npm run build` every time that complete the task ask me it completed or not first if completed then lint and build.