import {getTranslations, setRequestLocale} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {CarListing} from "@/components/car/car-listing";
import {getModels} from "@/lib/data/models";

export default async function CarsPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cars");
  const cars = await getModels();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
      </div>
      <CarListing cars={cars} locale={locale} />
    </section>
  );
}
