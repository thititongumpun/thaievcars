import {brands, models} from "./seed";
import type {Brand} from "@/lib/types/ev";

export async function getBrands(): Promise<Array<Brand & {modelCount: number}>> {
  return brands.map((brand) => ({
    ...brand,
    modelCount: models.filter((model) => model.brandId === brand.id).length
  }));
}

export async function getFeaturedBrands() {
  const allBrands = await getBrands();
  return allBrands.filter((brand) => brand.featured);
}

export async function getBrandBySlug(slug: string) {
  const allBrands = await getBrands();
  return allBrands.find((brand) => brand.slug === slug);
}

export async function getModelsByBrandSlug(slug: string) {
  const brand = brands.find((item) => item.slug === slug);
  if (!brand) return [];

  return models.filter((model) => model.brandId === brand.id);
}
