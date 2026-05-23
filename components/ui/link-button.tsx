import type {ComponentProps} from "react";
import {Link} from "@/i18n/navigation";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
};

export function LinkButton({className, variant = "default", size = "lg", ...props}: LinkButtonProps) {
  return <Link className={cn(buttonVariants({variant, size}), className)} {...props} />;
}
