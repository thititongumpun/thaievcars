import {ShieldCheck, ShieldQuestion, Store, Users} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Badge} from "@/components/ui/badge";
import type {SourceConfidence} from "@/lib/types/ev";

export async function TrustBadge({confidence}: {confidence: SourceConfidence}) {
  const t = await getTranslations("trust");
  const Icon = confidence === "official" ? ShieldCheck : confidence === "dealer" ? Store : confidence === "community" ? Users : ShieldQuestion;

  return (
    <Badge className={confidence === "official" ? "border-green-200 bg-green-50 text-green-800" : "border-amber-200 bg-amber-50 text-amber-900"}>
      <Icon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
      {t(confidence)}
    </Badge>
  );
}
