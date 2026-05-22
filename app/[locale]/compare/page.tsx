import {getTranslations, setRequestLocale} from "next-intl/server";
import type {Metadata} from "next";
import type {Locale} from "@/i18n/routing";
import {CompareTool} from "@/components/compare/compare-tool";
import {getModels} from "@/lib/data/models";
import {buildMetadata} from "@/lib/seo";

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params;
  return buildMetadata({
    locale,
    path: "/compare",
    title: locale === "th" ? "เปรียบเทียบรถ EV" : "Compare EV cars",
    description: locale === "th" ? "เปรียบเทียบรถ EV สูงสุด 3 รุ่น ทั้งราคา ระยะทาง แบตเตอรี่ กำลังมอเตอร์ และการชาร์จ" : "Compare up to 3 EV models by price, range, battery, power, and charging."
  });
}

export default async function ComparePage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("compare");
  const cars = await getModels();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
      </div>
      <CompareTool cars={cars} locale={locale} />
    </section>
  );
}
