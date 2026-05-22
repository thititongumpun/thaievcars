import {setRequestLocale, getTranslations} from "next-intl/server";
import type {Metadata} from "next";
import type {Locale} from "@/i18n/routing";
import {Badge} from "@/components/ui/badge";
import {getDataQualityReport} from "@/lib/data/quality";
import {localize} from "@/lib/format";
import {buildMetadata} from "@/lib/seo";

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params;
  return buildMetadata({
    locale,
    path: "/data-quality",
    title: "Data quality",
    description: "Internal data quality report for ThaiEVCars content.",
    noIndex: true
  });
}

export default async function DataQualityPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dataQuality");
  const report = await getDataQualityReport();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Metric label={t("totalCars")} value={report.totalCars} />
        <Metric label={t("missingSources")} value={report.missingSources} />
        <Metric label={t("staleCars")} value={report.staleCars} />
        <Metric label={t("missingSpecs")} value={report.missingSpecs} />
      </div>

      {report.rows.length === 0 ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-900">{t("allGood")}</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-white">
          <table className="min-w-[760px] w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60">
                <th className="p-4 text-left font-semibold">Car</th>
                <th className="p-4 text-left font-semibold">{t("lastChecked")}</th>
                <th className="p-4 text-left font-semibold">{t("issues")}</th>
              </tr>
            </thead>
            <tbody>
              {report.rows.map((row) => (
                <tr key={row.car.id} className="border-b border-border last:border-0">
                  <td className="p-4 font-semibold">{localize(row.car.name, locale)}</td>
                  <td className="p-4 text-muted-foreground">{row.car.lastVerifiedAt}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {row.issues.map((issue) => (
                        <Badge key={issue} className="border-amber-200 bg-amber-50 text-amber-900">
                          {issue}
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Metric({label, value}: {label: string; value: number}) {
  return (
    <div className="rounded-lg border border-border bg-white p-5 shadow-subtle">
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
