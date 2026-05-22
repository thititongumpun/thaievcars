import Image from "next/image";
import {ExternalLink} from "lucide-react";
import {notFound} from "next/navigation";
import {setRequestLocale, getTranslations} from "next-intl/server";
import type {Metadata} from "next";
import type {Locale} from "@/i18n/routing";
import {Badge} from "@/components/ui/badge";
import {CarCard} from "@/components/car/car-card";
import {CarTabs} from "@/components/car/car-tabs";
import {TrustBadge} from "@/components/car/trust-badge";
import {Car360Viewer} from "@/components/car/car-360-viewer";
import {formatThb, getCurrentPricing, getPreviousPricing, localize} from "@/lib/format";
import {getFAQItemsForModel, getModelBySlug, getModels, getRelatedModels} from "@/lib/data/models";
import {buildMetadata} from "@/lib/seo";

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

  const currentPrice = getCurrentPricing(car.pricingPeriods);
  const priceText = currentPrice ? ` ${formatThb(currentPrice.priceThb, locale)}` : "";
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
    image: car.images[0]
  });
}

export default async function CarDetailPage({params}: {params: Promise<{locale: Locale; slug: string}>}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");
  const carT = await getTranslations("car");
  const car = await getModelBySlug(slug);
  if (!car) notFound();

  const currentPrice = getCurrentPricing(car.pricingPeriods);
  const previousPrice = getPreviousPricing(car.pricingPeriods);
  const relatedCars = await getRelatedModels(car.slug);
  const faqItems = await getFAQItemsForModel(car.id);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted">
            <Image src={car.images[0]} alt={localize(car.name, locale)} fill className="object-cover" priority sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {car.images.map((image, index) => (
              <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted">
                <Image src={image} alt={`${localize(car.name, locale)} ${index + 1}`} fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>{localize(car.brand.name, locale)}</Badge>
            <TrustBadge confidence={car.sourceConfidence} />
            <Badge>{car.year}</Badge>
            <Badge className={car.status === "on-sale" ? "border-green-200 bg-green-50 text-green-800" : ""}>
              {car.status === "on-sale" ? t("onSale") : t("discontinued")}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">{localize(car.name, locale)}</h1>
          <p className="mt-4 leading-7 text-muted-foreground">{localize(car.shortDescription, locale)}</p>
          <div className="mt-6 rounded-lg border border-border bg-white p-5">
            <p className="text-sm text-muted-foreground">{t("currentPrice")}</p>
            <p className="mt-1 text-3xl font-bold">{currentPrice ? formatThb(currentPrice.priceThb, locale) : "-"}</p>
            {previousPrice && currentPrice && previousPrice.priceThb > currentPrice.priceThb ? (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="line-through">{formatThb(previousPrice.priceThb, locale)}</span>
                <span className="ml-2 text-green-700">{t("discount")} {formatThb(previousPrice.priceThb - currentPrice.priceThb, locale)}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {car.spinImages?.length ? <Car360Viewer images={car.spinImages} alt={localize(car.name, locale)} /> : null}

      <CarTabs car={car} locale={locale} faqItems={faqItems} />

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-white p-5">
          <h2 className="text-lg font-bold">Warranty</h2>
          <dl className="mt-3 grid gap-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-border pb-3">
              <dt className="text-muted-foreground">Vehicle</dt>
              <dd className="font-semibold">{car.warranty.vehicleYears} years / {car.warranty.vehicleKm.toLocaleString()} km</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Battery</dt>
              <dd className="font-semibold">{car.warranty.batteryYears} years / {car.warranty.batteryKm.toLocaleString()} km</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-lg border border-border bg-white p-5">
          <h2 className="text-lg font-bold">Data status</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <TrustBadge confidence={car.sourceConfidence} />
            <Badge>{car.bodyType}</Badge>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Updated by: {car.lastUpdatedBy}</p>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-lg font-bold">{carT("sources")}</h2>
        <p className="mt-2 text-sm leading-6 text-amber-950">{carT("verifyBeforeBuying")}</p>
        <p className="mt-3 text-sm font-medium text-amber-950">
          {carT("lastVerified")}: {car.lastVerifiedAt}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {car.sourceUrls.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-950 hover:bg-amber-100"
            >
              {new URL(url).hostname}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
          <a
            href={`/contribute?model=${encodeURIComponent(localize(car.name, locale))}`}
            className="inline-flex items-center gap-2 rounded-md bg-amber-950 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-900"
          >
            {carT("suggestUpdate")}
          </a>
        </div>
      </section>

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
