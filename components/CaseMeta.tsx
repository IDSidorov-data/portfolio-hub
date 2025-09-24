'use client';

type Props = {
  role?: string;
  duration?: string;
  status?: string;
  tags?: string[];
  appearance?: 'default' | 'glass';
  toneClassName?: string;
};

export default function CaseMeta({
  role,
  duration,
  status,
  tags,
  appearance = 'default',
  toneClassName,
}: Props) {
  if (!role && !duration && !status && (!tags || tags.length === 0)) return null;

  const pillBase =
    'inline-flex items-center rounded-full px-2 py-1 text-xs md:text-sm border select-text transition-colors duration-300';

  const defaultTint =
    appearance === 'glass'
      ? 'border-white/40 bg-white/75 text-slate-900/90 dark:border-white/15 dark:bg-white/10 dark:text-white/85'
      : 'bg-[rgba(0,0,0,0.04)] border-black/10 text-black/90 dark:bg-[rgba(255,255,255,0.08)] dark:border-white/15 dark:text-white/85';

  const blurAccent = appearance === 'glass' ? 'backdrop-blur-sm' : '';
  const tint = [defaultTint, toneClassName].filter(Boolean).join(' ');
  const chipClass = `${pillBase} ${blurAccent} ${tint}`.trim();

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
      {role && (
        <span className={chipClass}>
          Role:&nbsp;<strong>{role}</strong>
        </span>
      )}
      {duration && (
        <span className={chipClass}>
          Timeline:&nbsp;<strong>{duration}</strong>
        </span>
      )}
      {status && (
        <span className={chipClass}>
          Status:&nbsp;<strong>{status}</strong>
        </span>
      )}
      {tags?.map((t) => (
        <span key={t} className={chipClass} title={t}>
          {t}
        </span>
      ))}
    </div>
  );
}
