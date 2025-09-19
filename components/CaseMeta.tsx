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
        <span className="rounded-full border border-foreground/15 px-2 py-1 bg-foreground/[0.06] backdrop-blur-[2px]">
          Роль: <strong>{role}</strong>
        </span>
      )}
      {duration && (
        <span className="rounded-full border border-foreground/15 px-2 py-1 bg-foreground/[0.06] backdrop-blur-[2px]">
          Длительность: <strong>{duration}</strong>
        </span>
      )}
      {status && (
        <span className="rounded-full border border-foreground/15 px-2 py-1 bg-foreground/[0.06] backdrop-blur-[2px]">
          Статус: <strong>{status}</strong>
        </span>
      )}
      {tags?.map((t) => (
        <span
          key={t}
          className="rounded-full border border-accent/20 px-2 py-1 bg-accent/15"
          title={t}
        >
          {t}
        </span>
      ))}
    </div>
  );
}
