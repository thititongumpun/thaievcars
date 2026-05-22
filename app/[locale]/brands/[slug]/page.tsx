import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {CarCard} from "@/components/car/car-card";
import {Badge} from "@/components/ui/badge";
import {getBrandBySlug, getModelsByBrandSlug} from "@/lib/data/brands";
import {getModels} from "@/lib/data/models";
import {localize} from "@/lib/format";

export async function generateStaticParams() {
  const models = await getModels();
  const slugs = Array.from(new Set(models.map((model) => model.brand.slug)));
  return slugs.map((slug) => ({slug}));
}

export default async function BrandDetailPage({params}: {params: Promise<{locale: Locale; slug: string}>}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const brand = await getBrandBySlug(slug);
  if (!brand) notFound();

  const brandModels = await getModelsByBrandSlug(slug);
  const allModels = await getModels();
  const cars = allModels.filter((model) => brandModels.some((item) => item.id === model.id));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-lg border border-border bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 items-center justify-center rounded-md bg-slate-950 text-sm font-bold text-white">{brand.logoText}</div>
          <div>
            <Badge>{localize(brand.country, locale)}</Badge>
            <h1 className="mt-3 text-3xl font-bold">{localize(brand.name, locale)}</h1>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{localize(brand.description, locale)}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} locale={locale} />
        ))}
      </div>
    </section>
  );
}
