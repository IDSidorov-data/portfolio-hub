"use client";

import Link from 'next/link';

import Badge from '@/components/primitives/Badge';
import { useCleanMode } from '@/lib/clean-mode';

export default function CaseCTA({ result }: { result?: string }) {
  const cleanMode = useCleanMode();

  if (cleanMode) {
    return null;
  }

  const handleBrief: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (typeof window !== 'undefined') {
      window.location.assign('/#brief');
    }
  };

  return (
    <div className="not-prose relative mt-14">
      <div className="absolute inset-0 -z-10 blur-3xl opacity-70" aria-hidden>
        <div className="h-full w-full rounded-3xl bg-gradient-to-br from-sky-400/30 via-indigo-500/20 to-purple-500/25 dark:from-sky-500/25 dark:via-indigo-600/20 dark:to-purple-600/25" />
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/90 via-white/70 to-white/80 text-slate-900 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.5)] backdrop-blur-xl dark:border-white/10 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/70 dark:text-white">
        <div className="pointer-events-none absolute -top-20 right-20 h-56 w-56 rounded-full bg-white/30 blur-3xl dark:bg-white/10" aria-hidden />
        <div className="relative z-[1] flex flex-col gap-8 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge tone="sky" size="sm" className="bg-white/80 dark:bg-white/10">
              Готовы подключиться
            </Badge>
            <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">Нужно обсудить похожий кейс?</h3>
            <p className="text-base text-slate-700/85 dark:text-slate-200/85">
              {result
                ? result
                : 'Расскажите коротко о задаче — вернёмся с предложением в течение дня. Открыты к пилотам, MVP и постоянной поддержке.'}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/#brief"
              scroll={false}
              onClick={handleBrief}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition md:hover:-translate-y-0.5 md:hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              data-qa="case-cta-brief"
            >
              Оставить заявку
            </Link>
            <Link
              href="/#cases"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300/70 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition md:hover:-translate-y-0.5 md:hover:bg-white/80 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              data-qa="case-cta-more"
            >
              Посмотреть ещё проекты
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
