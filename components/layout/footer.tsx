import {Link} from "@/i18n/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <p className="font-semibold text-foreground">ThaiEVCars</p>
        <p>Community-first EV reference for Thailand. Phase 1 uses sample data and is ready for a CMS-backed data layer later.</p>
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
