import * as React from "react";

export type CardVariant = "default" | "soft" | "plain";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

export default function Card({ className = "", variant = "soft", ...rest }: CardProps) {
  const base =
    "rounded-2xl border border-slate-900/10 shadow-sm transition-shadow md:hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 p-4 sm:p-5 md:p-6 overflow-hidden";

  let look = "";

  switch (variant) {
    case "soft":
      look = "bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/40 dark:to-slate-900/20";
      break;
    case "default":
      look = "bg-white dark:bg-slate-900/30";
      break;
    case "plain":
      look = "";
      break;
    default:
      look = "bg-white dark:bg-slate-900/30";
  }

  return <div className={`${base} ${look} ${className}`} {...rest} />;
}
