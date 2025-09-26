"use client";

import { useRouter } from "next/navigation";

import { sendEvent } from "@/lib/analytics";
import clsx from "@/lib/clsx";

type BackButtonProps = {
  caseId?: string;
  className?: string;
};

export default function BackButton({ caseId, className }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      data-qa={caseId ? `hero-back-${caseId}` : 'hero-back'}
      onClick={() => {
        if (typeof window === "undefined") return;
        sendEvent('hero_back_click', { case_id: caseId ?? null });
        if (window.history.length > 1) {
          router.back();
        } else {
          window.location.href = "/#cases";
        }
      }}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,_rgb(var(--accent))_40%,_rgb(var(--border))_60%)]",
        "bg-[color:color-mix(in_oklab,_rgb(var(--accent))_14%,_rgb(var(--background))_86%)] px-3 py-1.5 text-sm font-medium",
        "text-[color:color-mix(in_oklab,_rgb(var(--accent))_70%,_rgb(var(--foreground))_30%)] shadow-sm transition",
        "hover:-translate-x-0.5 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent))]",
        "dark:border-[color:color-mix(in_oklab,_rgb(var(--accent))_30%,_rgb(var(--border))_70%)]",
        "dark:bg-[color:color-mix(in_oklab,_rgb(var(--accent))_22%,_rgb(var(--background))_78%)]",
        "dark:text-[color:color-mix(in_oklab,_rgb(var(--accent-foreground))_65%,_rgb(var(--foreground))_35%)]",
        "sm:-ml-3 md:-ml-8 lg:-ml-16 xl:-ml-24 2xl:-ml-32",
        className
      )}
    >
      ← Назад
    </button>
  );
}
