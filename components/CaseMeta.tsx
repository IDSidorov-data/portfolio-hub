'use client';

type Props = {
  role?: string;
  duration?: string;
  status?: string;
  tags?: string[];
};

export default function CaseMeta({ role, duration, status, tags }: Props) {
  if (!role && !duration && !status && (!tags || tags.length === 0)) return null;

  const pillBase =
    "inline-flex items-center rounded-full px-2 py-1 text-xs md:text-sm border select-text";
  const tint =
    // лёгкая заливка + читаемый текст (светлая/тёмная темы)
    "bg-[rgba(0,0,0,0.04)] border-black/10 text-black/90 " +
    "dark:bg-[rgba(255,255,255,0.08)] dark:border-white/15 dark:text-white/85";

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
      {role && (
        <span className={`${pillBase} ${tint}`}>
          Роль:&nbsp;<strong>{role}</strong>
        </span>
      )}
      {duration && (
        <span className={`${pillBase} ${tint}`}>
          Длительность:&nbsp;<strong>{duration}</strong>
        </span>
      )}
      {status && (
        <span className={`${pillBase} ${tint}`}>
          Статус:&nbsp;<strong>{status}</strong>
        </span>
      )}
      {tags?.map((t) => (
        <span key={t} className={`${pillBase} ${tint}`} title={t}>
          {t}
        </span>
      ))}
    </div>
  );
}
