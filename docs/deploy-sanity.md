# Deploy Sanity-Integrated ThaiEVCars

This version reads published content from Sanity and falls back to seed data if Sanity is empty or unavailable.

## Vercel Environment Variables

Set these in Vercel Project Settings -> Environment Variables for Production, Preview, and Development as needed:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xr8ncuc2
NEXT_PUBLIC_SANITY_DATASET=thaievcars
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-22
SANITY_REVALIDATE_SECRET=replace-with-long-random-secret
```

Optional, only needed for import/write scripts on a trusted server:

```env
SANITY_API_TOKEN=replace-with-server-only-sanity-write-token
```

Do not use `NEXT_PUBLIC_SANITY_TOKEN`. Tokens must not be exposed to browser bundles.

## Vercel Build Settings

- Framework preset: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: leave default

## Sanity CORS

In Sanity Manage, add the deployed Vercel domain to CORS:

```txt
https://YOUR_DOMAIN.vercel.app
```

Enable credentials only if Studio/auth flows require it.

## Sanity Studio

After deploy, Studio is available at:

```txt
https://YOUR_DOMAIN.vercel.app/studio
```

## Webhook Revalidation

After deploy, configure Sanity webhook using `docs/sanity-webhook.md`.

Webhook URL:

```txt
https://YOUR_DOMAIN.vercel.app/api/revalidate
```

Header:

```txt
x-revalidate-secret: same value as SANITY_REVALIDATE_SECRET
```

## Seed Data

The dataset has already been seeded from local once. To reseed later from a trusted machine:

```bash
npm run sanity:import-seed
```
