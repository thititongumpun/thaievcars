import type {Metadata} from "next";
import type {Locale} from "@/i18n/routing";

const siteName = "ThaiEVCars";
const defaultBaseUrl = "https://thaievcars.com";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : defaultBaseUrl;
}

export function localizedPath(path: string, locale: Locale) {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return locale === "th" ? normalizedPath || "/" : `/en${normalizedPath}`;
}

export function absoluteUrl(path: string, locale: Locale = "th") {
  return new URL(localizedPath(path, locale), getSiteUrl()).toString();
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  noIndex = false
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path, locale);
  const fullTitle = title === siteName ? siteName : `${title} | ${siteName}`;
  const images = image ? [{url: image, width: 1200, height: 630, alt: title}] : undefined;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        th: absoluteUrl(path, "th"),
        en: absoluteUrl(path, "en"),
        "x-default": absoluteUrl(path, "th")
      }
    },
    openGraph: {
      type: "website",
      siteName,
      locale: locale === "th" ? "th_TH" : "en_US",
      title: fullTitle,
      description,
      url,
      images
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      images: image ? [image] : undefined
    },
    robots: noIndex ? {index: false, follow: false} : {index: true, follow: true}
  };
}

export const defaultSeo = {
  th: {
    title: "ThaiEVCars",
    description: "รวมข้อมูลรถ EV ที่ขายในไทย ทั้งแบรนด์ รุ่น สเปค การชาร์จ ราคา และ FAQ เพื่อช่วยตัดสินใจก่อนซื้อ"
  },
  en: {
    title: "ThaiEVCars",
    description: "Thai EV car reference with brands, models, specs, charging, prices, and FAQ for buyers in Thailand."
  }
} satisfies Record<Locale, {title: string; description: string}>;
