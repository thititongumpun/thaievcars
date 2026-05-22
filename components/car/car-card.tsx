import Image from "next/image";
import {ArrowRight} from "lucide-react";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {Link} from "@/i18n/navigation";
import {formatThb, getCurrentPricing, localize} from "@/lib/format";
import type {CarWithBrand} from "@/lib/types/ev";
import {Badge} from "@/components/ui/badge";
import {TrustBadge} from "./trust-badge";

export async function CarCard({car, locale}: {car: CarWithBrand; locale: Locale}) {
  const t = await getTranslations("common");
  const currentPrice = getCurrentPricing(car.pricingPeriods);

  return (
    <Link href={`/cars/${car.slug}`} className="group block overflow-hidden rounded-lg border border-border bg-white shadow-subtle transition hover:-translate-y-0.5 hover:border-green-300">
      <div className="relative aspect-[16/9] bg-muted">
        <Image src={car.images[0]} alt={localize(car.name, locale)} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge>{localize(car.brand.name, locale)}</Badge>
          <TrustBadge confidence={car.sourceConfidence} />
          {car.isNewArrival ? <Badge className="border-green-200 bg-green-50 text-green-800">{t("newArrival")}</Badge> : null}
        </div>
        <h3 className="text-lg font-semibold group-hover:text-green-700">{localize(car.name, locale)}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{localize(car.shortDescription, locale)}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{t("from")}</p>
            <p className="font-semibold">{currentPrice ? formatThb(currentPrice.priceThb, locale) : "-"}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-green-700" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
