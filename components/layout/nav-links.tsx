"use client";

import {Link, usePathname} from "@/i18n/navigation";
import {cn} from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
};

export function NavLinks({items, mobile = false}: {items: NavItem[]; mobile?: boolean}) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition",
              mobile && "whitespace-nowrap",
              active ? "bg-primary/10 text-primary ring-1 ring-primary/20" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
