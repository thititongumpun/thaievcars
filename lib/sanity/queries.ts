export const brandProjection = `{
  "id": _id,
  name,
  "slug": slug.current,
  "logoText": coalesce(logoText, name.en),
  "logoUrl": logo.asset->url,
  country,
  description,
  websiteUrl,
  "featured": coalesce(featured, false)
}`;

export const carProjection = `{
  "id": _id,
  name,
  "slug": slug.current,
  "brandId": brand->_id,
  "brand": brand->${brandProjection},
  year,
  "images": select(count(images) > 0 => images[].asset->url, externalImageUrls),
  "spinImages": select(count(spinImages) > 0 => spinImages[].asset->url, externalSpinImageUrls),
  shortDescription,
  status,
  "isNewArrival": coalesce(isNewArrival, false),
  bodyType,
  specs,
  charging,
  wheelsExterior,
  pricingPeriods,
  "sourceUrls": coalesce(sourceUrls, []),
  officialPriceUrl,
  sourceConfidence,
  lastVerifiedAt,
  lastUpdatedBy,
  warranty
}`;

export const brandsQuery = `*[_type == "brand"] | order(name.en asc) ${brandProjection}`;
export const featuredBrandsQuery = `*[_type == "brand" && featured == true] | order(name.en asc) ${brandProjection}`;
export const brandBySlugQuery = `*[_type == "brand" && slug.current == $slug][0] ${brandProjection}`;
export const carsQuery = `*[_type == "carModel"] | order(brand->name.en asc, name.en asc) ${carProjection}`;
export const carBySlugQuery = `*[_type == "carModel" && slug.current == $slug][0] ${carProjection}`;
export const carsByBrandSlugQuery = `*[_type == "carModel" && brand->slug.current == $slug] | order(name.en asc) ${carProjection}`;
export const faqCategoriesQuery = `*[_type == "faqCategory"] | order(order asc, name.en asc) {
  "id": _id,
  name,
  "slug": slug.current,
  order
}`;
export const faqItemsQuery = `*[_type == "faqItem"] | order(question.en asc) {
  "id": _id,
  question,
  answer,
  "categoryId": category->_id,
  "relatedCarId": relatedCar->_id
}`;
export const referenceSourcesQuery = `*[_type == "referenceSource"] | order(category asc, title.en asc) {
  "id": _id,
  title,
  description,
  url,
  category,
  checkedAt
}`;
