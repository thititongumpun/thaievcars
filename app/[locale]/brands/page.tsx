import {setRequestLocale} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {BrandCard} from "@/components/brand/brand-card";
import {getBrands} from "@/lib/data/brands";

export default async function BrandsPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const brands = await getBrands();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">EV Brands in Thailand</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Browse brands selling electric cars in Thailand and see available models.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} locale={locale} modelCount={brand.modelCount} />
        ))}
      </div>
    </section>
  );
}
