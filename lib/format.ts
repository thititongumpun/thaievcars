import type {Locale} from "@/i18n/routing";
import type {CarModel, LocalizedString, PricingPeriod} from "@/lib/types/ev";

export function localize(value: LocalizedString | null | undefined, locale: Locale) {
  if (!value) return "-";
  return value[locale] || value.th || value.en || "-";
}

export function formatThb(value: number | null | undefined, locale: Locale) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumber(value: number | null | undefined, locale: Locale) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US").format(value);
}

export function getCurrentPricing(periods: PricingPeriod[] | null | undefined) {
  if (!periods?.length) return undefined;
  return periods.find((period) => period.endDate === null) ?? periods.at(-1);
}

export function getPreviousPricing(periods: PricingPeriod[] | null | undefined) {
  if (!periods?.length) return undefined;
  const currentIndex = periods.findIndex((period) => period.endDate === null);
  const index = currentIndex === -1 ? periods.length - 1 : currentIndex;
  return index > 0 ? periods[index - 1] : undefined;
}

export function getStartingPrice(car: CarModel | null | undefined) {
  if (!car) return undefined;
  const prices = [getCurrentPricing(car.pricingPeriods), ...(car.variants || []).map((variant) => getCurrentPricing(variant?.pricingPeriods))]
    .filter((period): period is PricingPeriod => Boolean(period))
    .filter((period) => typeof period.priceThb === "number" && !Number.isNaN(period.priceThb))
    .map((period) => period.priceThb);

  return prices.length ? Math.min(...prices) : undefined;
}
