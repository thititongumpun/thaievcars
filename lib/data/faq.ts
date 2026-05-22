import {faqCategories, faqItems} from "./seed";
import {fetchSanity} from "@/lib/sanity/fetch";
import {faqCategoriesQuery, faqItemsQuery} from "@/lib/sanity/queries";
import {normalizeFAQCategory, normalizeFAQItem} from "@/lib/sanity/normalize";
import type {FAQCategory, FAQItem} from "@/lib/types/ev";

export async function getFAQCategories() {
  const sanityCategories = await fetchSanity<FAQCategory[]>(faqCategoriesQuery, {}, ["sanity", "faq"]);
  if (sanityCategories?.length) {
    return sanityCategories.map(normalizeFAQCategory).sort((a, b) => a.order - b.order);
  }

  return [...faqCategories].sort((a, b) => a.order - b.order);
}

export async function getFAQItems() {
  const sanityItems = await fetchSanity<FAQItem[]>(faqItemsQuery, {}, ["sanity", "faq"]);
  if (sanityItems?.length) {
    return sanityItems.map(normalizeFAQItem);
  }

  return faqItems;
}
