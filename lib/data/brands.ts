import {brands, models} from "./seed";
import type {Brand, CarWithBrand} from "@/lib/types/ev";
import {fetchSanity} from "@/lib/sanity/fetch";
import {brandBySlugQuery, brandsQuery, carsByBrandSlugQuery, carsQuery, featuredBrandsQuery} from "@/lib/sanity/queries";
import {normalizeBrand, normalizeCar} from "@/lib/sanity/normalize";

export async function getBrands(): Promise<Array<Brand & {modelCount: number}>> {
  const sanityBrands = await fetchSanity<Brand[]>(brandsQuery, {}, ["sanity", "brands"]);
  if (sanityBrands?.length) {
    const sanityCars = (await fetchSanity<CarWithBrand[]>(carsQuery, {}, ["sanity", "cars", "brands"])) ?? [];
    return sanityBrands.map(normalizeBrand).map((brand) => ({
      ...brand,
      modelCount: sanityCars.filter((model) => model.brandId === brand.id).length
    }));
  }

  return brands.map((brand) => ({
    ...brand,
    modelCount: models.filter((model) => model.brandId === brand.id).length
  }));
}

export async function getFeaturedBrands() {
  const sanityBrands = await fetchSanity<Brand[]>(featuredBrandsQuery, {}, ["sanity", "brands"]);
  if (sanityBrands?.length) {
    const brandsWithCounts = await getBrands();
    return sanityBrands.map(normalizeBrand).map((brand) => ({
      ...brand,
      modelCount: brandsWithCounts.find((item) => item.id === brand.id)?.modelCount ?? 0
    }));
  }

  const allBrands = await getBrands();
  return allBrands.filter((brand) => brand.featured);
}

export async function getBrandBySlug(slug: string) {
  const sanityBrand = await fetchSanity<Brand | null>(brandBySlugQuery, {slug}, ["sanity", "brands", `brand:${slug}`]);
  if (sanityBrand) {
    const brandsWithCounts = await getBrands();
    return {
      ...normalizeBrand(sanityBrand),
      modelCount: brandsWithCounts.find((brand) => brand.id === sanityBrand.id)?.modelCount ?? 0
    };
  }

  const allBrands = await getBrands();
  return allBrands.find((brand) => brand.slug === slug);
}

export async function getModelsByBrandSlug(slug: string) {
  const sanityModels = await fetchSanity<CarWithBrand[]>(carsByBrandSlugQuery, {slug}, ["sanity", "cars", "brands", `brand:${slug}`]);
  if (sanityModels?.length) {
    return sanityModels.map(normalizeCar);
  }

  const brand = brands.find((item) => item.slug === slug);
  if (!brand) return [];

  return models.filter((model) => model.brandId === brand.id);
}
