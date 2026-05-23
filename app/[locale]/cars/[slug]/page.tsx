import Image from "next/image";
import {notFound} from "next/navigation";
import {setRequestLocale, getTranslations} from "next-intl/server";
import type {Metadata} from "next";
import type {Locale} from "@/i18n/routing";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import {CarCard} from "@/components/car/car-card";
import {CarTabs} from "@/components/car/car-tabs";
import {formatThb, getCarStatus, getCoverImages, getCurrentPricing, getPreviousPricing, getStartingPrice, localize} from "@/lib/format";
import {getModelBySlug, getModels, getRelatedModels} from "@/lib/data/models";
import {buildMetadata} from "@/lib/seo";
import type {CarVariant} from "@/lib/types/ev";

function formatVariantSaleYears(variants: CarVariant[]) {
  const starts = variants.map((variant) => variant.saleStartYear).filter((year): year is number => typeof year === "number");
  const ends = variants.map((variant) => variant.saleEndYear).filter((year): year is number => typeof year === "number");

  if (!starts.length && !ends.length) return "";

  const minStart = starts.length ? Math.min(...starts) : undefined;
  const maxEnd = ends.length ? Math.max(...ends) : undefined;
  const hasOnSale = variants.some((variant) => variant.status !== "discontinued");

  if (minStart && hasOnSale) return `${minStart} - current`;
  if (minStart && maxEnd) return `${minStart} - ${maxEnd}`;
  if (minStart) return String(minStart);
  return maxEnd ? `Until ${maxEnd}` : "";
}

export async function generateStaticParams() {
  const models = await getModels();
  return models.map((model) => ({slug: model.slug}));
}

export async function generateMetadata({params}: {params: Promise<{locale: Locale; slug: string}>}): Promise<Metadata> {
  const {locale, slug} = await params;
  const car = await getModelBySlug(slug);

  if (!car) {
    return buildMetadata({
      locale,
      path: `/cars/${slug}`,
      title: "Car not found",
      description: "Car not found",
      noIndex: true
    });
  }

  const startingPrice = getStartingPrice(car);
  const priceText = startingPrice ? ` ${formatThb(startingPrice, locale)}` : "";
  const title = `${localize(car.brand.name, locale)} ${localize(car.name, locale)}`;
  const description =
    locale === "th"
      ? `${localize(car.shortDescription, locale)} ดูสเปค ระยะทาง การชาร์จ และราคาปัจจุบัน${priceText}`
      : `${localize(car.shortDescription, locale)} See specs, range, charging, and current price${priceText}.`;

  return buildMetadata({
    locale,
    path: `/cars/${slug}`,
    title,
    description,
    image: getCoverImages(car)[0]
  });
}

export default async function CarDetailPage({params}: {params: Promise<{locale: Locale; slug: string}>}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");
  const car = await getModelBySlug(slug);
  if (!car) notFound();

  const firstVariant = car.variants?.[0];
  const currentPrice = getCurrentPricing(firstVariant?.pricingPeriods);
  const startingPrice = getStartingPrice(car);
  const previousPrice = getPreviousPricing(firstVariant?.pricingPeriods);
  const relatedCars = await getRelatedModels(car.slug);
  const saleYears = formatVariantSaleYears(car.variants || []);
  const status = getCarStatus(car);
  const coverImages = getCoverImages(car);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted">
            <Image src={coverImages[0]} alt={localize(car.name, locale)} fill className="object-cover" priority sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {coverImages.map((image, index) => (
              <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted">
                <Image src={image} alt={`${localize(car.name, locale)} ${index + 1}`} fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>{localize(car.brand.name, locale)}</Badge>
            {saleYears ? <Badge>{saleYears}</Badge> : null}
            <Badge className={status === "on-sale" ? "border-green-200 bg-green-50 text-green-800" : ""}>
              {status === "on-sale" ? t("onSale") : t("discontinued")}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">{localize(car.name, locale)}</h1>
          <p className="mt-4 leading-7 text-muted-foreground">{localize(car.shortDescription, locale)}</p>
          <Card className="mt-6">
            <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">{t("currentPrice")}</p>
            <p className="mt-1 text-3xl font-bold">{startingPrice ? formatThb(startingPrice, locale) : "-"}</p>
            {previousPrice && currentPrice && previousPrice.priceThb > currentPrice.priceThb ? (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="line-through">{formatThb(previousPrice.priceThb, locale)}</span>
                <span className="ml-2 text-green-700">{t("discount")} {formatThb(previousPrice.priceThb - currentPrice.priceThb, locale)}</span>
              </p>
            ) : null}
            </CardContent>
          </Card>
        </div>
      </div>

      <CarTabs car={car} locale={locale} />

      {relatedCars.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-bold">{t("relatedCars")}</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {relatedCars.map((related) => (
              <CarCard key={related.id} car={related} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
