import type {Locale} from "@/i18n/routing";

export type LocalizedString = Record<Locale, string>;

export type Brand = {
  id: string;
  name: LocalizedString;
  slug: string;
  logoText: string;
  logoUrl?: string;
  country: LocalizedString;
  description: LocalizedString;
  websiteUrl: string;
  featured: boolean;
};

export type CarStatus = "on-sale" | "discontinued";
export type Drivetrain = "FWD" | "RWD" | "AWD";
export type BodyType = "hatchback" | "sedan" | "suv" | "mpv" | "pickup";
export type SourceConfidence = "official" | "dealer" | "community" | "needs-verification";

export type CarSpecs = {
  rangeKm: number;
  batteryKwh: number;
  batteryType?: string;
  motorHp: number;
  torqueNm: number;
  zeroToHundredSec: number;
  topSpeedKmh: number;
  drivetrain: Drivetrain;
  seating: number;
  cargoL: number;
  weightKg: number;
  dimensions: {
    lengthMm: number;
    widthMm: number;
    heightMm: number;
  };
  ipRating: string;
  frontSuspension?: string;
  rearSuspension?: string;
};

export type Charging = {
  acMaxKw: number;
  dcMaxKw: number;
  dcTenToEightyMin: number;
  connectorTypes: string[];
  v2lSupport: boolean;
  homeChargerRequired: boolean;
};

export type WheelsExterior = {
  wheelSizeInch: number;
  tireSize: string;
  availableColors: Array<{
    name: LocalizedString;
    hex: string;
  }>;
  sunroofType: LocalizedString;
};

export type PricingPeriod = {
  label: LocalizedString;
  startDate: string;
  endDate: string | null;
  priceThb: number;
  discountThb: number;
  notes: LocalizedString;
};

export type VariantFAQItem = {
  question: LocalizedString;
  answer: LocalizedString;
};

export type CarVariant = {
  id: string;
  name: LocalizedString;
  images?: string[];
  detail?: LocalizedString;
  saleStartYear?: number;
  saleEndYear?: number | null;
  status?: CarStatus;
  wheelsExterior?: WheelsExterior;
  specs: CarSpecs;
  charging: Charging;
  pricingPeriods: PricingPeriod[];
  faqItems?: VariantFAQItem[];
};

export type CarModel = {
  id: string;
  name: LocalizedString;
  slug: string;
  brandId: string;
  shortDescription: LocalizedString;
  bodyType: BodyType;
  variants: CarVariant[];
};

export type FAQCategory = {
  id: string;
  name: LocalizedString;
  slug: string;
  order: number;
};

export type FAQItem = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  categoryId: string;
  relatedCarId?: string;
};

export type CarWithBrand = CarModel & {
  brand: Brand;
};
