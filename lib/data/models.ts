import {brands, faqItems, models} from "./seed";
import type {CarWithBrand} from "@/lib/types/ev";
import {fetchSanity} from "@/lib/sanity/fetch";
import {carBySlugQuery, carsQuery, faqItemsQuery} from "@/lib/sanity/queries";
import {normalizeCar, normalizeFAQItem} from "@/lib/sanity/normalize";
import type {FAQItem} from "@/lib/types/ev";

function withBrand(modelId: string): CarWithBrand | undefined {
  const model = models.find((item) => item.id === modelId || item.slug === modelId);
  if (!model) return undefined;

  const brand = brands.find((item) => item.id === model.brandId);
  if (!brand) return undefined;

  return {...model, brand} as CarWithBrand;
}

export async function getModels(): Promise<CarWithBrand[]> {
  const sanityModels = await fetchSanity<CarWithBrand[]>(carsQuery, {}, ["sanity", "cars", "brands"]);
  if (sanityModels?.length) {
    return sanityModels.map(normalizeCar);
  }

  return models
    .map((model) => withBrand(model.id))
    .filter((model): model is CarWithBrand => Boolean(model))
    .map(normalizeCar);
}

export async function getModelBySlug(slug: string): Promise<CarWithBrand | undefined> {
  const sanityModel = await fetchSanity<CarWithBrand | null>(carBySlugQuery, {slug}, ["sanity", "cars", `car:${slug}`]);
  if (sanityModel) {
    return normalizeCar(sanityModel);
  }

  const model = withBrand(slug);
  return model ? normalizeCar(model) : undefined;
}

export async function getNewArrivalModels(): Promise<CarWithBrand[]> {
  const allModels = await getModels();
  return allModels.slice(0, 6);
}

export async function getRelatedModels(modelId: string): Promise<CarWithBrand[]> {
  const current = await getModelBySlug(modelId);
  if (!current) return [];

  const allModels = await getModels();
  return allModels.filter((model) => model.brandId === current.brandId && model.id !== current.id);
}

export async function getFAQItemsForModel(modelId: string) {
  const sanityItems = await fetchSanity<FAQItem[]>(faqItemsQuery, {}, ["sanity", "faq", "cars"]);
  if (sanityItems?.length) {
    return sanityItems.map(normalizeFAQItem).filter((item) => item.relatedCarId === modelId);
  }

  return faqItems.filter((item) => item.relatedCarId === modelId);
}
