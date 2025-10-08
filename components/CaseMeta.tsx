'use client';

import Badge from '@/components/primitives/Badge';
import type { BadgeTone } from '@/lib/badge';

type Props = {
  role?: string;
  duration?: string;
  status?: string;
  tags?: string[];
  appearance?: 'default' | 'glass';
  tone?: BadgeTone;
};

export default function CaseMeta({
  role,
  duration,
  status,
  tags,
  appearance = 'default',
  tone = 'slate',
}: Props) {
  if (!role && !duration && !status && (!tags || tags.length === 0)) return null;

  const glass =
    appearance === 'glass'
      ? 'backdrop-blur bg-white/70 text-slate-900 dark:bg-white/10 dark:text-white'
      : '';

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
      {role && (
        <Badge tone={tone} size="sm" className={glass}>
          Роль:&nbsp;<strong>{role}</strong>
        </Badge>
      )}
      {duration && (
        <Badge tone={tone} size="sm" className={glass}>
          Таймлайн:&nbsp;<strong>{duration}</strong>
        </Badge>
      )}
      {status && (
        <Badge tone={tone} size="sm" className={glass}>
          Статус:&nbsp;<strong>{status}</strong>
        </Badge>
      )}
      {tags?.map((t) => (
        <Badge key={t} tone="slate" size="sm" className={glass} title={t}>
          {t}
        </Badge>
      ))}
    </div>
  );
}
