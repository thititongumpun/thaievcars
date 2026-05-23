import { Link } from "@/i18n/navigation";
import { getTranslations} from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <p className="font-semibold text-foreground">Thai EV Cars</p>
        <p>{t("description")}</p>
        <div className="mt-2 flex flex-wrap gap-4">
          <Link href="/contribute" className="font-semibold text-green-700 hover:text-green-800">
            Contribute updates
          </Link>
          <Link href="/references" className="font-semibold text-green-700 hover:text-green-800">
            References
          </Link>
          <Link href="/data-quality" className="font-semibold text-green-700 hover:text-green-800">
            Data quality
          </Link>
        </div>
      </div>
    </footer>
  );
}
