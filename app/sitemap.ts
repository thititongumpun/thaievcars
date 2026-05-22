import type {MetadataRoute} from "next";
import {getBrands} from "@/lib/data/brands";
import {getModels} from "@/lib/data/models";
import {absoluteUrl} from "@/lib/seo";

const staticPaths = ["/", "/brands", "/cars", "/compare", "/faq", "/references", "/contribute"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [brands, cars] = await Promise.all([getBrands(), getModels()]);
  const paths = [
    ...staticPaths,
    ...brands.map((brand) => `/brands/${brand.slug}`),
    ...cars.map((car) => `/cars/${car.slug}`)
  ];

  return paths.flatMap((path) => [
    {
      url: absoluteUrl(path, "th"),
      lastModified: new Date(),
      changeFrequency: path.startsWith("/cars/") ? "weekly" : "daily",
      priority: path === "/" ? 1 : path.startsWith("/cars/") ? 0.8 : 0.7,
      alternates: {
        languages: {
          th: absoluteUrl(path, "th"),
          en: absoluteUrl(path, "en")
        }
      }
    },
    {
      url: absoluteUrl(path, "en"),
      lastModified: new Date(),
      changeFrequency: path.startsWith("/cars/") ? "weekly" : "daily",
      priority: path === "/" ? 0.9 : path.startsWith("/cars/") ? 0.7 : 0.6,
      alternates: {
        languages: {
          th: absoluteUrl(path, "th"),
          en: absoluteUrl(path, "en")
        }
      }
    }
  ]);
}
