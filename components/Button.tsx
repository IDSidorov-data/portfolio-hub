import React from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "accent";

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
  target?: string; // важно для внешних ссылок
  rel?: string; // важно для внешних ссылок
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
} &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  variant = "primary",
  href,
  className = "",
  children,
  target,
  rel,
  onClick,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  // Используем ваши CSS-переменные
  const styles =
    {
      primary:
        "bg-[rgb(var(--foreground))] text-[rgb(var(--background))] hover:opacity-90 shadow-sm hover:shadow focus-visible:outline-[rgb(var(--accent))]",
      secondary:
        "border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] focus-visible:outline-[rgb(var(--accent))]",
      ghost:
        "bg-transparent text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] focus-visible:outline-[rgb(var(--accent))]",
      accent:
        "bg-[rgb(var(--accent))] text-[rgb(var(--accent-foreground))] hover:opacity-90 shadow-sm hover:shadow focus-visible:outline-[rgb(var(--accent))]",
    }[variant] || "";

  const cls = `${base} ${styles} ${className}`.trim();

  if (href) {
    const { type: _buttonType, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link
        href={href}
        className={cls}
        target={target}
        rel={rel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...anchorRest}
      >
        {children}
      </Link>
    );
  }

  const { type, ...buttonRest } = rest;

  return (
    <button
      type={type ?? 'button'}
      className={cls}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
