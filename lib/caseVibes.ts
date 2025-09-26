
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
      "bg-gradient-to-br from-amber-50 via-orange-50/80 to-rose-50 dark:from-amber-500/15 dark:via-orange-500/15 dark:to-rose-500/15",
    shadow: "shadow-[0_20px_40px_-22px_rgba(245,158,11,0.35)]",
    accent: "text-amber-700 dark:text-amber-200",
    chip:
      "backdrop-blur border border-amber-200/60 bg-white/85 text-amber-800 dark:border-amber-400/45 dark:bg-amber-500/32 dark:text-amber-50",
    link: "text-amber-700 hover:text-amber-800 dark:text-amber-200 dark:hover:text-amber-100",
    glow:
      "bg-gradient-to-br from-amber-200/55 via-orange-200/45 to-rose-200/40 dark:from-amber-500/28 dark:via-orange-500/24 dark:to-rose-500/20",
    halo: "bg-amber-200/40 dark:bg-amber-500/20",
  },
  {
    emoji: "🚚",
    label: "Ops",
    tone: "emerald",
    surface:
      "bg-gradient-to-br from-sky-50 via-cyan-50/80 to-emerald-50 dark:from-sky-500/15 dark:via-cyan-500/15 dark:to-emerald-500/15",
    shadow: "shadow-[0_20px_40px_-22px_rgba(14,165,233,0.32)]",
    accent: "text-sky-700 dark:text-sky-200",
    chip:
      "backdrop-blur border border-sky-200/60 bg-white/85 text-sky-800 dark:border-sky-400/45 dark:bg-sky-500/32 dark:text-sky-50",
    link: "text-sky-700 hover:text-sky-800 dark:text-sky-200 dark:hover:text-sky-100",
    glow:
      "bg-gradient-to-br from-sky-200/55 via-cyan-200/45 to-emerald-200/40 dark:from-sky-500/28 dark:via-cyan-500/24 dark:to-emerald-500/20",
    halo: "bg-sky-200/40 dark:bg-sky-500/20",
  },
  {
    emoji: "🧠",
    label: "Modeling",
    tone: "purple",
    surface:
      "bg-gradient-to-br from-purple-50 via-violet-50/80 to-rose-50 dark:from-purple-500/15 dark:via-violet-500/15 dark:to-rose-500/15",
    shadow: "shadow-[0_20px_40px_-22px_rgba(147,51,234,0.32)]",
    accent: "text-purple-700 dark:text-purple-200",
    chip:
      "backdrop-blur border border-purple-200/60 bg-white/85 text-purple-800 dark:border-purple-400/45 dark:bg-purple-500/32 dark:text-purple-50",
    link: "text-purple-700 hover:text-purple-800 dark:text-purple-200 dark:hover:text-purple-100",
    glow:
      "bg-gradient-to-br from-purple-200/55 via-violet-200/45 to-rose-200/40 dark:from-purple-500/28 dark:via-violet-500/24 dark:to-rose-500/20",
    halo: "bg-purple-200/40 dark:bg-purple-500/20",
  },
  {
    emoji: "🤖",
    label: "AI",
    tone: "slate",
    surface:
      "bg-gradient-to-br from-emerald-50 via-lime-50/80 to-sky-50 dark:from-emerald-500/15 dark:via-lime-500/15 dark:to-sky-500/15",
    shadow: "shadow-[0_20px_40px_-22px_rgba(16,185,129,0.32)]",
    accent: "text-emerald-700 dark:text-emerald-200",
    chip:
      "backdrop-blur border border-emerald-200/60 bg-white/85 text-emerald-800 dark:border-emerald-400/45 dark:bg-emerald-500/32 dark:text-emerald-50",
    link: "text-emerald-700 hover:text-emerald-800 dark:text-emerald-200 dark:hover:text-emerald-100",
    glow:
      "bg-gradient-to-br from-emerald-200/55 via-lime-200/45 to-sky-200/40 dark:from-emerald-500/28 dark:via-lime-500/24 dark:to-sky-500/20",
    halo: "bg-emerald-200/40 dark:bg-emerald-500/20",
  },
  {
    emoji: "🛠️",
    label: "Automation",
    tone: "amber",
    surface:
      "bg-gradient-to-br from-slate-50/40 via-white/60 to-white/90 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-900/30",
    shadow: "shadow-[0_20px_40px_-22px_rgba(15,23,42,0.28)]",
    accent: "text-slate-700 dark:text-slate-200",
    chip:
      "backdrop-blur border border-slate-200/60 bg-white/85 text-slate-800 dark:border-slate-400/45 dark:bg-slate-500/30 dark:text-slate-50",
    link: "text-slate-700 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-100",
    glow:
      "bg-gradient-to-br from-slate-200/55 via-zinc-200/45 to-white/40 dark:from-slate-700/28 dark:via-zinc-700/24 dark:to-slate-800/20",
    halo: "bg-slate-200/35 dark:bg-slate-700/25",
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
