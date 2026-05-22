import type {ComponentProps} from "react";
import {Link} from "@/i18n/navigation";
import {cn} from "@/lib/utils";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function LinkButton({className, variant = "primary", ...props}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-green-400",
        variant === "secondary" && "border border-border bg-white text-foreground hover:bg-muted",
        variant === "ghost" && "text-foreground hover:bg-muted",
        className
      )}
      {...props}
    />
  );
}
