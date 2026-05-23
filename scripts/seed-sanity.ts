import {createClient} from "@sanity/client";
import {brands, models, faqCategories, faqItems} from "../lib/data/seed";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-22",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false
});

function key(s: string) {
  return s.replace(/[^a-zA-Z0-9_-]/g, "_");
}

async function seed() {
  console.log("Seeding Sanity...");
  const tx = client.transaction();

  // Brands
  for (const brand of brands) {
    tx.createOrReplace({
      _id: brand.id,
      _type: "brand",
      name: brand.name,
      slug: {_type: "slug", current: brand.slug},
      logoText: brand.logoText,
      country: brand.country,
      description: brand.description,
      websiteUrl: brand.websiteUrl,
      featured: brand.featured
    });
  }

  // Car models
  for (const model of models) {
    tx.createOrReplace({
      _id: model.id,
      _type: "carModel",
      name: model.name,
      slug: {_type: "slug", current: model.slug},
      brand: {_type: "reference", _ref: model.brandId},
      externalImageUrls: model.images,
      shortDescription: model.shortDescription,
      status: model.status,
      isNewArrival: model.isNewArrival,
      bodyType: model.bodyType,
      wheelsExterior: {
        ...model.wheelsExterior,
        availableColors: model.wheelsExterior.availableColors.map((c, i) => ({
          _key: key(c.hex || String(i)),
          ...c
        }))
      },
      variants: model.variants.map((v) => ({
        _key: key(v.id),
        id: v.id,
        name: v.name,
        saleStartYear: v.saleStartYear,
        saleEndYear: v.saleEndYear,
        status: v.status,
        externalImageUrls: v.images,
        detail: v.detail,
        specs: v.specs,
        charging: v.charging,
        pricingPeriods: v.pricingPeriods.map((p, i) => ({
          _key: key(`${p.startDate ?? i}-${p.priceThb}`),
          ...p
        })),
        faqItems: (v.faqItems || []).map((f, i) => ({
          _key: key(`faq-${i}`),
          ...f
        }))
      })),
      sourceUrls: model.sourceUrls,
      officialPriceUrl: model.officialPriceUrl,
      sourceConfidence: model.sourceConfidence,
      lastVerifiedAt: model.lastVerifiedAt,
      lastUpdatedBy: model.lastUpdatedBy,
      warranty: model.warranty
    });
  }

  // FAQ categories
  for (const cat of faqCategories) {
    tx.createOrReplace({
      _id: cat.id,
      _type: "faqCategory",
      name: cat.name,
      slug: {_type: "slug", current: cat.slug},
      order: cat.order
    });
  }

  // FAQ items
  for (const item of faqItems) {
    tx.createOrReplace({
      _id: item.id,
      _type: "faqItem",
      question: item.question,
      answer: item.answer,
      category: {_type: "reference", _ref: item.categoryId},
      ...(item.relatedCarId ? {relatedCar: {_type: "reference", _ref: item.relatedCarId}} : {})
    });
  }

  const result = await tx.commit();
  console.log(`Done — ${result.results.length} documents created/replaced.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
