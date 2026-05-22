import {getTranslations, setRequestLocale} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {Link} from "@/i18n/navigation";
import {getFAQCategories, getFAQItems} from "@/lib/data/faq";
import {getModels} from "@/lib/data/models";
import {localize} from "@/lib/format";

export default async function FAQPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const categories = await getFAQCategories();
  const items = await getFAQItems();
  const models = await getModels();

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      </div>
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryItems = items.filter((item) => item.categoryId === category.id);
          return (
            <section key={category.id}>
              <h2 className="mb-3 text-xl font-bold">{localize(category.name, locale)}</h2>
              <div className="space-y-3">
                {categoryItems.map((item) => {
                  const relatedCar = item.relatedCarId ? models.find((model) => model.id === item.relatedCarId) : undefined;
                  return (
                    <article key={item.id} className="rounded-lg border border-border bg-white p-5">
                      <h3 className="font-semibold">{localize(item.question, locale)}</h3>
                      <p className="mt-2 leading-7 text-muted-foreground">{localize(item.answer, locale)}</p>
                      {relatedCar ? (
                        <Link href={`/cars/${relatedCar.slug}`} className="mt-3 inline-flex text-sm font-semibold text-green-700 hover:text-green-800">
                          {localize(relatedCar.name, locale)}
                        </Link>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
