"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function CaseCTA({ result }: { result?: string }) {
  const router = useRouter();

  const goBrief = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/#brief", { scroll: false });
    setTimeout(() => {
      document
        .getElementById("brief")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <div className="not-prose relative mt-12">
      {/* Хало-подсветка под карточкой */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl blur-xl opacity-80"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.10), rgba(255,255,255,0.04) 45%, transparent 70%)",
        }}
      />

      {/* Карточка */}
      <div
        className="rounded-2xl border border-white/12 bg-white/65 text-black backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] ring-1 ring-black/5
                      dark:border-white/10 dark:bg-white/[0.07] dark:text-inherit dark:ring-white/[0.06]"
      >
        <div className="p-5 md:p-6">
          <div className="text-sm uppercase tracking-wide opacity-70 mb-1">
            Результат
          </div>

          {result ? (
            <div className="text-lg font-medium">{result}</div>
          ) : (
            <div className="text-lg font-medium">
              Готов обсудить, как применить этот подход в вашем проекте.
            </div>
          )}

          <div className="mt-4">
            <Link
              href="/#brief"
              replace
              prefetch={false}
              scroll={false}
              onClick={goBrief}
              aria-label="Перейти к форме обсуждения проекта"
              className="no-underline inline-flex items-center rounded-xl px-4 py-2 border border-black/10 bg-white/80 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/14 hover:bg-white/90"
            >
              Обсудить проект
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
