'use client';

import clsx from '@/lib/clsx';

import Container from '@/components/Container';
import Card from '@/components/Card';
import Badge from '@/components/primitives/Badge';
import BulletList from '@/components/primitives/BulletList';
import { useCardAnalytics } from '@/components/hooks/useCardAnalytics';
import { useSnapCarousel } from '@/components/hooks/useSnapCarousel';
import type { BadgeTone } from '@/lib/badge';

type StackSection = {
  id: string;
  title: string;
  intro: string;
  lines: string[];
  chips: string[];
  emoji: string;
  badge: string;
  surface: string;
  shadow: string;
  halo: string;
};

const sections: StackSection[] = [
  {
    id: 'analytics',
    title: 'Аналитика и метрики',
    intro: 'От событий и витрин до проверяемых гипотез и решений.',
    lines: [
      'ETL-сбор → SQL-модели → метрики и дашборды',
      'A/B-эксперименты, Z/T-тесты, отчёты по критериям успеха',
    ],
    chips: ['SQL', 'Postgres/Supabase', 'Superset/Metabase', 'Python/Pandas'],
    emoji: '📊',
    badge: 'Аналитика и метрики',
    surface:
      'bg-gradient-to-br from-sky-50 via-blue-50/85 to-emerald-50 dark:from-sky-500/28 dark:via-blue-500/22 dark:to-emerald-500/22',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(56,189,248,0.32)]',
    halo: 'bg-sky-200/45 dark:bg-sky-500/20',
  },
  {
    id: 'backend',
    title: 'Backend и API',
    intro: 'Прикладной бекенд под продуктовые задачи.',
    lines: [
      'FastAPI + Postgres, очереди, вебхуки и интеграции',
      'Авторизация, платежи, простые админки',
    ],
    chips: ['FastAPI', 'Postgres', 'Supabase Auth/Storage', 'Cloud Run/Vercel'],
    emoji: '🧩',
    badge: 'Backend / API',
    surface:
      'bg-gradient-to-br from-purple-50 via-violet-50/85 to-indigo-50 dark:from-purple-500/28 dark:via-violet-500/22 dark:to-indigo-500/22',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(167,139,250,0.32)]',
    halo: 'bg-purple-200/45 dark:bg-purple-500/20',
  },
  {
    id: 'automation',
    title: 'TG-боты и автоматизация',
    intro: 'Телеграм-ассистенты, интеграции с AI и CRM, RPA-скрипты.',
    lines: [
      'aiogram-боты ↔ API ↔ Sheets/CRM, напоминания и отчёты',
      'TG Web App, интеграции c AI-сервисами, RPA и браузерные сценарии',
    ],
    chips: ['aiogram', 'Playwright/RPA', 'Webhook', 'Google Sheets', 'AI интеграции'],
    emoji: '🤖',
    badge: 'TG-боты и автоматизация',
    surface:
      'bg-gradient-to-br from-amber-50 via-orange-50/85 to-lime-50 dark:from-amber-500/28 dark:via-orange-500/22 dark:to-lime-500/22',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(251,191,36,0.32)]',
    halo: 'bg-amber-200/45 dark:bg-amber-500/20',
  },
  {
    id: 'product',
    title: 'Сайты и интерфейсы',
    intro: 'От лендингов до многостраничных приложений на Next.js.',
    lines: [
      'Лендинги и промо на Tilda',
      'Next.js/React: мультистраничники с админкой, API и интеграциями',
    ],
    chips: ['Next.js', 'React', 'Tailwind', 'Tilda', 'Vercel'],
    emoji: '🚀',
    badge: 'Сайты и интерфейсы',
    surface:
      'bg-gradient-to-br from-rose-50 via-pink-50/85 to-emerald-50 dark:from-rose-500/28 dark:via-pink-500/22 dark:to-emerald-500/22',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(244,114,182,0.32)]',
    halo: 'bg-rose-200/45 dark:bg-rose-500/20',
  },
];
const toneBySection: Record<StackSection['id'], BadgeTone> = {
  analytics: 'sky',
  backend: 'purple',
  automation: 'emerald',
  product: 'rose',
};

export default function Stack() {
  const { listRef, activeIndex, handleKeyDown, handleScroll } = useSnapCarousel(sections.length);

  return (
    <section id="stack" className="py-16 sm:py-24">
      <Container>
        <header className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Технологии
          </p>
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Стек и инструменты</h2>
          <p className="max-w-3xl text-base text-slate-600 dark:text-slate-300">
            Подбираем инструменты под задачу: аналитика, backend, автоматизация и продуктовые интерфейсы.
          </p>
        </header>

        <div role="group" aria-roledescription="carousel" aria-label="Стек и инструменты">
          <ul
            ref={listRef}
            className="case-carousel"
            role="list"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
          >
            {sections.map((section, index) => (
              <StackCard key={section.id} section={section} index={index} />
            ))}
          </ul>
          {sections.length > 1 ? (
            <div className="mt-4 flex justify-center gap-2 md:hidden" aria-hidden="true">
              {sections.map((section, index) => (
                <span
                  key={section.id}
                  className={clsx(
                    'h-1.5 w-6 rounded-full transition-colors',
                    activeIndex === index
                      ? 'bg-white/80 shadow-[0_0_8px_rgba(0,0,0,0.25)] dark:bg-slate-100'
                      : 'bg-slate-300/60 dark:bg-slate-600/60'
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

type StackCardProps = {
  section: StackSection;
  index: number;
};

function StackCard({ section, index }: StackCardProps) {
  const tone = toneBySection[section.id] ?? 'slate';
  const { ref } = useCardAnalytics<HTMLLIElement>({
    id: section.id,
    section: 'stack',
    index,
    payload: { title: section.title },
  });

  const cardId = `stack-${section.id}`;
  const chips = section.chips ?? [];
  const mobileMax = 3;
  const desktopMax = 6;
  const mobileOverflow = Math.max(0, chips.length - mobileMax);
  const desktopOverflow = Math.max(0, chips.length - desktopMax);

  return (
    <li ref={ref} className="group/card list-none">
      <Card
        role="article"
        aria-labelledby={`${cardId}-title`}
        className={`relative flex h-full flex-col gap-3 transition md:hover:-translate-y-1 md:hover:shadow-lg motion-reduce:md:hover:translate-y-0 ${section.surface} ${section.shadow}`}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 md:group-hover/card:opacity-100 ${section.halo}`}
        />
        <header className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-sm dark:bg-white/10">
            {section.emoji}
          </span>
          <Badge tone={tone} size="sm">
            {section.badge}
          </Badge>
        </header>
        <h3
          id={`${cardId}-title`}
          className="mt-2 text-lg font-semibold leading-tight text-slate-900 line-clamp-2 md:mt-3 dark:text-white"
        >
          {section.title}
        </h3>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          {section.intro}
        </p>
        <BulletList items={section.lines} className="mt-1 text-slate-600 dark:text-slate-300" />
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {chips.map((chip, chipIndex) => (
            <Badge
              key={`${section.id}-chip-${chip}`}
              tone={tone}
              size="sm"
              className={
                chipIndex >= mobileMax
                  ? chipIndex >= desktopMax
                    ? 'hidden'
                    : 'hidden md:inline-flex'
                  : ''
              }
            >
              {chip}
            </Badge>
          ))}
          {mobileOverflow > 0 ? (
            <Badge tone={tone} size="sm" className="md:hidden">
              +{mobileOverflow}
            </Badge>
          ) : null}
          {desktopOverflow > 0 ? (
            <Badge tone={tone} size="sm" className="hidden md:inline-flex">
              +{desktopOverflow}
            </Badge>
          ) : null}
        </div>
      </Card>
    </li>
  );
}
