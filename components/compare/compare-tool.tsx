"use client";

import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import type {Locale} from "@/i18n/routing";
import type {CarWithBrand} from "@/lib/types/ev";
import {formatNumber, formatThb, getCurrentPricing, localize} from "@/lib/format";
import {Button} from "@/components/ui/button";

export function CompareTool({cars, locale}: {cars: CarWithBrand[]; locale: Locale}) {
  const t = useTranslations("compare");
  const [selectedIds, setSelectedIds] = useState<string[]>(cars.slice(0, 2).map((car) => car.id));
  const selectedCars = useMemo(() => selectedIds.map((id) => cars.find((car) => car.id === id)).filter((car): car is CarWithBrand => Boolean(car)), [cars, selectedIds]);
  const remainingCars = cars.filter((car) => !selectedIds.includes(car.id));

  function addCar(id: string) {
    if (!id || selectedIds.length >= 3) return;
    setSelectedIds((current) => [...current, id]);
  }

  function removeCar(id: string) {
    setSelectedIds((current) => current.filter((item) => item !== id));
  }

  const rows = [
    {label: "Price", value: (car: CarWithBrand) => formatThb(getCurrentPricing(car.pricingPeriods)?.priceThb ?? 0, locale)},
    {label: "Range", value: (car: CarWithBrand) => `${formatNumber(car.specs.rangeKm, locale)} km`},
    {label: "Battery", value: (car: CarWithBrand) => `${car.specs.batteryKwh} kWh`},
    {label: "Power", value: (car: CarWithBrand) => `${car.specs.motorKw} kW`},
    {label: "Torque", value: (car: CarWithBrand) => `${formatNumber(car.specs.torqueNm, locale)} Nm`},
    {label: "0-100", value: (car: CarWithBrand) => `${car.specs.zeroToHundredSec} s`},
    {label: "DC charging", value: (car: CarWithBrand) => `${car.charging.dcMaxKw} kW`},
    {label: "Drivetrain", value: (car: CarWithBrand) => car.specs.drivetrain}
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-white p-4">
        <label className="text-sm font-semibold" htmlFor="add-car">
          {t("addCar")}
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <select
            id="add-car"
            className="h-10 rounded-md border border-border bg-white px-3 text-sm"
            value=""
            disabled={selectedIds.length >= 3}
            onChange={(event) => addCar(event.target.value)}
          >
            <option value="">Select model</option>
            {remainingCars.map((car) => (
              <option key={car.id} value={car.id}>
                {localize(car.brand.name, locale)} {localize(car.name, locale)}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2">
            {selectedCars.map((car) => (
              <Button key={car.id} type="button" variant="secondary" onClick={() => removeCar(car.id)}>
                {localize(car.name, locale)} x
              </Button>
            ))}
          </div>
        </div>
      </div>

      {selectedCars.length < 2 ? (
        <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-white">
          <table className="min-w-[720px] w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60">
                <th className="w-44 p-4 text-left font-semibold">Spec</th>
                {selectedCars.map((car) => (
                  <th key={car.id} className="p-4 text-left font-semibold">
                    {localize(car.name, locale)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium text-muted-foreground">{row.label}</td>
                  {selectedCars.map((car) => (
                    <td key={car.id} className="p-4 font-semibold">
                      {row.value(car)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
