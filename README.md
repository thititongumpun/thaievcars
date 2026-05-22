# ThaiEVCars

Thai-first EV reference site for buyers and owners in Thailand. Browse brands, compare specs, track pricing history, and explore owner FAQs — in Thai and English.

## Tech Stack

- **Framework**: Next.js 15 (App Router, React Server Components)
- **CMS**: Sanity v3 (content management + Sanity Studio at `/studio`)
- **Styling**: Tailwind CSS + shadcn/ui
- **i18n**: next-intl (Thai default + English)
- **Deployment**: Vercel

## Features

- EV brand catalog with model listings
- Car detail pages — specs, charging, pricing history, 360° viewer
- Side-by-side comparison tool (up to 3 models)
- Owner FAQ categorised by model
- Reference sources with trust badges
- Data quality dashboard
- ISR via Sanity webhook
- Per-page SEO metadata, sitemap, and Open Graph images

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

```bash
cp .env.example .env.local
```

Fill in your values:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version date |
| `NEXT_PUBLIC_SITE_URL` | Production URL (used for SEO/sitemap) |
| `SANITY_API_TOKEN` | Server-only Sanity write token |
| `SANITY_REVALIDATE_SECRET` | Shared secret for ISR webhook |

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

## Sanity Setup

See [`docs/deploy-sanity.md`](docs/deploy-sanity.md) for full deployment steps and [`docs/sanity-webhook.md`](docs/sanity-webhook.md) for configuring the ISR revalidation webhook.

### Schemas

| Schema | Description |
|---|---|
| `brand` | EV brand (name, logo, country, description) |
| `carModel` | Vehicle model (specs, pricing periods, images, FAQs) |
| `pricingPeriod` | Dated price window with optional discount tracking |
| `colorOption` | Exterior colour with hex value and image |
| `faqCategory` | FAQ grouping |
| `faqItem` | Question + answer linked to a model or global |
| `referenceSource` | Official source URL with trust rating |

### Seed data

```bash
node scripts/import-seed-to-sanity.mjs
```

Imports the static seed data from `lib/data/seed.ts` into Sanity.

## Project Structure

```
app/
  [locale]/          # Localised pages (th / en)
    page.tsx         # Home
    brands/          # Brand list + brand detail
    cars/            # Car list + car detail
    compare/         # Comparison tool
    faq/             # Owner FAQ
    references/      # Reference sources
    contribute/      # Submit updates
    data-quality/    # Internal QA dashboard
  api/revalidate/    # Sanity ISR webhook
  studio/            # Sanity Studio (embedded)
  sitemap.ts
  robots.ts
components/
  brand/             # BrandCard
  car/               # CarCard, CarListing, CarTabs, Car360Viewer, TrustBadge
  compare/           # CompareTool
  layout/            # Navbar, Footer, LanguageSwitcher
  ui/                # Badge, Button, LinkButton
lib/
  data/              # Data access layer (wraps Sanity or static seed)
  sanity/            # Sanity client, GROQ queries, normaliser, image helper
  types/ev.ts        # Shared TypeScript types
  format.ts          # THB formatter, localise helper
  seo.ts             # buildMetadata helper
i18n/                # next-intl routing + request config
messages/            # th.json, en.json translation strings
scripts/             # generate-favicon.mjs, import-seed-to-sanity.mjs
```

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Localisation

Thai (`th`) is the default locale. English (`en`) is the alternate. URLs use the pattern:

```
/          → Thai home
/en        → English home
/cars/[slug]    → Thai car detail
/en/cars/[slug] → English car detail
```

Translation strings live in `messages/th.json` and `messages/en.json`.
