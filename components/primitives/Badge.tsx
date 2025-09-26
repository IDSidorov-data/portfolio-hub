import * as React from "react";
import clsx from "@/lib/clsx";
import { badgeBaseClass, badgeToneClass, type BadgeTone } from "@/lib/badge";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  size?: "sm" | "md";
  leftIcon?: React.ReactNode;
  as?: "span" | "div";
};

export default function Badge({
  tone = "slate",
  size = "md",
  leftIcon,
  as = "span",
  className,
  children,
  ...rest
}: BadgeProps) {
  const Comp = as as any;
  const sizeCls = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs md:text-sm";

  return (
    <Comp className={clsx(badgeBaseClass, badgeToneClass[tone], sizeCls, className)} {...rest}>
      {leftIcon ? <span aria-hidden className="opacity-90 dark:opacity-80">{leftIcon}</span> : null}
      <span>{children}</span>
    </Comp>
  );
}
