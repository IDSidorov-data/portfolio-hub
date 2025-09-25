'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import CaseMeta from '@/components/CaseMeta';
import Badge from '@/components/primitives/Badge';
import BackButton from '@/components/BackButton';
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

  return (
    <Card
      variant="soft"
      className={`relative overflow-hidden border border-white/30 text-slate-900 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.4)] backdrop-blur-xl dark:border-white/10 dark:text-white ${vibe.surface} ${vibe.shadow}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-24 -top-28 h-60 w-60 rounded-full blur-3xl opacity-60 ${vibe.halo}`}
      />
      <div className="relative z-[1] flex flex-col gap-6">
        <div className="self-start">
          <BackButton caseId={slug} />
        </div>
        <header className="flex flex-wrap items-start gap-4">
          <span
            aria-hidden
            className="inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-3xl bg-white/80 text-4xl shadow-sm dark:bg-white/10"
          >
            {vibe.emoji}
          </span>
          <div className="min-w-[220px] flex-1">
            <Badge tone={vibe.tone} size="sm" leftIcon={vibe.emoji}>
              Case · {vibe.label}
            </Badge>
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
            {summary ? (
              <p className="mt-3 max-w-2xl text-base text-slate-700/85 dark:text-slate-100/85 line-clamp-2">
                {summary}
              </p>
            ) : null}
          </div>
        </header>

        <CaseMeta
          role={role}
          duration={duration}
          status={status}
          tags={tags}
          appearance="glass"
          tone={vibe.tone}
        />

        {hasLinks ? (
          <div className="flex flex-wrap gap-3">
            {links!.map(({ label, href }, linkIndex) => {
              const isExternal = /^https?:/i.test(href);
              return (
                <Button
                  key={`${label}-${href}`}
                  href={href}
                  variant="secondary"
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="min-h-[44px] px-5"
                  data-qa={`case-link-${slug}-${linkIndex}`}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
