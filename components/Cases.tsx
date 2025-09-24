import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import * as React from 'react';

import { badgeBaseClass } from '@/lib/badge';
import { getCaseVibe } from '@/lib/caseVibes';

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

const statusChip = (status?: CaseItem['status']) => {
  if (!status) return '';
  const base = `${badgeBaseClass} backdrop-blur border border-white/30 bg-white/40 text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white`;
  switch (status) {
    case 'prod':
      return `${base} text-emerald-700 dark:text-emerald-200`;
    case 'delivered':
      return `${base} text-cyan-700 dark:text-cyan-200`;
    case 'ready':
      return `${base} text-indigo-700 dark:text-indigo-200`;
    case 'demo':
      return `${base} text-amber-600 dark:text-amber-200`;
    case 'pilot':
      return `${base} text-sky-600 dark:text-sky-200`;
    default:
      return base;
  }
};

const ndaChip = `${badgeBaseClass} backdrop-blur border border-fuchsia-300/60 bg-white/50 text-fuchsia-700 dark:border-fuchsia-400/35 dark:bg-fuchsia-500/20 dark:text-fuchsia-50`;

const metricChip = (m: Metric) =>
  `chip ${m.positive ? 'chip-positive' : 'chip-neutral'}`;

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
        variant: 'accent',
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
    metrics: [{ label: 'Экономия', value: '~200 ч разработки', positive: true }],
    status: 'delivered',
    ctas: [
      {
        label: 'Демо',
        href: 'https://log-calc.streamlit.app/',
        kind: 'external',
        variant: 'accent',
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
        variant: 'accent',
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
        variant: 'accent',
      },
      {
        label: 'Код (landing)',
        href: 'https://github.com/IDSidorov-data/scenario-landing',
        kind: 'external',
        variant: 'accent',
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
        variant: 'accent',
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
      { label: 'Время', value: '7 мин → 15 сек', positive: true },
      { label: 'Экономия', value: '~300k ₽/мес', note: 'оценка', positive: true },
    ],
    nda: true,
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-12 sm:py-16">
      <Container className="px-0 md:px-5">
        <h2 className="mb-6 text-3xl font-semibold">Кейсы</h2>

        {/* Mobile carousel */}
        <div className="md:hidden mt-2">
          <div
            className="grid auto-cols-[85%] grid-flow-col gap-4 snap-x snap-mandatory overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
            role="list"
            aria-label="Кейсы"
          >
            {cases.map((it, index) => {
              const vibe = getCaseVibe(it.slug, index);
              const metric = it.metrics?.[0];
              const badgeClass = `${badgeBaseClass} ${vibe.chip}`;

              return (
                <div key={it.slug} className="snap-start snap-always" role="listitem">
                  <Card
                    variant="default"
                    className={`group relative h-full overflow-hidden border border-transparent p-6 text-slate-900 shadow-[0_18px_44px_-20px_rgba(15,23,42,0.22)] transition-all duration-500 ease-out dark:text-white ${vibe.surface} ${vibe.shadow}`}
                  >
                    <span
                      aria-hidden
                      className={`absolute -right-8 -top-12 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`}
                    />
                    <div className="relative z-[1] flex h-full flex-col">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl animate-float" aria-hidden>
                          {vibe.emoji}
                        </span>
                        <span className={badgeClass}>{vibe.label}</span>
                      </div>
                      <h3 className="mt-3 text-base font-semibold leading-snug">{it.title}</h3>
                      <p className="mt-2 text-sm leading-5 text-slate-800/90 dark:text-slate-100/90">{it.teaser}</p>
                      {metric && (
                        <div className={`${badgeBaseClass} mt-4 inline-flex items-center gap-2 backdrop-blur border border-white/40 bg-white/75 text-[11px] font-semibold text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white`}>
                          <span className="opacity-75">{metric.label}</span>
                          <span>{metric.value}</span>
                        </div>
                      )}
                      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold">
                        {it.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={`${badgeBaseClass} backdrop-blur border border-white/35 bg-white/70 text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`/cases/${it.slug}`}
                        className={`mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold tracking-wide transition-colors duration-300 ${vibe.link}`}
                      >
                        <span>Подробнее →</span>
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </a>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 gap-4 lg:grid-cols-3">
          {cases.map((c, index) => {
            const resultId = `case-${c.slug}-result`;
            const vibe = getCaseVibe(c.slug, index);
            const badgeClass = `${badgeBaseClass} ${vibe.chip}`;

            return (
              <Card
                key={c.slug}
                className={`group relative flex flex-col overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 dark:text-white ${vibe.surface} ${vibe.shadow}`}
                role="article"
                aria-labelledby={`case-${c.slug}-title`}
                aria-describedby={c.result ? resultId : undefined}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`}
                />
                <div className="relative z-[1] flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={badgeClass}>
                      <span aria-hidden className="text-lg">
                        {vibe.emoji}
                      </span>
                      {vibe.label}
                    </span>
                    {c.status && <span className={statusChip(c.status)}>{c.status}</span>}
                    {c.nda && <span className={ndaChip}>NDA</span>}
                  </div>
                  <h3 id={`case-${c.slug}-title`} className="text-xl font-semibold leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-sm text-slate-800/85 dark:text-slate-100/85">{c.teaser}</p>

                  {c.result && (
                    <div
                      id={resultId}
                      className="rounded-2xl border border-white/40 bg-white/65 p-4 text-sm font-medium text-slate-800 shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
                    >
                      {c.result}
                    </div>
                  )}

                  {c.metrics && c.metrics.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {c.metrics.map((m, i) => (
                        <span
                          key={i}
                          className={metricChip(m)}
                          title={m.note || ''}
                        >
                          <span className="mr-1 opacity-70">{m.label}:</span>{' '}
                          {m.value}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    {c.tags.map((t) => (
                      <span key={t} className={`${badgeBaseClass} backdrop-blur border border-white/35 bg-white/70 text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-[1] mt-auto flex flex-wrap items-center gap-3 pt-4">
                  <Button
                    variant="primary"
                    href={`/cases/${c.slug}`}
                    aria-label={`Читать разбор: ${c.title}`}
                    className="transition-transform duration-300 hover:translate-x-0.5"
                  >
                    Читать разбор
                  </Button>
                  {c.ctas?.map((cta) => (
                    <Button
                      key={cta.label}
                      variant={cta.variant || 'secondary'}
                      href={cta.href}
                      target={cta.kind === 'external' ? '_blank' : undefined}
                      rel={
                        cta.kind === 'external'
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      aria-label={`${cta.label}: ${c.title}`}
                      className="transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      {cta.label}
                    </Button>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
