import React from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ variant = "primary", href, className = "", children, ...rest }: Props) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    {
      primary: "bg-foreground text-background hover:opacity-90",
      secondary: "border border-border bg-card text-foreground hover:bg-muted",
      ghost: "bg-transparent text-foreground ring-1 ring-transparent hover:bg-muted focus-visible:ring-border",
    }[variant] || "";

  const cls = `${base} ${styles} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}