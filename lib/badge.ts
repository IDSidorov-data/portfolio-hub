export const badgeBaseClass =
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs md:text-sm transition-colors whitespace-nowrap select-text";

export const badgeToneClass = {
  amber:   "bg-white/85 text-amber-800 border-slate-900/10 shadow-sm dark:bg-white/10 dark:text-amber-100 dark:border-white/15",
  sky:     "bg-white/85 text-sky-800   border-slate-900/10 shadow-sm dark:bg-white/10 dark:text-sky-100   dark:border-white/15",
  purple:  "bg-white/85 text-purple-800 border-slate-900/10 shadow-sm dark:bg-white/10 dark:text-purple-100 dark:border-white/15",
  emerald: "bg-white/85 text-emerald-800 border-slate-900/10 shadow-sm dark:bg-white/10 dark:text-emerald-100 dark:border-white/15",
  rose:    "bg-white/85 text-rose-800  border-slate-900/10 shadow-sm dark:bg-white/10 dark:text-rose-100  dark:border-white/15",
  slate:   "bg-white/85 text-slate-800 border-slate-900/10 shadow-sm dark:bg-white/10 dark:text-slate-100 dark:border-white/15",
} as const;

export type BadgeTone = keyof typeof badgeToneClass;