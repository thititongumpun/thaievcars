import type {Locale} from "@/i18n/routing";
import type {LocalizedString, PricingPeriod} from "@/lib/types/ev";

export function localize(value: LocalizedString, locale: Locale) {
  return value[locale] || value.th;
}

export function formatThb(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US").format(value);
}

export function getCurrentPricing(periods: PricingPeriod[]) {
  return periods.find((period) => period.endDate === null) ?? periods.at(-1);
}

export function getPreviousPricing(periods: PricingPeriod[]) {
  const currentIndex = periods.findIndex((period) => period.endDate === null);
  const index = currentIndex === -1 ? periods.length - 1 : currentIndex;
  return index > 0 ? periods[index - 1] : undefined;
}
