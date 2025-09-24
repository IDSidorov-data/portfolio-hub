"use client";

import Link from 'next/link';

export default function CaseCTA({ result }: { result?: string }) {
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
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700/80 dark:border-white/10 dark:bg-white/10 dark:text-white/85">
              Следующий шаг
            </span>
            <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Готовы обсудить свой проект?
            </h3>
            <p className="text-base text-slate-700/85 dark:text-slate-200/85">
              {result
                ? result
                : 'Коллекция инструментов, экспериментов и продакшн-сборок уже обкатана. Расскажите о задаче — соберём MVP или усилим текущую команду.'}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/#brief"
              scroll={false}
              onClick={handleBrief}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Заполнить бриф
            </Link>
            <Link
              href="/#cases"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300/70 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/80 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            >
              Посмотреть ещё кейсы
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
