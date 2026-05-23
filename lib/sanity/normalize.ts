import type {Brand, CarWithBrand, FAQCategory, FAQItem} from "@/lib/types/ev";
import type {ReferenceSource} from "@/lib/data/references";
import {fallbackCarImage} from "@/lib/format";

function getYearFromDate(value: string | null | undefined) {
  if (!value) return undefined;
  const year = Number(value.slice(0, 4));
  return Number.isFinite(year) ? year : undefined;
}

function getVariantStartYear(variant: CarWithBrand["variants"][number]) {
  return variant.saleStartYear ?? getYearFromDate(variant.pricingPeriods?.[0]?.startDate);
}

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
    bodyType: car.bodyType || "suv",
    variants: (car.variants || []).map((v) => ({
      ...v,
      images: v.images?.length ? v.images : [fallbackCarImage],
      detail: v.detail || {th: "", en: ""},
      saleStartYear: getVariantStartYear(v),
      saleEndYear: v.saleEndYear ?? null,
      status: v.status || "on-sale",
      pricingPeriods: v.pricingPeriods || [],
      faqItems: v.faqItems || [],
      wheelsExterior: v.wheelsExterior || {
        wheelSizeInch: 0,
        tireSize: "",
        availableColors: [],
        sunroofType: {th: "-", en: "-"}
      }
    }))
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
