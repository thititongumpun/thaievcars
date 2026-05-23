"use client";

import Image from "next/image";
import {SlidersHorizontal, X} from "lucide-react";
import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import type {Locale} from "@/i18n/routing";
import {Link} from "@/i18n/navigation";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {NativeSelect} from "@/components/ui/native-select";
import {formatThb, getStartingPrice, localize} from "@/lib/format";
import type {CarStatus, CarWithBrand, Drivetrain} from "@/lib/types/ev";

type PriceFilter = "all" | "under700k" | "under1m" | "over1m";
type RangeFilter = "all" | "400" | "450";

export function CarListing({cars, locale}: {cars: CarWithBrand[]; locale: Locale}) {
  const t = useTranslations("cars");
  const common = useTranslations("common");
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [price, setPrice] = useState<PriceFilter>("all");
  const [range, setRange] = useState<RangeFilter>("all");
  const [drivetrain, setDrivetrain] = useState<"all" | Drivetrain>("all");
  const [status, setStatus] = useState<"all" | CarStatus>("all");

  const brands = useMemo(() => {
    const unique = new Map<string, CarWithBrand["brand"]>();
    cars.forEach((car) => unique.set(car.brandId, car.brand));
    return Array.from(unique.values()).sort((a, b) => localize(a.name, locale).localeCompare(localize(b.name, locale)));
  }, [cars, locale]);

  const filteredCars = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return cars.filter((car) => {
      const currentPrice = getStartingPrice(car) ?? 0;
      const searchable = `${localize(car.name, locale)} ${localize(car.brand.name, locale)}`.toLowerCase();

      if (normalizedQuery && !searchable.includes(normalizedQuery)) return false;
      if (brand !== "all" && car.brandId !== brand) return false;
      if (price === "under700k" && currentPrice >= 700000) return false;
      if (price === "under1m" && currentPrice >= 1000000) return false;
      if (price === "over1m" && currentPrice < 1000000) return false;
      if (range === "400" && car.specs.rangeKm < 400) return false;
      if (range === "450" && car.specs.rangeKm < 450) return false;
      if (drivetrain !== "all" && car.specs.drivetrain !== drivetrain) return false;
      if (status !== "all" && car.status !== status) return false;

      return true;
    });
  }, [brand, cars, drivetrain, locale, price, query, range, status]);

  function resetFilters() {
    setQuery("");
    setBrand("all");
    setPrice("all");
    setRange("all");
    setDrivetrain("all");
    setStatus("all");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <SlidersHorizontal className="h-4 w-4 text-green-700" aria-hidden="true" />
          Filters
        </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">{t("search")}</span>
            <div className="relative mt-2">
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="BYD, Tesla, MG"
              />
            </div>
          </label>

          <FilterSelect label={t("brand")} value={brand} onChange={setBrand}>
            <option value="all">{t("allBrands")}</option>
            {brands.map((item) => (
              <option key={item.id} value={item.id}>
                {localize(item.name, locale)}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect label={t("budget")} value={price} onChange={(value) => setPrice(value as PriceFilter)}>
            <option value="all">{t("allPrices")}</option>
            <option value="under700k">{t("under700k")}</option>
            <option value="under1m">{t("under1m")}</option>
            <option value="over1m">{t("over1m")}</option>
          </FilterSelect>

          <FilterSelect label={t("range")} value={range} onChange={(value) => setRange(value as RangeFilter)}>
            <option value="all">{t("anyRange")}</option>
            <option value="400">{t("range400")}</option>
            <option value="450">{t("range450")}</option>
          </FilterSelect>

          <FilterSelect label={t("drivetrain")} value={drivetrain} onChange={(value) => setDrivetrain(value as "all" | Drivetrain)}>
            <option value="all">{t("anyDrivetrain")}</option>
            <option value="FWD">FWD</option>
            <option value="RWD">RWD</option>
            <option value="AWD">AWD</option>
          </FilterSelect>

          <FilterSelect label={t("status")} value={status} onChange={(value) => setStatus(value as "all" | CarStatus)}>
            <option value="all">{t("anyStatus")}</option>
            <option value="on-sale">{common("onSale")}</option>
            <option value="discontinued">{common("discontinued")}</option>
          </FilterSelect>

          <Button type="button" variant="secondary" className="w-full" onClick={resetFilters}>
            <X className="h-4 w-4" aria-hidden="true" />
            {t("reset")}
          </Button>
        </CardContent>
      </Card>

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-muted-foreground">{t("resultCount", {count: filteredCars.length})}</p>
        </div>
        {filteredCars.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center text-muted-foreground">{t("empty")}</CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car) => (
              <ListingCard key={car.id} car={car} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <NativeSelect
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full"
      >
        {children}
      </NativeSelect>
    </label>
  );
}

function ListingCard({car, locale}: {car: CarWithBrand; locale: Locale}) {
  const common = useTranslations("common");
  const startingPrice = getStartingPrice(car);

  return (
    <Link href={`/cars/${car.slug}`} className="group overflow-hidden rounded-lg border border-border bg-card shadow-subtle transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-panel">
      <div className="relative aspect-[16/9] bg-muted">
        <Image src={car.images[0]} alt={localize(car.name, locale)} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" />
      </div>
      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge>{localize(car.brand.name, locale)}</Badge>
          <Badge className={car.sourceConfidence === "official" ? "border-green-200 bg-green-50 text-green-800" : "border-amber-200 bg-amber-50 text-amber-900"}>
            {car.sourceConfidence === "official" ? "Official" : "Verify"}
          </Badge>
          <Badge className={car.status === "on-sale" ? "border-green-200 bg-green-50 text-green-800" : ""}>
            {car.status === "on-sale" ? common("onSale") : common("discontinued")}
          </Badge>
        </div>
        <h3 className="font-semibold group-hover:text-green-700">{localize(car.name, locale)}</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Metric label="Range" value={`${car.specs.rangeKm} km`} />
          <Metric label="Battery" value={`${car.specs.batteryKwh} kWh`} />
          <Metric label="Drive" value={car.specs.drivetrain} />
          <Metric label="Price" value={startingPrice ? formatThb(startingPrice, locale) : "-"} />
        </div>
      </div>
    </Link>
  );
}

function Metric({label, value}: {label: string; value: string}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
