import {createClient} from "@sanity/client";
import {brands, faqCategories, faqItems, models} from "../lib/data/seed.ts";
import {referenceSources} from "../lib/data/references.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-22";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

const slug = (current) => ({_type: "slug", current});
const ref = (_ref) => ({_type: "reference", _ref});
const brandId = (id) => `brand.${id}`;
const carId = (id) => `carModel.${id}`;
const faqCategoryId = (id) => `faqCategory.${id}`;
const faqItemId = (id) => `faqItem.${id}`;
const referenceId = (id) => `referenceSource.${id}`;

function stripKeys(value) {
  if (Array.isArray(value)) {
    return value.map(stripKeys);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== "id" && key !== "brandId" && key !== "images" && key !== "spinImages")
        .map(([key, item]) => [key, stripKeys(item)])
    );
  }

  return value;
}

const transaction = client.transaction();

for (const brand of brands) {
  transaction.createOrReplace({
    _id: brandId(brand.id),
    _type: "brand",
    name: brand.name,
    slug: slug(brand.slug),
    logoText: brand.logoText,
    country: brand.country,
    description: brand.description,
    websiteUrl: brand.websiteUrl,
    featured: brand.featured
  });
}

for (const model of models) {
  transaction.createOrReplace({
    _id: carId(model.id),
    _type: "carModel",
    ...stripKeys(model),
    slug: slug(model.slug),
    brand: ref(brandId(model.brandId)),
    externalImageUrls: model.images,
    externalSpinImageUrls: model.spinImages,
    variants: model.variants.map((variant) => ({
      ...stripKeys(variant),
      externalImageUrls: variant.images
    }))
  });
}

for (const category of faqCategories) {
  transaction.createOrReplace({
    _id: faqCategoryId(category.id),
    _type: "faqCategory",
    name: category.name,
    slug: slug(category.slug),
    order: category.order
  });
}

for (const item of faqItems) {
  transaction.createOrReplace({
    _id: faqItemId(item.id),
    _type: "faqItem",
    question: item.question,
    answer: item.answer,
    category: ref(faqCategoryId(item.categoryId)),
    relatedCar: item.relatedCarId ? ref(carId(item.relatedCarId)) : undefined
  });
}

for (const source of referenceSources) {
  transaction.createOrReplace({
    _id: referenceId(source.id),
    _type: "referenceSource",
    title: source.title,
    description: source.description,
    url: source.url,
    category: source.category,
    checkedAt: source.checkedAt
  });
}

await transaction.commit();
console.log("Imported ThaiEVCars seed data into Sanity.");
