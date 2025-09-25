"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window === "undefined") return;
        if (window.history.length > 1) {
          router.back();
        } else {
          window.location.href = "/#cases";
        }
      }}
      className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-900/10 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800/40 dark:focus-visible:ring-offset-slate-900"
    >
      < Назад
    </button>
  );
}