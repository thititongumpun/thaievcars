import {createClient} from "@sanity/client";

type PricingPeriod = {
  startDate?: string;
};

type Variant = {
  _key?: string;
  id?: string;
  saleStartYear?: number;
  saleEndYear?: number | null;
  status?: "on-sale" | "discontinued";
  pricingPeriods?: PricingPeriod[];
};

type CarModelDoc = {
  _id: string;
  year?: number;
  status?: "on-sale" | "discontinued";
  variants?: Variant[];
};

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
      status,
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
    const nextVariants = variants.map((variant) => ({
      ...variant,
      saleStartYear: getSaleStartYear(variant, doc.year),
      saleEndYear: variant.saleEndYear ?? null,
      status: variant.status || doc.status || "on-sale"
    }));

    const shouldPatch =
      typeof doc.year === "number" ||
      variants.some((variant, index) => {
        const next = nextVariants[index];
        return (
          variant.saleStartYear !== next.saleStartYear ||
          variant.saleEndYear !== next.saleEndYear ||
          variant.status !== next.status
        );
      });

    if (!shouldPatch) continue;

    tx.patch(doc._id, (patch) =>
      patch
        .set({variants: nextVariants})
        .unset(["year"])
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
