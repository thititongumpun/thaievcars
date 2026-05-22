import {defineRouting} from "next-intl/routing";

export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "th",
  localePrefix: "as-needed"
});
