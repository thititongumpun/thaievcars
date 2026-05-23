import type {Brand, CarWithBrand, FAQCategory, FAQItem} from "@/lib/types/ev";
import type {ReferenceSource} from "@/lib/data/references";

const fallbackImage = "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=80";

export function normalizeBrand(brand: Brand): Brand {
  return {
    ...brand,
    logoText: brand.logoText || brand.name.en || brand.name.th,
    featured: Boolean(brand.featured)
  };
}

export function normalizeCar(car: CarWithBrand): CarWithBrand {
  return {
    ...car,
    brand: normalizeBrand(car.brand),
    images: car.images?.length ? car.images : [fallbackImage],
    spinImages: car.spinImages || [],
    status: car.status || "on-sale",
    bodyType: car.bodyType || "suv",
    sourceUrls: car.sourceUrls || [],
    sourceConfidence: car.sourceConfidence || "needs-verification",
    lastVerifiedAt: car.lastVerifiedAt || "2026-05-23",
    lastUpdatedBy: car.lastUpdatedBy || "Sanity",
    warranty: car.warranty || {vehicleYears: 0, vehicleKm: 0, batteryYears: 0, batteryKm: 0},
    variants: (car.variants || []).map((v) => ({
      ...v,
      pricingPeriods: v.pricingPeriods || [],
      faqItems: v.faqItems || []
    })),
    wheelsExterior: car.wheelsExterior || {
      wheelSizeInch: 0,
      tireSize: "",
      availableColors: [],
      sunroofType: {th: "-", en: "-"}
    }
  };
}

export function normalizeFAQCategory(category: FAQCategory): FAQCategory {
  return {
    ...category,
    order: category.order || 0
  };
}

export function normalizeFAQItem(item: FAQItem): FAQItem {
  return item;
}

export function normalizeReferenceSource(source: ReferenceSource): ReferenceSource {
  return {
    ...source,
    checkedAt: source.checkedAt || "2026-05-23"
  };
}
