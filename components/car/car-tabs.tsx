"use client";

import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import type {Locale} from "@/i18n/routing";
import {formatNumber, formatThb, getCurrentPricing, localize} from "@/lib/format";
import type {CarVariant, CarWithBrand, FAQItem} from "@/lib/types/ev";
import {Card, CardContent} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";

type TabId = "variants" | "specs" | "charging" | "pricing" | "faq";

function unit(value: number | string | boolean | null | undefined, suffix = "") {
  if (value === null || value === undefined || value === "") return "-";
  return `${value}${suffix}`;
}

export function CarTabs({car, locale, faqItems}: {car: CarWithBrand; locale: Locale; faqItems: FAQItem[]}) {
  const t = useTranslations("car");
  const [active, setActive] = useState<TabId>(() => (car.variants?.length ? "variants" : "specs"));
  const tabs = useMemo(
    () => [
      ...(car.variants?.length ? [{id: "variants" as const, label: t("variants")}] : []),
      {id: "specs" as const, label: t("specs")},
      {id: "charging" as const, label: t("charging")},
      {id: "pricing" as const, label: t("pricing")},
      {id: "faq" as const, label: t("faq")}
    ],
    [car.variants?.length, t]
  );

  return (
    <section className="mt-8">
      <div className="flex gap-2 overflow-x-auto border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={cn(
              "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition",
              active === tab.id ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-6">
        {active === "variants" ? <VariantTable variants={car.variants || []} locale={locale} /> : null}
        {active === "specs" ? <SpecTable car={car} locale={locale} /> : null}
        {active === "charging" ? <ChargingTable car={car} /> : null}
        {active === "pricing" ? <PricingTimeline car={car} locale={locale} /> : null}
        {active === "faq" ? <CarFAQ items={faqItems} locale={locale} /> : null}
      </div>
    </section>
  );
}

function VariantTable({variants, locale}: {variants: CarVariant[]; locale: Locale}) {
  const t = useTranslations("car");
  const rows = [
    {label: t("currentPrice"), value: (variant: CarVariant) => {
      const price = getCurrentPricing(variant.pricingPeriods);
      return price ? formatThb(price.priceThb, locale) : "-";
    }},
    {label: t("range"), value: (variant: CarVariant) => unit(formatNumber(variant.specs?.rangeKm, locale), " km")},
    {label: t("battery"), value: (variant: CarVariant) => unit(variant.specs?.batteryKwh, " kWh")},
    {label: t("power"), value: (variant: CarVariant) => unit(variant.specs?.motorKw, " kW")},
    {label: t("torque"), value: (variant: CarVariant) => unit(formatNumber(variant.specs?.torqueNm, locale), " Nm")},
    {label: t("acceleration"), value: (variant: CarVariant) => unit(variant.specs?.zeroToHundredSec, " s")},
    {label: t("drivetrain"), value: (variant: CarVariant) => unit(variant.specs?.drivetrain)},
    {label: t("dcCharging"), value: (variant: CarVariant) => `${unit(variant.charging?.dcMaxKw, " kW")} · 10-80% ${unit(variant.charging?.dcTenToEightyMin, " min")}`},
    {label: t("acCharging"), value: (variant: CarVariant) => `${unit(variant.charging?.acMaxKw, " kW")} · ${unit(variant.charging?.acChargeTimeH, " h")}`}
  ];

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
      <Table className="min-w-[760px]">
        <TableHeader>
          <TableRow className="bg-muted/60 hover:bg-muted/60">
            <TableHead className="w-44">{t("variant")}</TableHead>
            {variants.map((variant, index) => (
              <TableHead key={variant.id ?? index}>
                {localize(variant.name, locale)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label}>
              <TableCell className="font-medium text-muted-foreground">{row.label}</TableCell>
              {variants.map((variant, index) => (
                <TableCell key={variant.id ?? index} className="font-semibold">
                  {row.value(variant)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </Card>
  );
}

function Row({label, value}: {label: string; value: React.ReactNode}) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-border py-3 sm:grid-cols-2">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function SpecTable({car, locale}: {car: CarWithBrand; locale: Locale}) {
  const t = useTranslations("car");
  const specs = car.specs;
  const dimensions = specs?.dimensions;
  const wheelsExterior = car.wheelsExterior;
  const colors = wheelsExterior?.availableColors || [];
  return (
    <Card>
      <CardContent className="px-4 py-0">
    <dl>
      <Row label={t("range")} value={unit(formatNumber(specs?.rangeKm, locale), " km")} />
      <Row label={t("battery")} value={unit(specs?.batteryKwh, " kWh")} />
      <Row label={t("power")} value={unit(specs?.motorKw, " kW")} />
      <Row label={t("torque")} value={unit(formatNumber(specs?.torqueNm, locale), " Nm")} />
      <Row label={t("acceleration")} value={unit(specs?.zeroToHundredSec, " s")} />
      <Row label={t("topSpeed")} value={unit(formatNumber(specs?.topSpeedKmh, locale), " km/h")} />
      <Row label={t("drivetrain")} value={unit(specs?.drivetrain)} />
      <Row label={t("seats")} value={unit(specs?.seating)} />
      <Row label={t("cargo")} value={unit(formatNumber(specs?.cargoL, locale), " L")} />
      <Row label={t("weight")} value={unit(formatNumber(specs?.weightKg, locale), " kg")} />
      <Row label={t("dimensions")} value={dimensions ? `${unit(dimensions.lengthMm)} x ${unit(dimensions.widthMm)} x ${unit(dimensions.heightMm)} mm` : "-"} />
      <Row label={t("ipRating")} value={unit(specs?.ipRating)} />
      <Row label={t("wheels")} value={wheelsExterior ? `${unit(wheelsExterior.wheelSizeInch, "\"")} · ${unit(wheelsExterior.tireSize)}` : "-"} />
      <Row
        label={t("colors")}
        value={
          <div className="flex flex-wrap gap-2">
            {colors.length ? colors.map((color, index) => (
              <span key={color.hex ?? index} className="inline-flex items-center gap-2 text-sm">
                <span className="h-4 w-4 rounded-full border border-border" style={{backgroundColor: color.hex || "transparent"}} />
                {localize(color.name, locale)}
              </span>
            )) : "-"}
          </div>
        }
      />
    </dl>
      </CardContent>
    </Card>
  );
}

function ChargingTable({car}: {car: CarWithBrand}) {
  const t = useTranslations("car");
  const charging = car.charging;
  const connectorTypes = charging?.connectorTypes || [];
  return (
    <Card>
      <CardContent className="px-4 py-0">
    <dl>
      <Row label={t("acCharging")} value={`${unit(charging?.acMaxKw, " kW")} · ${unit(charging?.acChargeTimeH, " h")}`} />
      <Row label={t("dcCharging")} value={`${unit(charging?.dcMaxKw, " kW")} · 10-80% ${unit(charging?.dcTenToEightyMin, " min")}`} />
      <Row label={t("connector")} value={connectorTypes.length ? connectorTypes.join(", ") : "-"} />
      <Row label={t("v2l")} value={typeof charging?.v2lSupport === "boolean" ? (charging.v2lSupport ? "Yes" : "No") : "-"} />
      <Row label={t("homeCharger")} value={typeof charging?.homeChargerRequired === "boolean" ? (charging.homeChargerRequired ? "Required" : "Optional") : "-"} />
    </dl>
      </CardContent>
    </Card>
  );
}

function PricingTimeline({car, locale}: {car: CarWithBrand; locale: Locale}) {
  const pricingPeriods = car.pricingPeriods || [];
  if (pricingPeriods.length === 0) {
    return <Card><CardContent className="p-4 text-sm text-muted-foreground">No pricing history yet.</CardContent></Card>;
  }

  return (
    <div className="space-y-3">
      {pricingPeriods.map((period, index) => (
        <Card key={`${period.startDate ?? index}-${period.priceThb ?? "unknown"}`}>
          <CardContent className="p-4">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div>
              <h3 className="font-semibold">{localize(period.label, locale)}</h3>
              <p className="text-sm text-muted-foreground">
              {period.startDate ?? "-"} - {period.endDate ?? "current"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{localize(period.notes, locale)}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-lg font-bold">{formatThb(period.priceThb, locale)}</p>
              {(period.discountThb ?? 0) > 0 ? <p className="text-sm text-green-700">-{formatThb(period.discountThb, locale)}</p> : null}
            </div>
          </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CarFAQ({items, locale}: {items: FAQItem[]; locale: Locale}) {
  if (!items?.length) {
    return <Card><CardContent className="p-4 text-sm text-muted-foreground">No model-specific FAQ yet.</CardContent></Card>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
          <h3 className="font-semibold">{localize(item.question, locale)}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{localize(item.answer, locale)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
