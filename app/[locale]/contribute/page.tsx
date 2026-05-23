import {Mail} from "lucide-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import type {Metadata} from "next";
import type {Locale} from "@/i18n/routing";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {buildMetadata} from "@/lib/seo";

const contactEmail = "updates@thaievcars.local";

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params;
  return buildMetadata({
    locale,
    path: "/contribute",
    title: locale === "th" ? "ช่วยอัปเดตข้อมูลรถ EV" : "Contribute EV updates",
    description: locale === "th" ? "ส่งข้อมูลราคา สเปค โปรโมชัน หรือ FAQ รถ EV พร้อมแหล่งอ้างอิงให้ ThaiEVCars" : "Send EV price, spec, promotion, or FAQ updates with sources to ThaiEVCars."
  });
}

export default async function ContributePage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contribute");
  const subject = encodeURIComponent("ThaiEVCars data update");
  const body = encodeURIComponent(
    [
      "Model / Brand:",
      "What changed:",
      "Source URL or proof:",
      "Date checked:",
      "Your note:"
    ].join("\n")
  );

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <InfoPanel
          title={t("why")}
          items={[
            t("items.price"),
            t("items.spec"),
            t("items.owner"),
            t("items.faq")
          ]}
        />
        <InfoPanel
          title={t("source")}
          items={[
            t("sources.official"),
            t("sources.dealer"),
            t("sources.proof")
          ]}
        />
      </div>

      <Card className="mt-8 shadow-panel">
        <CardContent className="p-6">
        <h2 className="text-xl font-bold">{t("send")}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Send the model name, proposed update, source link, and date checked. This is a temporary workflow until the CMS/community features are added.
        </p>
        <a
          href={`mailto:${contactEmail}?subject=${subject}&body=${body}`}
          className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-green-400"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {contactEmail}
        </a>
        </CardContent>
      </Card>
    </section>
  );
}

function InfoPanel({title, items}: {title: string; items: string[]}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
      <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="border-b border-border pb-3 last:border-0 last:pb-0">
            {item}
          </li>
        ))}
      </ul>
      </CardContent>
    </Card>
  );
}
