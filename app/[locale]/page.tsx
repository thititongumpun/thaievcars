import { BatteryCharging, CarFront, GitCompareArrows } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { LinkButton } from "@/components/ui/link-button";
import { BrandCard } from "@/components/brand/brand-card";
import { CarCard } from "@/components/car/car-card";
import { Card, CardContent } from "@/components/ui/card";
import { getBrands } from "@/lib/data/brands";
import { getModels, getNewArrivalModels } from "@/lib/data/models";
import { buildMetadata, defaultSeo } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/",
    title: defaultSeo[locale].title,
    description: defaultSeo[locale].description
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const brands = await getBrands();
  const models = await getModels();
  const newModels = await getNewArrivalModels();

  return (
    <div>
      <section className="border-b border-border bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.16),transparent_32rem),linear-gradient(180deg,hsl(var(--card)),hsl(var(--background)))]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-white px-3 py-1 text-sm font-medium text-green-800">
              <BatteryCharging className="h-4 w-4" aria-hidden="true" />
              Thai EV community reference
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">{t("headline")}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{t("subhead")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/brands">
                <CarFront className="h-4 w-4" aria-hidden="true" />
                {t("browseBrands")}
              </LinkButton>
              <LinkButton href="/compare" variant="secondary">
                <GitCompareArrows className="h-4 w-4" aria-hidden="true" />
                {t("compareCars")}
              </LinkButton>
            </div>
          </div>
          <div className="grid content-center gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Stat value={brands.length} label={t("trackedBrands")} />
              <Stat value={models.length} label={t("trackedModels")} />
            </div>
            <Card className="shadow-panel">
              <CardContent className="p-5">
                <div className="grid grid-cols-3 gap-3">
                  {brands.slice(0, 3).map((brand) => (
                    <div key={brand.id} className="flex aspect-square items-center justify-center rounded-md border border-border bg-muted p-3 text-sm font-bold text-foreground">
                      {brand.logoUrl ? (
                        <div className="flex h-16 w-full items-center justify-center rounded-md border border-border bg-white px-3 shadow-subtle">
                          <Image src={brand.logoUrl} alt={`${brand.name.en} logo`} width={96} height={96} className="max-h-10 w-full object-contain" />
                        </div>
                      ) : (
                        <span className="flex h-16 w-16 items-center justify-center rounded-md bg-slate-950 px-2 text-center text-xs font-bold text-white">
                          {brand.logoText}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">{t("featuredBrands")}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} locale={locale} modelCount={brand.modelCount} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">{t("latestModels")}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {newModels.map((model) => (
            <CarCard key={model.id} car={model} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-3xl font-bold">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
