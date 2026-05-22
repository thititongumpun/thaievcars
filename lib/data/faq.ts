import {faqCategories, faqItems} from "./seed";

export async function getFAQCategories() {
  return [...faqCategories].sort((a, b) => a.order - b.order);
}

export async function getFAQItems() {
  return faqItems;
}
