import {createClient} from "@sanity/client";

type PricingPeriod = {
  startDate?: string;
};

type Variant = {
  _key?: string;
  id?: string;
  images?: unknown[];
  externalImageUrls?: string[];
  saleStartYear?: number;
  saleEndYear?: number | null;
  status?: "on-sale" | "discontinued";
  wheelsExterior?: unknown;
  pricingPeriods?: PricingPeriod[];
};

type CarModelDoc = {
  _id: string;
  year?: number;
  legacyImageUrls?: string[];
  status?: "on-sale" | "discontinued";
  wheelsExterior?: unknown;
  variants?: Variant[];
};

const removedModelFields = [
  "year",
  "images",
  "externalImageUrls",
  "spinImages",
  "externalSpinImageUrls",
  "status",
  "isNewArrival",
  "wheelsExterior",
  "sourceUrls",
  "officialPriceUrl",
  "sourceConfidence",
  "lastVerifiedAt",
  "lastUpdatedBy",
  "warranty"
];

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-22",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false
});

function yearFromDate(value: string | undefined) {
  if (!value) return undefined;
  const year = Number(value.slice(0, 4));
  return Number.isFinite(year) ? year : undefined;
}

function getSaleStartYear(variant: Variant, modelYear: number | undefined) {
  return variant.saleStartYear ?? yearFromDate(variant.pricingPeriods?.[0]?.startDate) ?? modelYear;
}

async function migrate() {
  const docs = await client.fetch<CarModelDoc[]>(
    `*[_type == "carModel"]{
	      _id,
	      year,
	      "legacyImageUrls": select(count(images) > 0 => images[].asset->url, externalImageUrls),
	      status,
	      wheelsExterior,
	      variants[]{
        ...,
        pricingPeriods[]{startDate}
      }
    }`
  );

  console.log(`Found ${docs.length} car models`);

  let changed = 0;
  const tx = client.transaction();

  for (const doc of docs) {
    const variants = doc.variants || [];
    const nextVariants = variants.map((variant, index) => {
      const shouldUseLegacyImages =
        index === 0 &&
        !variant.images?.length &&
        !variant.externalImageUrls?.length &&
        Boolean(doc.legacyImageUrls?.length);

      return {
        ...variant,
        ...(shouldUseLegacyImages ? {externalImageUrls: doc.legacyImageUrls} : {}),
        saleStartYear: getSaleStartYear(variant, doc.year),
        saleEndYear: variant.saleEndYear ?? null,
        status: variant.status || doc.status || "on-sale",
        wheelsExterior: variant.wheelsExterior || doc.wheelsExterior
      };
    });

    const shouldPatch =
      removedModelFields.some((field) => field in doc) ||
      Boolean(doc.legacyImageUrls?.length) ||
      variants.some((variant, index) => {
        const next = nextVariants[index];
        return (
          variant.externalImageUrls !== next.externalImageUrls ||
          variant.saleStartYear !== next.saleStartYear ||
          variant.saleEndYear !== next.saleEndYear ||
          variant.status !== next.status ||
          variant.wheelsExterior !== next.wheelsExterior
        );
      });

    if (!shouldPatch) continue;

    tx.patch(doc._id, (patch) =>
      patch
        .set({variants: nextVariants})
        .unset(removedModelFields)
    );
    changed += 1;
  }

  if (!changed) {
    console.log("No changes needed");
    return;
  }

  await tx.commit();
  console.log(`Migrated ${changed} car models`);
}

migrate().catch((error) => {
  console.error(error);
  process.exit(1);
});
