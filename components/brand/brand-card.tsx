import Image from "next/image";
import type {Locale} from "@/i18n/routing";
import {Link} from "@/i18n/navigation";
import type {Brand} from "@/lib/types/ev";
import {localize} from "@/lib/format";

export function BrandCard({brand, locale, modelCount}: {brand: Brand; locale: Locale; modelCount: number}) {
  return (
    <Link href={`/brands/${brand.slug}`} className="group block rounded-lg border border-border bg-white p-5 shadow-subtle transition hover:-translate-y-0.5 hover:border-green-300">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-slate-950 text-xs font-bold text-white">
          {brand.logoUrl ? (
            <Image src={brand.logoUrl} alt={`${localize(brand.name, locale)} logo`} width={56} height={56} className="h-14 w-14 rounded-md bg-white object-contain p-2" />
          ) : (
            brand.logoText
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold group-hover:text-green-700">{localize(brand.name, locale)}</h3>
          <p className="text-sm text-muted-foreground">{localize(brand.country, locale)} · {modelCount} models</p>
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{localize(brand.description, locale)}</p>
        </div>
      </div>
    </Link>
  );
}
