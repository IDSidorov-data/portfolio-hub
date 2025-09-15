import Link from "next/link";
import { ComponentProps } from "react";

type Props = {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
} & ComponentProps<"button">;

export default function Button({ variant = "primary", href, className = "", children, ...rest }: Props) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition focus:outline-none";
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
    ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100"
  }[variant];

  if (href) {
    const external = href.startsWith("http");
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
        <span className={`${base} ${styles} ${className}`}>{children}</span>
      </a>
    ) : (
      <Link href={href} className="no-underline">
        <span className={`${base} ${styles} ${className}`}>{children}</span>
      </Link>
    );
  }

  return <button className={`${base} ${styles} ${className}`} {...rest}>{children}</button>;
}