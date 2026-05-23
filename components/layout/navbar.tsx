import {CarFront} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {NavLinks} from "./nav-links";
import {LanguageSwitcher} from "./language-switcher";

export async function Navbar() {
  const t = await getTranslations("nav");
  const items = [
    {href: "/brands", label: t("brands")},
    {href: "/cars", label: t("cars")},
    {href: "/compare", label: t("compare")},
    {href: "/faq", label: t("faq")},
    {href: "/references", label: t("references")}
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-subtle">
            <CarFront className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate">ThaiEVCars</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLinks items={items} />
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
        <NavLinks items={items} mobile />
      </nav>
    </header>
  );
}
