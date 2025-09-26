import clsx from '@/lib/clsx';
import type { BadgeTone } from '@/lib/badge';

type MetricBadgeProps = {
  value: string | number;
  label: string;
  note?: string;
  tone?: BadgeTone;
  positive?: boolean;
};

const metricToneClass: Record<BadgeTone, string> = {
  amber: 'border-amber-500/30 bg-amber-50/70 dark:border-amber-400/30 dark:bg-amber-500/10',
  sky: 'border-sky-500/30 bg-sky-50/70 dark:border-sky-400/30 dark:bg-sky-500/10',
  purple: 'border-purple-500/30 bg-purple-50/70 dark:border-purple-400/30 dark:bg-purple-500/10',
  emerald: 'border-emerald-500/30 bg-emerald-50/70 dark:border-emerald-400/30 dark:bg-emerald-500/10',
  rose: 'border-rose-500/30 bg-rose-50/70 dark:border-rose-400/30 dark:bg-rose-500/10',
  slate: 'border-slate-300/40 bg-white/65 dark:border-white/10 dark:bg-white/5',
};

export default function MetricBadge({ value, label, note, tone, positive }: MetricBadgeProps) {
  const resolvedTone: BadgeTone = tone ?? (positive === undefined ? 'slate' : positive ? 'emerald' : 'rose');

  return (
    <div
      className={clsx(
        'flex min-w-[168px] flex-1 basis-[168px] flex-col gap-1 rounded-2xl border px-4 py-3 text-left shadow-sm backdrop-blur-sm',
        metricToneClass[resolvedTone]
      )}
      aria-label={`${label}: ${value}${note ? ` (${note})` : ''}`.trim()}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="text-lg font-semibold leading-6 text-slate-900 dark:text-white">{value}</span>
      {note ? <span className="text-xs text-slate-500 dark:text-slate-400">{note}</span> : null}
    </div>
  );
}
