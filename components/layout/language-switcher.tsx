"use client";

import {useLocale} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {cn} from "@/lib/utils";

const locales: Array<{label: string; value: Locale}> = [
  {label: "TH", value: "th"},
  {label: "EN", value: "en"}
];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <div className="inline-grid grid-cols-2 overflow-hidden rounded-md border border-border bg-white text-xs font-semibold">
      {locales.map((item) => (
        <Link
          key={item.value}
          href={pathname}
          locale={item.value}
          className={cn(
            "px-2.5 py-1.5 transition",
            locale === item.value ? "bg-foreground text-white" : "text-muted-foreground hover:bg-muted"
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
