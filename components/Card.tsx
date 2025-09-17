import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "soft";
};

export default function Card({
  className = "",
  variant = "soft",
  children,
  ...rest
}: CardProps) {
  const base =
    "rounded-2xl border border-border shadow-sm transition-shadow hover:shadow-md p-4 sm:p-6";
  const look =
    variant === "soft"
      ? "bg-card-soft text-card-soft"      // мягкий фон
      : "bg-card text-card-foreground";    // обычный

  return (
    <div {...rest} className={`${base} ${look} ${className}`}>
      {children}
    </div>
  );
}
