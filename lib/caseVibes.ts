
import type { BadgeTone } from "@/lib/badge";

export type CaseVibe = {
  emoji: string;
  label: string;
  tone: BadgeTone;
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
    emoji: "🎯",
    label: "A/B",
    tone: "rose",
    surface:
      "bg-gradient-to-br from-rose-50 via-pink-50/80 to-amber-50 dark:from-rose-500/15 dark:via-pink-500/15 dark:to-amber-500/15",
    shadow: "shadow-[0_28px_52px_-26px_rgba(244,114,182,0.6)]",
    accent: "text-rose-700 dark:text-rose-200",
    chip:
      "backdrop-blur border border-rose-200/60 bg-white/85 text-rose-800 dark:border-rose-400/35 dark:bg-rose-500/25 dark:text-rose-50",
    link: "text-rose-700 hover:text-rose-800 dark:text-rose-200 dark:hover:text-rose-100",
    glow:
      "bg-gradient-to-br from-rose-200/65 via-pink-200/50 to-amber-200/45 dark:from-rose-500/35 dark:via-pink-500/30 dark:to-amber-400/25",
    halo: "bg-rose-200/60 dark:bg-rose-500/30",
  },
  {
    emoji: "🚚",
    label: "Ops",
    tone: "emerald",
    surface:
      "bg-gradient-to-br from-emerald-50 via-lime-50/80 to-sky-50 dark:from-emerald-500/15 dark:via-lime-500/15 dark:to-sky-500/15",
    shadow: "shadow-[0_24px_48px_-24px_rgba(16,185,129,0.38)]",
    accent: "text-emerald-700 dark:text-emerald-200",
    chip:
      "backdrop-blur border border-emerald-200/60 bg-white/85 text-emerald-800 dark:border-emerald-400/35 dark:bg-emerald-500/25 dark:text-emerald-50",
    link: "text-emerald-700 hover:text-emerald-800 dark:text-emerald-200 dark:hover:text-emerald-100",
    glow:
      "bg-gradient-to-br from-emerald-200/55 via-sky-200/45 to-lime-200/40 dark:from-emerald-500/30 dark:via-sky-500/24 dark:to-lime-500/20",
    halo: "bg-emerald-200/55 dark:bg-emerald-500/28",
  },
  {
    emoji: "🧠",
    label: "Modeling",
    tone: "purple",
    surface:
      "bg-gradient-to-br from-purple-50 via-violet-50/80 to-rose-50 dark:from-purple-500/15 dark:via-violet-500/15 dark:to-rose-500/15",
    shadow: "shadow-[0_24px_48px_-24px_rgba(129,140,248,0.36)]",
    accent: "text-violet-700 dark:text-violet-200",
    chip:
      "backdrop-blur border border-violet-200/60 bg-white/85 text-violet-800 dark:border-violet-400/35 dark:bg-violet-500/25 dark:text-violet-50",
    link: "text-violet-700 hover:text-violet-800 dark:text-violet-200 dark:hover:text-violet-100",
    glow:
      "bg-gradient-to-br from-violet-200/55 via-indigo-200/45 to-sky-200/40 dark:from-violet-500/30 dark:via-indigo-500/22 dark:to-sky-500/18",
    halo: "bg-violet-200/55 dark:bg-violet-500/28",
  },
  {
    emoji: "🤖",
    label: "AI",
    tone: "slate",
    surface:
      "bg-gradient-to-br from-sky-50 via-cyan-50/80 to-emerald-50 dark:from-sky-500/15 dark:via-cyan-500/15 dark:to-emerald-500/15",
    shadow: "shadow-[0_26px_52px_-24px_rgba(148,163,184,0.45)]",
    accent: "text-slate-700 dark:text-slate-200",
    chip:
      "backdrop-blur border border-slate-200/60 bg-white/85 text-slate-800 dark:border-slate-400/35 dark:bg-slate-500/25 dark:text-slate-50",
    link: "text-indigo-600 hover:text-indigo-700 dark:text-indigo-200 dark:hover:text-indigo-100",
    glow:
      "bg-gradient-to-br from-slate-200/60 via-indigo-200/45 to-sky-200/35 dark:from-slate-200/28 dark:via-indigo-300/22 dark:to-cyan-300/18",
    halo: "bg-slate-200/60 dark:bg-slate-300/30",
  },
  {
    emoji: "🛠️",
    label: "Automation",
    tone: "amber",
    surface:
      "bg-gradient-to-br from-amber-50 via-orange-50/80 to-lime-50 dark:from-amber-500/15 dark:via-orange-500/15 dark:to-lime-500/15",
    shadow: "shadow-[0_24px_48px_-24px_rgba(251,191,36,0.38)]",
    accent: "text-amber-700 dark:text-amber-200",
    chip:
      "backdrop-blur border border-amber-200/60 bg-white/85 text-amber-800 dark:border-amber-400/35 dark:bg-amber-500/25 dark:text-amber-50",
    link: "text-amber-700 hover:text-amber-800 dark:text-amber-200 dark:hover:text-amber-100",
    glow:
      "bg-gradient-to-br from-amber-200/55 via-orange-200/45 to-lime-200/40 dark:from-amber-500/30 dark:via-orange-500/24 dark:to-lime-500/20",
    halo: "bg-amber-200/55 dark:bg-amber-500/28",
  },
];

const bySlug: Record<string, CaseVibe> = {
  "ab-test-mobile-game": palette[0],
  "logistics-calculator": palette[1],
  scenario: palette[2],
  "loki-assistant": palette[3],
  "rpa-bot": palette[4],
};

export function getCaseVibe(slug: string, fallbackIndex = 0): CaseVibe {
  if (bySlug[slug]) {
    return bySlug[slug];
  }
  return palette[fallbackIndex % palette.length];
}

export const caseVibePalette = palette;
