import Image from "next/image";
import {ArrowRight} from "lucide-react";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {Link} from "@/i18n/navigation";
import {formatThb, getStartingPrice, localize} from "@/lib/format";
import type {CarWithBrand} from "@/lib/types/ev";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import {TrustBadge} from "./trust-badge";

export async function CarCard({car, locale, eagerImage = false}: {car: CarWithBrand; locale: Locale; eagerImage?: boolean}) {
  const t = await getTranslations("common");
  const startingPrice = getStartingPrice(car);

  return (
    <Link href={`/cars/${car.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-panel">
      <div className="relative aspect-[16/9] bg-muted">
        <Image src={car.images[0]} alt={localize(car.name, locale)} fill loading={eagerImage ? "eager" : "lazy"} className="object-cover transition duration-300 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <CardContent className="p-5">
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
            <p className="font-semibold">{startingPrice ? formatThb(startingPrice, locale) : "-"}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-green-700" aria-hidden="true" />
        </div>
      </CardContent>
      </Card>
    </Link>
  );
}
