"use client";

import {useMemo, useState} from "react";
import Image from "next/image";
import {useTranslations} from "next-intl";
import type {Locale} from "@/i18n/routing";
import {formatNumber, formatThb, getCurrentPricing, localize} from "@/lib/format";
import type {CarVariant, CarWithBrand, VariantFAQItem, WheelsExterior} from "@/lib/types/ev";
import {Card, CardContent} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";

type TabId = "variants" | "specs" | "charging" | "pricing" | "faq";

function unit(value: number | string | boolean | null | undefined, suffix = "") {
  if (value === null || value === undefined || value === "") return "-";
  return `${value}${suffix}`;
}

function formatSaleYears(variant: CarVariant) {
  if (!variant.saleStartYear && !variant.saleEndYear) return "-";
  if (variant.saleStartYear && variant.saleEndYear) return `${variant.saleStartYear} - ${variant.saleEndYear}`;
  if (variant.saleStartYear) return `${variant.saleStartYear} - current`;
  return `Until ${variant.saleEndYear}`;
}

export function CarTabs({car, locale}: {car: CarWithBrand; locale: Locale}) {
  const variants = car.variants || [];
  const t = useTranslations("car");
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [active, setActive] = useState<TabId>(() => (variants.length > 1 ? "variants" : "specs"));
  const activeVariant = variants[activeVariantIdx] ?? variants[0];

  const tabs = useMemo(
    () => [
      ...(variants.length > 1 ? [{id: "variants" as const, label: t("variants")}] : []),
      {id: "specs" as const, label: t("specs")},
      {id: "charging" as const, label: t("charging")},
      {id: "pricing" as const, label: t("pricing")},
      {id: "faq" as const, label: t("faq")}
    ],
    [variants.length, t]
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

      {variants.length > 1 && active !== "variants" ? (
        <div className="flex flex-wrap gap-2 pt-4">
          {variants.map((variant, idx) => (
            <button
              key={variant.id ?? idx}
              type="button"
              onClick={() => setActiveVariantIdx(idx)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm font-medium transition",
                activeVariantIdx === idx
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40"
              )}
            >
              {localize(variant.name, locale)}
            </button>
          ))}
        </div>
      ) : null}

      <div className="py-6">
        {active === "variants" ? <VariantTable variants={variants} locale={locale} /> : null}
        {active !== "variants" && activeVariant ? <VariantGallery variant={activeVariant} locale={locale} /> : null}
        {active === "specs" && activeVariant ? <SpecTable variant={activeVariant} wheelsExterior={car.wheelsExterior} locale={locale} /> : null}
        {active === "charging" && activeVariant ? <ChargingTable variant={activeVariant} /> : null}
        {active === "pricing" && activeVariant ? <PricingTimeline variant={activeVariant} locale={locale} /> : null}
        {active === "faq" && activeVariant ? <CarFAQ items={activeVariant.faqItems || []} locale={locale} /> : null}
      </div>
    </section>
  );
}

function VariantTable({variants, locale}: {variants: CarVariant[]; locale: Locale}) {
  const t = useTranslations("car");
  const common = useTranslations("common");
  const rows = [
    {label: t("variantDetail"), value: (variant: CarVariant) => localize(variant.detail, locale)},
    {label: t("variantStatus"), value: (variant: CarVariant) => variant.status === "discontinued" ? common("discontinued") : common("onSale")},
    {label: t("saleYears"), value: formatSaleYears},
    {label: t("currentPrice"), value: (variant: CarVariant) => {
      const price = getCurrentPricing(variant.pricingPeriods);
      return price ? formatThb(price.priceThb, locale) : "-";
    }},
    {label: t("range"), value: (variant: CarVariant) => unit(formatNumber(variant.specs?.rangeKm, locale), " km")},
    {label: t("battery"), value: (variant: CarVariant) => unit(variant.specs?.batteryKwh, " kWh")},
    {label: t("power"), value: (variant: CarVariant) => unit(variant.specs?.motorHp, " hp")},
    {label: t("torque"), value: (variant: CarVariant) => unit(formatNumber(variant.specs?.torqueNm, locale), " Nm")},
    {label: t("acceleration"), value: (variant: CarVariant) => unit(variant.specs?.zeroToHundredSec, " s")},
    {label: t("drivetrain"), value: (variant: CarVariant) => unit(variant.specs?.drivetrain)},
    {label: t("dcCharging"), value: (variant: CarVariant) => `${unit(variant.charging?.dcMaxKw, " kW")} · 10-80% ${unit(variant.charging?.dcTenToEightyMin, " min")}`},
    {label: t("acCharging"), value: (variant: CarVariant) => unit(variant.charging?.acMaxKw, " kW")}
  ];

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow className="bg-muted/60 hover:bg-muted/60">
              <TableHead className="w-44">{t("variant")}</TableHead>
              {variants.map((variant, index) => (
                <TableHead key={variant.id ?? index}>{localize(variant.name, locale)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-muted-foreground">{t("image")}</TableCell>
              {variants.map((variant, index) => (
                <TableCell key={variant.id ?? index}>
                  {variant.images?.[0] ? (
                    <div className="relative aspect-[4/3] min-w-36 overflow-hidden rounded-md border border-border bg-muted">
                      <Image src={variant.images[0]} alt={localize(variant.name, locale)} fill className="object-cover" sizes="180px" />
                    </div>
                  ) : "-"}
                </TableCell>
              ))}
            </TableRow>
            {rows.map((row) => (
              <TableRow key={row.label}>
                <TableCell className="font-medium text-muted-foreground">{row.label}</TableCell>
                {variants.map((variant, index) => (
                  <TableCell key={variant.id ?? index} className="whitespace-pre-line font-semibold">
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

function VariantGallery({variant, locale}: {variant: CarVariant; locale: Locale}) {
  const images = variant.images || [];
  if (!images.length) return null;

  return (
    <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {images.map((image, index) => (
        <div key={`${variant.id}-${image}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted">
          <Image src={image} alt={`${localize(variant.name, locale)} ${index + 1}`} fill className="object-cover" sizes="(min-width: 640px) 25vw, 50vw" />
        </div>
      ))}
    </div>
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

function SpecTable({variant, wheelsExterior, locale}: {variant: CarVariant; wheelsExterior: WheelsExterior | undefined; locale: Locale}) {
  const t = useTranslations("car");
  const common = useTranslations("common");
  const specs = variant.specs;
  const dimensions = specs?.dimensions;
  const colors = wheelsExterior?.availableColors || [];
  return (
    <Card>
      <CardContent className="px-4 py-0">
        <dl>
          <Row label={t("variantDetail")} value={<span className="whitespace-pre-line">{localize(variant.detail, locale)}</span>} />
          <Row label={t("variantStatus")} value={variant.status === "discontinued" ? common("discontinued") : common("onSale")} />
          <Row label={t("saleYears")} value={formatSaleYears(variant)} />
          <Row label={t("range")} value={unit(formatNumber(specs?.rangeKm, locale), " km")} />
          <Row label={t("battery")} value={unit(specs?.batteryKwh, " kWh")} />
          <Row label={t("batteryType")} value={unit(specs?.batteryType)} />
          <Row label={t("power")} value={unit(specs?.motorHp, " hp")} />
          <Row label={t("torque")} value={unit(formatNumber(specs?.torqueNm, locale), " Nm")} />
          <Row label={t("acceleration")} value={unit(specs?.zeroToHundredSec, " s")} />
          <Row label={t("topSpeed")} value={unit(formatNumber(specs?.topSpeedKmh, locale), " km/h")} />
          <Row label={t("drivetrain")} value={unit(specs?.drivetrain)} />
          <Row label={t("seats")} value={unit(specs?.seating)} />
          <Row label={t("cargo")} value={unit(formatNumber(specs?.cargoL, locale), " L")} />
          <Row label={t("weight")} value={unit(formatNumber(specs?.weightKg, locale), " kg")} />
          <Row label={t("dimensions")} value={dimensions ? `${unit(dimensions.lengthMm)} x ${unit(dimensions.widthMm)} x ${unit(dimensions.heightMm)} mm` : "-"} />
          <Row label={t("ipRating")} value={unit(specs?.ipRating)} />
          <Row label={t("frontSuspension")} value={unit(specs?.frontSuspension)} />
          <Row label={t("rearSuspension")} value={unit(specs?.rearSuspension)} />
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

function ChargingTable({variant}: {variant: CarVariant}) {
  const t = useTranslations("car");
  const charging = variant.charging;
  const connectorTypes = charging?.connectorTypes || [];
  return (
    <Card>
      <CardContent className="px-4 py-0">
        <dl>
          <Row label={t("acCharging")} value={unit(charging?.acMaxKw, " kW")} />
          <Row label={t("dcCharging")} value={`${unit(charging?.dcMaxKw, " kW")} · 10-80% ${unit(charging?.dcTenToEightyMin, " min")}`} />
          <Row label={t("connector")} value={connectorTypes.length ? connectorTypes.join(", ") : "-"} />
          <Row label={t("v2l")} value={typeof charging?.v2lSupport === "boolean" ? (charging.v2lSupport ? "Yes" : "No") : "-"} />
          <Row label={t("homeCharger")} value={typeof charging?.homeChargerRequired === "boolean" ? (charging.homeChargerRequired ? "Required" : "Optional") : "-"} />
        </dl>
      </CardContent>
    </Card>
  );
}

function PricingTimeline({variant, locale}: {variant: CarVariant; locale: Locale}) {
  const pricingPeriods = variant.pricingPeriods || [];
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
                <p className="text-sm text-muted-foreground">{period.startDate ?? "-"} - {period.endDate ?? "current"}</p>
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

function CarFAQ({items, locale}: {items: VariantFAQItem[]; locale: Locale}) {
  if (!items?.length) {
    return <Card><CardContent className="p-4 text-sm text-muted-foreground">No FAQ for this variant yet.</CardContent></Card>;
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <h3 className="font-semibold">{localize(item.question, locale)}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{localize(item.answer, locale)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
