'use client';

type Props = {
  role?: string;
  duration?: string;
  status?: string;
  tags?: string[];
};

export default function CaseMeta({ role, duration, status, tags }: Props) {
  if (!role && !duration && !status && (!tags || tags.length === 0)) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
      {role && (
        <span className="rounded-full border px-2 py-1 bg-background/60">
          Роль: <strong>{role}</strong>
        </span>
      )}
      {duration && (
        <span className="rounded-full border px-2 py-1 bg-background/60">
          Длительность: <strong>{duration}</strong>
        </span>
      )}
      {status && (
        <span className="rounded-full border px-2 py-1 bg-background/60">
          Статус: <strong>{status}</strong>
        </span>
      )}
      {tags?.map((t) => (
        <span key={t} className="rounded-full border px-2 py-1 bg-accent/10" title={t}>
          {t}
        </span>
      ))}
    </div>
  );
}
