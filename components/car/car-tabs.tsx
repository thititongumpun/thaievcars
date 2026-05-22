"use client";

import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import type {Locale} from "@/i18n/routing";
import {formatNumber, formatThb, localize} from "@/lib/format";
import type {CarWithBrand, FAQItem} from "@/lib/types/ev";
import {cn} from "@/lib/utils";

type TabId = "specs" | "charging" | "pricing" | "faq";

export function CarTabs({car, locale, faqItems}: {car: CarWithBrand; locale: Locale; faqItems: FAQItem[]}) {
  const t = useTranslations("car");
  const [active, setActive] = useState<TabId>("specs");
  const tabs = useMemo(
    () => [
      {id: "specs" as const, label: t("specs")},
      {id: "charging" as const, label: t("charging")},
      {id: "pricing" as const, label: t("pricing")},
      {id: "faq" as const, label: t("faq")}
    ],
    [t]
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
        {active === "specs" ? <SpecTable car={car} locale={locale} /> : null}
        {active === "charging" ? <ChargingTable car={car} /> : null}
        {active === "pricing" ? <PricingTimeline car={car} locale={locale} /> : null}
        {active === "faq" ? <CarFAQ items={faqItems} locale={locale} /> : null}
      </div>
    </section>
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
  return (
    <dl className="rounded-lg border border-border bg-white px-4">
      <Row label={t("range")} value={`${formatNumber(specs.rangeKm, locale)} km`} />
      <Row label={t("battery")} value={`${specs.batteryKwh} kWh`} />
      <Row label={t("power")} value={`${specs.motorKw} kW`} />
      <Row label={t("torque")} value={`${formatNumber(specs.torqueNm, locale)} Nm`} />
      <Row label={t("acceleration")} value={`${specs.zeroToHundredSec} s`} />
      <Row label={t("topSpeed")} value={`${formatNumber(specs.topSpeedKmh, locale)} km/h`} />
      <Row label={t("drivetrain")} value={specs.drivetrain} />
      <Row label={t("seats")} value={specs.seating} />
      <Row label={t("cargo")} value={`${formatNumber(specs.cargoL, locale)} L`} />
      <Row label={t("weight")} value={`${formatNumber(specs.weightKg, locale)} kg`} />
      <Row label={t("dimensions")} value={`${specs.dimensions.lengthMm} x ${specs.dimensions.widthMm} x ${specs.dimensions.heightMm} mm`} />
      <Row label={t("ipRating")} value={specs.ipRating} />
      <Row label={t("wheels")} value={`${car.wheelsExterior.wheelSizeInch}" · ${car.wheelsExterior.tireSize}`} />
      <Row
        label={t("colors")}
        value={
          <div className="flex flex-wrap gap-2">
            {car.wheelsExterior.availableColors.map((color) => (
              <span key={color.hex} className="inline-flex items-center gap-2 text-sm">
                <span className="h-4 w-4 rounded-full border border-border" style={{backgroundColor: color.hex}} />
                {localize(color.name, locale)}
              </span>
            ))}
          </div>
        }
      />
    </dl>
  );
}

function ChargingTable({car}: {car: CarWithBrand}) {
  const t = useTranslations("car");
  const charging = car.charging;
  return (
    <dl className="rounded-lg border border-border bg-white px-4">
      <Row label={t("acCharging")} value={`${charging.acMaxKw} kW · ${charging.acChargeTimeH} h`} />
      <Row label={t("dcCharging")} value={`${charging.dcMaxKw} kW · 10-80% ${charging.dcTenToEightyMin} min`} />
      <Row label={t("connector")} value={charging.connectorTypes.join(", ")} />
      <Row label={t("v2l")} value={charging.v2lSupport ? "Yes" : "No"} />
      <Row label={t("homeCharger")} value={charging.homeChargerRequired ? "Required" : "Optional"} />
    </dl>
  );
}

function PricingTimeline({car, locale}: {car: CarWithBrand; locale: Locale}) {
  return (
    <div className="space-y-3">
      {car.pricingPeriods.map((period) => (
        <article key={`${period.startDate}-${period.priceThb}`} className="rounded-lg border border-border bg-white p-4">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div>
              <h3 className="font-semibold">{localize(period.label, locale)}</h3>
              <p className="text-sm text-muted-foreground">
                {period.startDate} - {period.endDate ?? "current"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{localize(period.notes, locale)}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-lg font-bold">{formatThb(period.priceThb, locale)}</p>
              {period.discountThb > 0 ? <p className="text-sm text-green-700">-{formatThb(period.discountThb, locale)}</p> : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function CarFAQ({items, locale}: {items: FAQItem[]; locale: Locale}) {
  if (items.length === 0) {
    return <p className="rounded-lg border border-border bg-white p-4 text-sm text-muted-foreground">No model-specific FAQ yet.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <article key={item.id} className="rounded-lg border border-border bg-white p-4">
          <h3 className="font-semibold">{localize(item.question, locale)}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{localize(item.answer, locale)}</p>
        </article>
      ))}
    </div>
  );
}
