"use client";

import { useRouter } from "next/navigation";

import { sendEvent } from "@/lib/analytics";

export default function BackButton({ caseId }: { caseId?: string }) {
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
      className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-900/10 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800/40 dark:focus-visible:ring-offset-slate-900"
    >
      ← Назад
    </button>
  );
}
