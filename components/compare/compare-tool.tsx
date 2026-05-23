"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { CarVariant, CarWithBrand } from "@/lib/types/ev";
import { formatNumber, formatThb, getCurrentPricing, localize } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type SlotKey = string; // `${carId}::${variantId}`

type Slot = {
  key: SlotKey;
  car: CarWithBrand;
  variant: CarVariant;
};

function formatSaleYears(variant: CarVariant) {
  if (!variant.saleStartYear && !variant.saleEndYear) return "-";
  if (variant.saleStartYear && variant.saleEndYear) return `${variant.saleStartYear} - ${variant.saleEndYear}`;
  if (variant.saleStartYear) return `${variant.saleStartYear} - current`;
  return `Until ${variant.saleEndYear}`;
}

export function CompareTool({ cars, locale }: { cars: CarWithBrand[]; locale: Locale }) {
  const t = useTranslations("compare");
  const tCar = useTranslations("car");
  const tCommon = useTranslations("common");

  const [slots, setSlots] = useState<Slot[]>([]);
  const [pendingCarId, setPendingCarId] = useState("");
  const [pendingVariantId, setPendingVariantId] = useState("");

  const pendingCar = cars.find((c) => c.id === pendingCarId) ?? null;
  const pendingVariants = pendingCar?.variants ?? [];

  function addSlot() {
    if (!pendingCarId || !pendingVariantId || slots.length >= 3) return;
    const key: SlotKey = `${pendingCarId}::${pendingVariantId}`;
    if (slots.some((s) => s.key === key)) return;
    const car = cars.find((c) => c.id === pendingCarId)!;
    const variant = car.variants.find((v) => v.id === pendingVariantId)!;
    setSlots((prev) => [...prev, { key, car, variant }]);
    setPendingCarId("");
    setPendingVariantId("");
  }

  function removeSlot(key: SlotKey) {
    setSlots((prev) => prev.filter((s) => s.key !== key));
  }

  const rows: { label: string; value: (s: Slot) => string }[] = [
    { label: tCar("variantDetail"), value: (s) => localize(s.variant.detail, locale) },
    { label: tCar("variantStatus"), value: (s) => s.variant.status === "discontinued" ? tCommon("discontinued") : tCommon("onSale") },
    { label: tCar("saleYears"), value: (s) => formatSaleYears(s.variant) },
    {
      label: tCommon("currentPrice"),
      value: (s) => {
        const p = getCurrentPricing(s.variant.pricingPeriods);
        return p ? formatThb(p.priceThb, locale) : "-";
      },
    },
    { label: tCar("range"), value: (s) => `${formatNumber(s.variant.specs?.rangeKm, locale)} km` },
    { label: tCar("battery"), value: (s) => `${s.variant.specs?.batteryKwh ?? "-"} kWh` },
    { label: tCar("batteryType"), value: (s) => s.variant.specs?.batteryType ?? "-" },
    { label: tCar("power"), value: (s) => `${s.variant.specs?.motorHp ?? "-"} hp` },
    { label: tCar("torque"), value: (s) => `${formatNumber(s.variant.specs?.torqueNm, locale)} Nm` },
    { label: tCar("acceleration"), value: (s) => `${s.variant.specs?.zeroToHundredSec ?? "-"} s` },
    { label: tCar("topSpeed"), value: (s) => `${s.variant.specs?.topSpeedKmh ?? "-"} km/h` },
    { label: tCar("drivetrain"), value: (s) => s.variant.specs?.drivetrain ?? "-" },
    { label: tCar("acCharging"), value: (s) => `${s.variant.charging?.acMaxKw ?? "-"} kW` },
    { label: tCar("dcCharging"), value: (s) => `${s.variant.charging?.dcMaxKw ?? "-"} kW` },
    {
      label: "DC 10→80%",
      value: (s) =>
        s.variant.charging?.dcTenToEightyMin ? `${s.variant.charging.dcTenToEightyMin} min` : "-",
    },
    { label: tCar("v2l"), value: (s) => (s.variant.charging?.v2lSupport ? "✓" : "✗") },
    { label: tCar("seats"), value: (s) => `${s.variant.specs?.seating ?? "-"}` },
    { label: tCar("cargo"), value: (s) => `${s.variant.specs?.cargoL ?? "-"} L` },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <p className="mb-2 text-sm font-semibold">{t("addCar")}</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Select
              value={pendingCarId}
              onValueChange={(v) => { setPendingCarId(v ?? ""); setPendingVariantId(""); }}
              disabled={slots.length >= 3}
            >
              <SelectTrigger className="w-full sm:w-52">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {cars.map((car) => (
                  <SelectItem key={car.id} value={car.id}>
                    {localize(car.brand.name, locale)} {localize(car.name, locale)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={pendingVariantId}
              onValueChange={(v) => setPendingVariantId(v ?? "")}
              disabled={!pendingCar || slots.length >= 3}
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                {pendingVariants.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {localize(v.name, locale)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              type="button"
              onClick={addSlot}
              disabled={!pendingCarId || !pendingVariantId || slots.length >= 3}
            >
              {t("addCar")}
            </Button>
          </div>

          {slots.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {slots.map((s) => (
                <Button
                  key={s.key}
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => removeSlot(s.key)}
                >
                  {localize(s.car.name, locale)} · {localize(s.variant.name, locale)} ×
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {slots.length < 2 ? (
        <Card className="border-dashed">
          <CardContent className="p-6 text-sm text-muted-foreground">{t("empty")}</CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow className="bg-muted/60 hover:bg-muted/60">
                  <TableHead className="w-44">Spec</TableHead>
                  {slots.map((s) => (
                    <TableHead key={s.key}>
                      <div className="font-semibold">{localize(s.car.name, locale)}</div>
                      <div className="text-xs font-normal text-muted-foreground">
                        {localize(s.variant.name, locale)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-muted-foreground">{tCar("image")}</TableCell>
                  {slots.map((s) => (
                    <TableCell key={s.key}>
                      <div className="relative aspect-[4/3] min-w-36 overflow-hidden rounded-md border border-border bg-muted">
                        <Image src={s.variant.images?.[0] ?? ""} alt={`${localize(s.car.name, locale)} ${localize(s.variant.name, locale)}`} fill className="object-cover" sizes="180px" />
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
                {rows.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell className="font-medium text-muted-foreground">{row.label}</TableCell>
                    {slots.map((s) => (
                      <TableCell key={s.key} className="whitespace-pre-line font-semibold">
                        {row.value(s)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}
