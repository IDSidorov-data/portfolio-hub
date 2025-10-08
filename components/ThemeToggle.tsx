"use client";
import { useTheme } from "next-themes";
import {
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
} from "react";

import clsx from "@/lib/clsx";

type ThemeToggleProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ThemeToggle({
  className = "",
  onClick,
  "aria-label": ariaLabel,
  ...rest
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const label = ariaLabel ?? "Переключить тему";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const isDark = resolvedTheme === "dark";
    setTheme(isDark ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  const baseClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent bg-transparent text-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent))]";

  if (!mounted) {
    return (
      <button
        type="button"
        className={clsx(baseClass, className)}
        aria-label={label}
        aria-hidden="true"
        tabIndex={-1}
        {...rest}
      >
        <span aria-hidden>☀️</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(baseClass, className)}
      aria-label={label}
      aria-pressed={isDark}
      data-state={isDark ? "dark" : "light"}
      {...rest}
    >
      <span aria-hidden>{isDark ? "🌙" : "☀️"}</span>
    </button>
  );
}
