import {brand} from "./brand";
import {carModel} from "./carModel";
import {colorOption} from "./colorOption";
import {faqCategory, faqItem} from "./faq";
import {localizedString} from "./localizedString";
import {pricingPeriod} from "./pricingPeriod";
import {referenceSource} from "./referenceSource";

export const schemaTypes = [
  localizedString,
  colorOption,
  pricingPeriod,
  brand,
  carModel,
  faqCategory,
  faqItem,
  referenceSource
];
