# ThaiEVCars — Design Spec
_Date: 2026-05-23_

## Purpose

A Thai-first community reference site for EV buyers and owners in Thailand. Users browse EV brands and models, compare specs and pricing history, and read FAQ written by owners. No login required in Phase 1. Designed to scale to user accounts and community features in Phase 2.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | Vercel-native, RSC for fast static pages |
| CMS / Data store | Sanity (hosted) | Rich content model, image CDN, free tier covers Phase 1 |
| Styling | Tailwind CSS + shadcn/ui | Utility-first, accessible components out of the box |
| i18n | next-intl | Best-in-class for Next.js App Router, locale routing |
| Deployment | Vercel | Free tier, automatic previews, ISR support |
| Language | TypeScript (strict) | End-to-end type safety |

**Scalability path:** All Sanity data access is wrapped in `lib/data/` functions. When Phase 2 requires user accounts or complex queries, Neon PostgreSQL + Prisma is added and swapped in at the `lib/data/` layer only — no component changes needed.

---

## Site Structure

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Hero, featured brands, latest models, quick stats |
| `/brands` | All brands grid | Logo, country, model count per brand |
| `/brands/[slug]` | Brand detail | Brand info + all its models |
| `/cars/[slug]` | Car detail | Tabbed: Specs / Charging / Pricing / FAQ |
| `/compare` | Compare tool | Select up to 3 cars, side-by-side spec table |
| `/faq` | FAQ | Categorised Q&A, optionally linked to car models |
| `/studio` | Sanity Studio | Admin CMS (embedded in Next.js app) |

All routes are available in `/th/…` (default) and `/en/…` via next-intl locale prefix. Navbar includes a language switcher.

---

## Visual Design

- **Style:** Clean & minimal — white background, generous whitespace
- **Accent colour:** Green (`#22c55e`) — EV/eco association
- **Typography:** System font stack for performance; Thai-friendly (no web font loading issues)
- **Responsive:** Mobile-first. All pages fully usable on phones.
- **Car detail layout:** Tabbed — full-width hero image + thumbnail strip → tabs for Specs / Charging / Pricing History / FAQ

---

## Data Model (Sanity Schemas)

### Brand
```
name (TH + EN), slug, logo (image), country, description (TH + EN), websiteUrl
```

### Model (Car) — core entity
```
name (TH + EN), slug, brand → Brand, year, images[], shortDescription (TH + EN),
status (on-sale | discontinued), isNewArrival
```

### Specs (object on Model)
```
rangekm, batteryKwh, motorKw, torqueNm, zeroToHundred, topSpeedKmh,
drivetrain (FWD | RWD | AWD), seating, cargoL, weightKg,
dimensions { lengthMm, widthMm, heightMm }, ipRating
```

### Charging (object on Model)
```
acMaxKw, acChargeTimeH, dcMaxKw, dcTenToEightyMin,
connectorTypes[], v2lSupport (bool), homeChargerRequired (bool)
```

### Wheels & Exterior (object on Model)
```
wheelSizeInch, tireSize, availableColors [{ name (TH+EN), hex }], sunroofType
```

### PricingPeriod (array on Model)
```
label (TH + EN), startDate, endDate (nullable = current), priceThb, discountThb, notes (TH + EN)
```
Example: `{ label: "Launch", price: 1_200_000, discount: 0 }` → `{ label: "Promo Q2", price: 1_099_000, discount: 100_000 }`

### FAQCategory
```
name (TH + EN), slug, order
```

### FAQItem
```
question (TH + EN), answer (TH + EN, rich text), category → FAQCategory,
relatedCar → Model (optional)
```

---

## Architecture

```
/
├── app/
│   ├── [locale]/               # next-intl locale layout
│   │   ├── page.tsx            # Home
│   │   ├── brands/
│   │   ├── cars/[slug]/
│   │   ├── compare/
│   │   └── faq/
│   └── studio/[[...tool]]/     # Sanity Studio route
├── lib/
│   ├── data/                   # ALL data access here (swappable layer)
│   │   ├── brands.ts           # getBrands(), getBrandBySlug()
│   │   ├── models.ts           # getModels(), getModelBySlug()
│   │   └── faq.ts              # getFAQCategories(), getFAQItems()
│   ├── sanity/
│   │   ├── client.ts           # Sanity client config
│   │   ├── queries.ts          # GROQ query strings
│   │   └── schemas/            # Sanity schema definitions
│   └── types/                  # Shared TypeScript types (source of truth)
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── car/                    # CarCard, CarSpecTabs, PricingHistory, etc.
│   ├── brand/                  # BrandCard, BrandGrid
│   └── layout/                 # Navbar, Footer, LanguageSwitcher
├── messages/
│   ├── th.json                 # Thai strings
│   └── en.json                 # English strings
└── sanity.config.ts            # Sanity Studio config
```

---

## Key Pages — Detail

### Home `/`
- Hero section with headline and CTA (browse brands / compare cars)
- Featured brands row (logos, click → brand page)
- Latest/new arrival models grid (CarCard components)
- Quick stat bar: total brands, total models tracked

### Car Detail `/cars/[slug]`
- Full-width hero image with thumbnail strip
- Model name, brand badge, year, status pill
- Current price (large) + previous price crossed out if discounted
- **Tab: สเปค** — spec table (range, battery, power, 0-100, dimensions…)
- **Tab: ชาร์จ** — charging table (AC/DC speeds, connector types, V2L)
- **Tab: ราคา** — pricing history timeline (all PricingPeriod entries)
- **Tab: FAQ** — FAQ items linked to this car model
- Related cars from same brand (bottom)

### Compare `/compare`
- Multi-select search to add up to 3 cars
- Side-by-side table of all spec fields
- Highlight best value per row (green)

---

## i18n Strategy

- Thai (`th`) is the default locale — URL: `/th/…` or bare `/…`
- English (`en`) at `/en/…`
- UI strings in `messages/th.json` and `messages/en.json`
- Content fields (name, description, FAQ) stored as `{ th: string, en: string }` objects in Sanity
- Language switcher in navbar switches locale and stays on same page

---

## Phase 2 Scope (out of scope now)

- User accounts (NextAuth + Neon PostgreSQL)
- Owner reviews and ratings
- Community Q&A / comments
- 3D model viewer (360°)
- Dealer listing / where to buy
- Notification for price drops

---

## Verification

1. `pnpm dev` — site loads, home page renders with placeholder data
2. `/studio` — Sanity Studio loads, can create a Brand and Model
3. `/brands` — brand grid renders from Sanity
4. `/cars/[slug]` — spec tabs work, pricing history shows
5. `/compare` — select 2 cars, table renders side by side
6. `/faq` — categories and items render
7. Switch locale TH → EN — all strings switch, URL updates
8. Mobile viewport — all pages usable, no horizontal scroll
9. Lighthouse score ≥ 90 performance on homepage
