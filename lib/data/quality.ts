import {getModels} from "./models";
import type {CarWithBrand} from "@/lib/types/ev";

export type CarQualityIssue = {
  car: CarWithBrand;
  issues: string[];
  daysSinceVerified: number;
};

const staleDays = 60;
const referenceDate = new Date("2026-05-23T00:00:00.000Z");

export async function getDataQualityReport() {
  const cars = await getModels();
  const rows = cars.map((car) => {
    const verifiedAt = new Date(`${car.lastVerifiedAt}T00:00:00.000Z`);
    const daysSinceVerified = Math.floor((referenceDate.getTime() - verifiedAt.getTime()) / 86400000);
    const issues: string[] = [];

    if (car.sourceUrls.length === 0 || !car.officialPriceUrl) {
      issues.push("missing source URL");
    }

    if (daysSinceVerified > staleDays) {
      issues.push(`not verified in ${staleDays}+ days`);
    }

    const firstVariant = car.variants?.[0];
    if (!firstVariant?.specs?.rangeKm || !firstVariant?.specs?.batteryKwh || !firstVariant?.charging?.dcMaxKw || !car.warranty.batteryYears) {
      issues.push("missing key specs");
    }

    if (car.sourceConfidence === "needs-verification") {
      issues.push("marked needs verification");
    }

    return {car, issues, daysSinceVerified};
  });

  const problemRows = rows.filter((row) => row.issues.length > 0);

  return {
    totalCars: cars.length,
    missingSources: rows.filter((row) => row.car.sourceUrls.length === 0 || !row.car.officialPriceUrl).length,
    staleCars: rows.filter((row) => row.daysSinceVerified > staleDays).length,
    missingSpecs: rows.filter((row) => !row.car.variants?.[0]?.specs?.rangeKm || !row.car.variants?.[0]?.specs?.batteryKwh || !row.car.variants?.[0]?.charging?.dcMaxKw || !row.car.warranty.batteryYears).length,
    rows: problemRows
  };
}
