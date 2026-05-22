import {ExternalLink} from "lucide-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import type {Metadata} from "next";
import type {Locale} from "@/i18n/routing";
import {Badge} from "@/components/ui/badge";
import {getReferenceSources, type ReferenceSource} from "@/lib/data/references";
import {localize} from "@/lib/format";
import {buildMetadata} from "@/lib/seo";

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params;
  return buildMetadata({
    locale,
    path: "/references",
    title: locale === "th" ? "แหล่งอ้างอิงรถ EV" : "EV reference sources",
    description: locale === "th" ? "แหล่งอ้างอิงทางการสำหรับตรวจสอบราคา สเปค โปรโมชัน และข้อมูลรถ EV ในไทย" : "Official reference sources for checking EV prices, specs, promotions, and information in Thailand."
  });
}

export default async function ReferencesPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("references");
  const sources = await getReferenceSources();
  const official = sources.filter((source) => source.category === "official");
  const tools = sources.filter((source) => source.category === "tools");

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        {t("disclaimer")}
      </div>

      <ReferenceGroup title={t("official")} sources={official} locale={locale} checkedLabel={t("checked")} openLabel={t("open")} />
      <ReferenceGroup title={t("tools")} sources={tools} locale={locale} checkedLabel={t("checked")} openLabel={t("open")} className="mt-10" />
    </section>
  );
}

function ReferenceGroup({
  title,
  sources,
  locale,
  checkedLabel,
  openLabel,
  className
}: {
  title: string;
  sources: ReferenceSource[];
  locale: Locale;
  checkedLabel: string;
  openLabel: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sources.map((source) => (
          <article key={source.id} className="flex min-h-56 flex-col rounded-lg border border-border bg-white p-5 shadow-subtle">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge>{new URL(source.url).hostname}</Badge>
              <Badge>{checkedLabel}: {source.checkedAt}</Badge>
            </div>
            <h3 className="text-lg font-semibold">{localize(source.title, locale)}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{localize(source.description, locale)}</p>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
            >
              {openLabel}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
