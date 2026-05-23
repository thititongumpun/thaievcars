import {getModels} from "./models";
import type {CarWithBrand} from "@/lib/types/ev";

export type CarQualityIssue = {
  car: CarWithBrand;
  issues: string[];
};

export async function getDataQualityReport() {
  const cars = await getModels();
  const rows = cars.map((car) => {
    const issues: string[] = [];

    const firstVariant = car.variants?.[0];
    if (!firstVariant) {
      issues.push("missing variant");
    }

    if (!firstVariant?.images?.length) {
      issues.push("missing variant image");
    }

    if (!firstVariant?.specs?.rangeKm || !firstVariant?.specs?.batteryKwh || !firstVariant?.charging?.dcMaxKw) {
      issues.push("missing key specs");
    }

    return {car, issues};
  });

  const problemRows = rows.filter((row) => row.issues.length > 0);

  return {
    totalCars: cars.length,
    missingSources: 0,
    staleCars: 0,
    missingSpecs: rows.filter((row) => !row.car.variants?.[0]?.specs?.rangeKm || !row.car.variants?.[0]?.specs?.batteryKwh || !row.car.variants?.[0]?.charging?.dcMaxKw).length,
    rows: problemRows
  };
}
