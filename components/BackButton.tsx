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
      className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 opacity-80 transition hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent))] dark:text-slate-200"
    >
      ← Назад
    </button>
  );
}
