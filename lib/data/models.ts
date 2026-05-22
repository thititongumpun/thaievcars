import {brands, faqItems, models} from "./seed";
import type {CarWithBrand} from "@/lib/types/ev";

function withBrand(modelId: string): CarWithBrand | undefined {
  const model = models.find((item) => item.id === modelId || item.slug === modelId);
  if (!model) return undefined;

  const brand = brands.find((item) => item.id === model.brandId);
  if (!brand) return undefined;

  return {...model, brand};
}

export async function getModels(): Promise<CarWithBrand[]> {
  return models
    .map((model) => withBrand(model.id))
    .filter((model): model is CarWithBrand => Boolean(model));
}

export async function getModelBySlug(slug: string): Promise<CarWithBrand | undefined> {
  return withBrand(slug);
}

export async function getNewArrivalModels(): Promise<CarWithBrand[]> {
  const allModels = await getModels();
  return allModels.filter((model) => model.isNewArrival);
}

export async function getRelatedModels(modelId: string): Promise<CarWithBrand[]> {
  const current = await getModelBySlug(modelId);
  if (!current) return [];

  const allModels = await getModels();
  return allModels.filter((model) => model.brandId === current.brandId && model.id !== current.id);
}

export async function getFAQItemsForModel(modelId: string) {
  return faqItems.filter((item) => item.relatedCarId === modelId);
}
