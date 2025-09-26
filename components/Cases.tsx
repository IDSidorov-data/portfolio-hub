'use client';

import * as React from 'react';
import clsx from '@/lib/clsx';

import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/primitives/Badge';
import MetricBadge from '@/components/primitives/MetricBadge';
import { useCardAnalytics } from '@/components/hooks/useCardAnalytics';
import { useSnapCarousel } from '@/components/hooks/useSnapCarousel';
import { getCaseVibe } from '@/lib/caseVibes';
import { sendEvent } from '@/lib/analytics';
import type { BadgeTone } from '@/lib/badge';

type Metric = {
  label: string;
  value: string;
  note?: string;
  positive?: boolean;
};

type CTA = {
  label: string;
  href: string;
  kind?: 'internal' | 'external';
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
};

type CaseItem = {
  slug: string;
  title: string;
  teaser: string;
  tags: string[];
  result?: string;
  metrics?: Metric[];
  status?: 'prod' | 'demo' | 'pilot' | 'delivered' | 'ready';
  nda?: boolean;
  ctas?: CTA[];
};

const cases: CaseItem[] = [
  {
    slug: 'ab-test-mobile-game',
    title: 'A/B: Cookie Cats — gate_30',
    teaser:
      'D7 вырос статистически значимо → решение раскатить gate_30. Цепочка: ETL → Postgres → SQL → Z-тест.',
    tags: ['Analytics', 'A/B', 'SQL', 'Python/statsmodels', 'PostgreSQL'],
    result: 'Рекомендация подтверждена: D7 ↑ +0.82 п.п. (p = 0.0016).',
    metrics: [
      { label: 'D7', value: '+0.82 п.п. (sig)', note: 'p = 0.0016', positive: true },
    ],
    status: 'prod',
    ctas: [
      {
        label: 'Код',
        href: 'https://github.com/IDSidorov-data/mobile-game-ab-test-analysis',
        kind: 'external',
        variant: 'ghost',
      },
    ],
  },
  {
    slug: 'logistics-calculator',
    title: 'Логистика: калькулятор маржи (MVP)',
    teaser:
      'Мгновенный расчёт и индикатор “выгодно/убыточно”. Интервью → pivot к калькулятору ценообразования (MVP v2).',
    tags: ['Streamlit', 'Python', 'Product Discovery'],
    result:
      'Предотвращена лишняя разработка (~200 часов); MVP собран за 5 часов.',
    metrics: [
      { label: 'Экономия разработки', value: '~200 ч', note: 'оценка', positive: true },
    ],
    status: 'delivered',
    ctas: [
      {
        label: 'Демо',
        href: 'https://log-calc.streamlit.app/',
        kind: 'external',
        variant: 'ghost',
      },
      {
        label: 'ТЗ v2',
        href: 'https://github.com/IDSidorov-data/logistics_calculator/blob/main/MVP_v2_SPEC.md',
        kind: 'external',
        variant: 'accent',
      },
      {
        label: 'Код',
        href: 'https://github.com/IDSidorov-data/logistics_calculator',
        kind: 'external',
        variant: 'ghost',
      },
    ],
  },
  {
    slug: 'scenario',
    title: 'Scenario: модульная платформа моделирования',
    teaser:
      'Песочница юнит-экономики: профили доходов/затрат, what-if и чувствительность; каскадный пересчёт, расширяемые модули.',
    tags: ['Analytics', 'Modeling', 'Core', 'What-if', 'Sensitivity'],
    result:
      'Архитектура: модульное ядро + профили; детерминированный граф расчётов и пресеты для быстрых ответов.',
    status: 'ready',
    ctas: [
      {
        label: 'Код (core)',
        href: 'https://github.com/IDSidorov-data/scenario-core',
        kind: 'external',
        variant: 'ghost',
      },
      {
        label: 'Код (landing)',
        href: 'https://github.com/IDSidorov-data/scenario-landing',
        kind: 'external',
        variant: 'ghost',
      },
    ],
  },
  {
    slug: 'loki-assistant',
    title: 'LOKI — голосовой AI-ассистент',
    teaser:
      'Три контура: локальные команды, LLM-классификация, визуальный анализ. Async/await + httpx → низкая задержка; потоковый TTS с прерыванием.',
    tags: ['Async/await', 'httpx', 'Whisper', 'Piper TTS', 'Gemini', 'Python/Poetry'],
    result:
      'Асинхронная архитектура, быстрый отклик и самокоррекция сценариев; ключевые настройки — в .env.',
    status: 'demo',
    ctas: [
      {
        label: 'Код',
        href: 'https://github.com/IDSidorov-data/loki-reborn-ai-assistant',
        kind: 'external',
        variant: 'ghost',
      },
    ],
  },
  {
    slug: 'rpa-bot',
    title: 'RPA-бот',
    teaser:
      'Автопарсинг сайта → Telegram. Раньше: сайт → Excel → Telegram. Теперь: сайт → Telegram без ручной рутины.',
    tags: ['Python', 'Браузерная автоматизация', 'API-интеграции', 'Мониторинг', 'Excel', 'Telegram'],
    result:
      'Ключевой отчёт: 7 мин → 15 сек (−96%); экономия ~300 000 ₽/мес при текущем объёме.',
    metrics: [
      { label: 'Время отчёта', value: '7 мин → 15 сек', note: '−96%', positive: true },
      { label: 'Экономия бюджета', value: '~300k ₽/мес', note: 'оценка', positive: true },
    ],
    nda: true,
  },
];

const statusTone: Record<NonNullable<CaseItem['status']>, BadgeTone> = {
  prod: 'emerald',
  delivered: 'sky',
  pilot: 'sky',
  demo: 'amber',
  ready: 'purple',
};

function toDataQa(value: string) {
  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u0400-\u04FF-]/g, '');

  return normalized.length > 0 ? normalized : 'cta';
}

export default function Cases() {
  const { listRef, activeIndex, handleKeyDown, handleScroll } = useSnapCarousel(cases.length);

  const reportedIndexRef = React.useRef(0);
  React.useEffect(() => {
    if (activeIndex === reportedIndexRef.current) {
      return;
    }
    const current = cases[activeIndex];
    if (!current) {
      return;
    }
    reportedIndexRef.current = activeIndex;
    sendEvent('carousel_swipe', { case_id: current.slug, position: activeIndex });
  }, [activeIndex]);

  return (
    <section id="cases" className="py-16 sm:py-24">
      <Container>
        <header className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Кейсы
          </p>
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Результаты и прототипы</h2>
          <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Выборка проектов с измеримыми результатами, готовыми демо и открытым кодом.
          </p>
        </header>

        <div role="group" aria-roledescription="carousel" aria-label="Кейсы">
          <ul
            ref={listRef}
            className="case-carousel"
            role="list"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
          >
            {cases.map((item, index) => (
              <CaseCard key={item.slug} item={item} index={index} />
            ))}
          </ul>
          <div className="mt-4 flex justify-center gap-2 md:hidden" aria-hidden="true">
            {cases.map((caseItem, index) => (
              <span
                key={caseItem.slug}
                className={clsx(
                  'h-1.5 w-6 rounded-full transition-colors',
                  activeIndex === index
                    ? 'bg-white/80 shadow-[0_0_8px_rgba(0,0,0,0.25)] dark:bg-slate-100'
                    : 'bg-slate-300/60 dark:bg-slate-600/60'
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

type CaseCardProps = {
  item: CaseItem;
  index: number;
};

function CaseCard({ item, index }: CaseCardProps) {
  const vibe = getCaseVibe(item.slug, index);
  const { ref, trackClick } = useCardAnalytics<HTMLLIElement>({
    id: item.slug,
    section: 'cases',
    index,
    payload: { title: item.title },
  });

  const tags = item.tags || [];
  const mobileMax = 3;
  const desktopMax = 6;
  const mobileOverflow = Math.max(0, tags.length - mobileMax);
  const desktopOverflow = Math.max(0, tags.length - desktopMax);
  const cardId = `case-${item.slug}`;

  return (
    <li ref={ref} className="group/card list-none">
      <Card
        aria-labelledby={`${cardId}-title`}
        aria-describedby={item.result ? `${cardId}-result` : undefined}
        className={clsx(
          'case-card relative flex h-full flex-col gap-4 transition md:hover:-translate-y-1 md:hover:shadow-lg motion-reduce:md:hover:translate-y-0',
          vibe.surface,
          vibe.shadow
        )}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 md:group-hover/card:opacity-100 ${vibe.halo}`}
        />
        <header className="flex flex-wrap items-center gap-2">
          <Badge tone={vibe.tone} size="sm" leftIcon={vibe.emoji}>
            {vibe.label}
          </Badge>
          {item.status ? (
            <Badge tone={statusTone[item.status] ?? 'slate'} size="sm">
              {item.status.toUpperCase()}
            </Badge>
          ) : null}
          {item.nda ? (
            <Badge tone="rose" size="sm">
              NDA
            </Badge>
          ) : null}
        </header>
        <h3
          id={`${cardId}-title`}
          className="case-card__title mt-2 text-lg font-semibold leading-tight text-slate-900 line-clamp-2 md:mt-3 dark:text-white"
        >
          {item.title}
        </h3>
        <p className="case-card__desc text-sm leading-6 text-slate-600 line-clamp-2 dark:text-slate-200">
          {item.teaser}
        </p>
        {item.result ? (
          <p
            id={`${cardId}-result`}
            className="case-card__result rounded-xl p-4 text-sm font-medium leading-6 backdrop-blur"
          >
            {item.result}
          </p>
        ) : null}
        {item.metrics && item.metrics.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {item.metrics.map((metric, metricIndex) => (
              <MetricBadge
                key={`${item.slug}-metric-${metricIndex}`}
                value={metric.value}
                label={metric.label}
                note={metric.note}
                positive={metric.positive}
              />
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, tagIndex) => (
            <Badge
              key={tag}
              tone="slate"
              size="sm"
              className={clsx(
                tagIndex >= mobileMax && 'hidden md:inline-flex',
                tagIndex >= desktopMax && 'hidden'
              )}
            >
              {tag}
            </Badge>
          ))}
          {mobileOverflow > 0 ? (
            <Badge tone="slate" size="sm" className="md:hidden">
              +{mobileOverflow}
            </Badge>
          ) : null}
          {desktopOverflow > 0 ? (
            <Badge tone="slate" size="sm" className="hidden md:inline-flex">
              +{desktopOverflow}
            </Badge>
          ) : null}
        </div>
        <footer className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          <Button
            variant="ghost"
            href={`/cases/${item.slug}`}
            className="case-card__cta case-card__cta--primary min-h-[44px] px-5"
            data-qa={`cta-view-case-${item.slug}`}
            onClick={() => {
              trackClick({ action: 'cta_primary' });
              sendEvent('view_case', { case_id: item.slug, position: index });
            }}
          >
            Смотреть кейс
          </Button>
          {item.ctas?.map((cta, ctaIndex) => {
            const variant = cta.variant || 'secondary';
            const normalizedLabel = cta.label.toLowerCase().trim();
            const isCodeLike = normalizedLabel.startsWith('код');
            const isDemo = normalizedLabel.startsWith('демо');
            const isTz = normalizedLabel.startsWith('тз');
            const accentTone = variant === 'accent';
            const blueTone = isCodeLike || isDemo || isTz || accentTone;

            return (
              <Button
                key={cta.label}
                variant={variant}
                href={cta.href}
                target={cta.kind === 'external' ? '_blank' : undefined}
                rel={cta.kind === 'external' ? 'noopener noreferrer' : undefined}
                className={clsx(
                  'case-card__cta min-h-[44px] px-4',
                  blueTone ? 'case-card__cta--blue' : 'case-card__cta--secondary'
                )}
                data-qa={`cta-case-${item.slug}-${ctaIndex}-${toDataQa(cta.label)}`}
                onClick={() => {
                  trackClick({ action: 'cta_secondary', label: cta.label, href: cta.href });
                }}
              >
                {cta.label}
              </Button>
            );
          })}
        </footer>
      </Card>
    </li>
  );
}
