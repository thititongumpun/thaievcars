"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { CarWithBrand } from "@/lib/types/ev";
import { formatNumber, formatThb, getStartingPrice, localize } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function CompareTool({ cars, locale }: { cars: CarWithBrand[]; locale: Locale }) {
  const t = useTranslations("compare");
  const [selectedIds, setSelectedIds] = useState<string[]>(cars.slice(0, 2).map((car) => car.id));
  const [addValue, setAddValue] = useState("");
  const selectedCars = useMemo(() => selectedIds.map((id) => cars.find((car) => car.id === id)).filter((car): car is CarWithBrand => Boolean(car)), [cars, selectedIds]);
  const remainingCars = cars.filter((car) => !selectedIds.includes(car.id));

  function addCar(id: string) {
    if (!id || selectedIds.length >= 3) return;
    setSelectedIds((current) => [...current, id]);
    setAddValue("");
  }

  function removeCar(id: string) {
    setSelectedIds((current) => current.filter((item) => item !== id));
  }

  const rows = [
    { label: "Price", value: (car: CarWithBrand) => formatThb(getStartingPrice(car) ?? 0, locale) },
    { label: "Range", value: (car: CarWithBrand) => `${formatNumber(car.variants?.[0]?.specs?.rangeKm, locale)} km` },
    { label: "Battery", value: (car: CarWithBrand) => `${car.variants?.[0]?.specs?.batteryKwh ?? "-"} kWh` },
    { label: "Power", value: (car: CarWithBrand) => `${car.variants?.[0]?.specs?.motorKw ?? "-"} kW` },
    { label: "Torque", value: (car: CarWithBrand) => `${formatNumber(car.variants?.[0]?.specs?.torqueNm, locale)} Nm` },
    { label: "0-100", value: (car: CarWithBrand) => `${car.variants?.[0]?.specs?.zeroToHundredSec ?? "-"} s` },
    { label: "DC charging", value: (car: CarWithBrand) => `${car.variants?.[0]?.charging?.dcMaxKw ?? "-"} kW` },
    { label: "Drivetrain", value: (car: CarWithBrand) => car.variants?.[0]?.specs?.drivetrain ?? "-" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <label className="text-sm font-semibold" htmlFor="add-car">
            {t("addCar")}
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <Select value={addValue} onValueChange={(value) => addCar(value ?? "")} disabled={selectedIds.length >= 3}>
              <SelectTrigger id="add-car" className="w-full sm:w-80">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {remainingCars.map((car) => (
                  <SelectItem key={car.id} value={car.id}>
                    {localize(car.brand.name, locale)} {localize(car.name, locale)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2">
              {selectedCars.map((car) => (
                <Button key={car.id} type="button" variant="secondary" onClick={() => removeCar(car.id)}>
                  {localize(car.name, locale)} x
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedCars.length < 2 ? (
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
                  {selectedCars.map((car) => (
                    <TableHead key={car.id}>
                      {localize(car.name, locale)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell className="font-medium text-muted-foreground">{row.label}</TableCell>
                    {selectedCars.map((car) => (
                      <TableCell key={car.id} className="font-semibold">
                        {row.value(car)}
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
