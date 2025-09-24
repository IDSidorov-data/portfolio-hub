export type CaseVibe = {
  emoji: string;
  label: string;
  surface: string;
  shadow: string;
  accent: string;
  chip: string;
  link: string;
  glow: string;
  halo: string;
};

const palette: CaseVibe[] = [
  {
    emoji: '🎯',
    label: 'A/B',
    surface:
      'bg-gradient-to-br from-rose-100 via-orange-50/75 to-amber-100 dark:from-rose-500/25 dark:via-orange-500/15 dark:to-amber-500/15',
    shadow: 'shadow-[0_18px_42px_-18px_rgba(244,114,182,0.35)]',
    accent: 'text-rose-700 dark:text-rose-200',
    chip:
      'bg-white/80 text-rose-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-rose-100 dark:border-white/15',
    link: 'text-rose-700 hover:text-rose-800 dark:text-rose-100 dark:hover:text-rose-50',
    glow:
      'bg-gradient-to-br from-rose-200/50 via-orange-100/40 to-amber-200/30 dark:from-rose-500/25 dark:via-orange-500/20 dark:to-amber-500/15',
    halo: 'bg-rose-200/50 dark:bg-rose-500/20',
  },
  {
    emoji: '🚚',
    label: 'Ops',
    surface:
      'bg-gradient-to-br from-emerald-100 via-sky-50/80 to-lime-100 dark:from-emerald-500/20 dark:via-sky-500/12 dark:to-lime-500/12',
    shadow: 'shadow-[0_18px_42px_-18px_rgba(16,185,129,0.32)]',
    accent: 'text-emerald-700 dark:text-emerald-200',
    chip:
      'bg-white/80 text-emerald-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-emerald-100 dark:border-white/15',
    link: 'text-emerald-700 hover:text-emerald-800 dark:text-emerald-100 dark:hover:text-emerald-50',
    glow:
      'bg-gradient-to-br from-emerald-200/45 via-sky-100/40 to-lime-200/35 dark:from-emerald-500/25 dark:via-sky-500/20 dark:to-lime-500/15',
    halo: 'bg-emerald-200/50 dark:bg-emerald-500/25',
  },
  {
    emoji: '🧠',
    label: 'Modeling',
    surface:
      'bg-gradient-to-br from-violet-100 via-indigo-50/75 to-sky-100 dark:from-violet-500/20 dark:via-indigo-500/15 dark:to-sky-500/12',
    shadow: 'shadow-[0_18px_42px_-18px_rgba(129,140,248,0.32)]',
    accent: 'text-violet-700 dark:text-violet-200',
    chip:
      'bg-white/80 text-violet-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-violet-100 dark:border-white/15',
    link: 'text-violet-700 hover:text-violet-800 dark:text-violet-100 dark:hover:text-violet-50',
    glow:
      'bg-gradient-to-br from-violet-200/45 via-indigo-100/40 to-sky-200/35 dark:from-violet-500/25 dark:via-indigo-500/20 dark:to-sky-500/15',
    halo: 'bg-violet-200/50 dark:bg-violet-500/25',
  },
  {
    emoji: '🤖',
    label: 'AI',
    surface:
      'bg-gradient-to-br from-slate-100 via-indigo-50/80 to-sky-100 dark:from-slate-200/22 dark:via-slate-300/18 dark:to-indigo-400/18',
    shadow: 'shadow-[0_18px_42px_-18px_rgba(148,163,184,0.45)]',
    accent: 'text-slate-700 dark:text-slate-200',
    chip:
      'bg-white/80 text-slate-700/90 border-white/40 shadow-sm dark:bg-slate-200/15 dark:text-slate-50 dark:border-slate-200/25',
    link: 'text-indigo-600 hover:text-indigo-700 dark:text-indigo-200 dark:hover:text-indigo-100',
    glow:
      'bg-gradient-to-br from-slate-200/60 via-indigo-200/45 to-sky-200/35 dark:from-slate-200/25 dark:via-indigo-300/20 dark:to-cyan-300/18',
    halo: 'bg-slate-200/60 dark:bg-slate-300/30',
  },
  {
    emoji: '🛠️',
    label: 'Automation',
    surface:
      'bg-gradient-to-br from-amber-100 via-orange-50/75 to-lime-100 dark:from-amber-500/20 dark:via-orange-500/12 dark:to-lime-500/12',
    shadow: 'shadow-[0_18px_42px_-18px_rgba(251,191,36,0.34)]',
    accent: 'text-amber-700 dark:text-amber-200',
    chip:
      'bg-white/80 text-amber-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-amber-100 dark:border-white/15',
    link: 'text-amber-700 hover:text-amber-800 dark:text-amber-100 dark:hover:text-amber-50',
    glow:
      'bg-gradient-to-br from-amber-200/45 via-orange-100/40 to-lime-200/35 dark:from-amber-500/25 dark:via-orange-500/20 dark:to-lime-500/15',
    halo: 'bg-amber-200/50 dark:bg-amber-500/25',
  },
];

const bySlug: Record<string, CaseVibe> = {
  'ab-test-mobile-game': palette[0],
  'logistics-calculator': palette[1],
  scenario: palette[2],
  'loki-assistant': palette[3],
  'rpa-bot': palette[4],
};

export function getCaseVibe(slug: string, fallbackIndex = 0): CaseVibe {
  if (bySlug[slug]) {
    return bySlug[slug];
  }
  return palette[fallbackIndex % palette.length];
}

export const caseVibePalette = palette;
