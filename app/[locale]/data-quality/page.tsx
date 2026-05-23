import {setRequestLocale, getTranslations} from "next-intl/server";
import type {Metadata} from "next";
import type {Locale} from "@/i18n/routing";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
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
        <Card className="border-green-200 bg-green-50 text-green-900">
          <CardContent className="p-6">{t("allGood")}</CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow className="bg-muted/60 hover:bg-muted/60">
                <TableHead>Car</TableHead>
                <TableHead>{t("issues")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.rows.map((row) => (
                <TableRow key={row.car.id}>
                  <TableCell className="font-semibold">{localize(row.car.name, locale)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {row.issues.map((issue) => (
                        <Badge key={issue} className="border-amber-200 bg-amber-50 text-amber-900">
                          {issue}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </Card>
      )}
    </section>
  );
}

function Metric({label, value}: {label: string; value: number}) {
  return (
    <Card>
      <CardContent className="p-5">
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
