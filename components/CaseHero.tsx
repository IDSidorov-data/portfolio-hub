import Link from 'next/link';

import CaseMeta from '@/components/CaseMeta';
import { badgeBaseClass } from '@/lib/badge';
import { getCaseVibe } from '@/lib/caseVibes';

interface CaseLink {
  label: string;
  href: string;
}

interface CaseHeroProps {
  slug: string;
  title: string;
  summary?: string;
  role?: string;
  duration?: string;
  status?: string;
  tags?: string[];
  links?: CaseLink[];
}

export default function CaseHero({
  slug,
  title,
  summary,
  role,
  duration,
  status,
  tags,
  links,
}: CaseHeroProps) {
  const vibe = getCaseVibe(slug);
  const hasLinks = Boolean(links && links.length > 0);
  const badgeClass = `${badgeBaseClass} ${vibe.chip}`;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/75 text-slate-900 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-white">
      <div aria-hidden className={`absolute inset-0 mix-blend-multiply ${vibe.glow}`} />
      <div aria-hidden className={`absolute -right-24 -top-28 h-60 w-60 rounded-full blur-3xl opacity-60 ${vibe.halo}`} />
      <div className="relative z-[1] flex flex-col gap-6 p-8 sm:p-10">
        <div className="flex flex-wrap items-start gap-4">
          <span className="text-4xl sm:text-5xl animate-float" aria-hidden>
            {vibe.emoji}
          </span>
          <div className="min-w-[220px] flex-1">
            <span className={badgeClass}>Case — {vibe.label}</span>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
            {summary && (
              <p className="mt-3 max-w-2xl text-base text-slate-700/85 dark:text-slate-100/85">
                {summary}
              </p>
            )}
          </div>
        </div>

        <CaseMeta
          role={role}
          duration={duration}
          status={status}
          tags={tags}
          appearance="glass"
          toneClassName={vibe.chip}
        />

        {hasLinks && (
          <div className="flex flex-wrap gap-3">
            {links!.map(({ label, href }) => {
              const isExternal = /^https?:/i.test(href);
              return (
                <Link
                  key={`${label}-${href}`}
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/95 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                >
                  <span>{label}</span>
                  <span aria-hidden className="text-base">↗</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
