import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import * as React from 'react';
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
  const base =
    'ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide';
  switch (status) {
    case 'prod':
      return `${base} border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400`;
    case 'delivered':
      return `${base} border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300`;
    case 'ready':
      return `${base} border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300`;
    case 'demo':
      return `${base} border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400`;
    case 'pilot':
      return `${base} border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400`;
    default:
      return base;
  }
};

const ndaChip =
  'ml-2 inline-flex items-center rounded-full border px-2 py-0.5 border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400';

const metricChip = (m: Metric) =>
  `chip ${m.positive ? 'chip-positive' : 'chip-neutral'}`;

const cases: CaseItem[] = [
  {
    slug: 'ab-test-mobile-game',
    title: 'A/B: Cookie Cats — гейт 40→30',
    teaser:
      'D7 вырос статистически значимо → рекомендация: раскатить gate_30. Цепочка: ETL → Postgres → SQL → З-тест.',
    tags: ['Analytics', 'A/B', 'SQL', 'Python/statsmodels', 'PostgreSQL'],
    result: 'Рекомендация подтверждена: D7 ↑ +0.82 п.п. (p=0.0016).',
    metrics: [
      { label: 'D7', value: '+0.82 п.п. (sig)', note: 'p=0.0016', positive: true },
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
      'Предотвращена разработка ненужной фичи ~200 ч экономии; MVP собран за ~5 часов.',
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
      'Архитектура: модульное ядро + профили; детерминированный граф вычислений и пресеты для быстрых ответов.',
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
      'Асинхронная архитектура, быстрый отклик и самокоррекция сценариев; все ключевые настройки в .env.',
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
      'Автопарсинг сайта → сразу в Telegram. Раньше: сайт → Excel → Telegram. Теперь: сайт → Telegram без ручной рутины.',
    tags: [
      'Python',
      'Браузерная автоматизация',
      'API-интеграции',
      'Мониторинг',
      'Excel',
      'Telegram',
    ],
    result:
      'Ключевой отчёт: 7 мин → 15 сек (≈–96%); экономия ~300 000 ₽/мес при текущём объёме.',
    metrics: [
      { label: 'Время', value: '7 мин → 15 сек', positive: true },
      { label: 'Экономия', value: '~300k ₽/мес', note: 'оценка', positive: true },
    ],
    nda: true,
    ctas: [],
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-12 sm:py-16">
      <Container className="px-0 md:px-5">
        <h2 className="mb-6 text-2xl font-semibold">Кейсы</h2>

        {/* Mobile carousel (cases) */}
        <div className="md:hidden mt-2">
          <div
            className="grid auto-cols-[85%] grid-flow-col gap-4 snap-x md:snap-mandatory snap-proximity overflow-x-auto [-webkit-overflow-scrolling:touch] touch-auto md:touch-pan-x scroll-px-0 px-0"
            role="list"
            aria-label="Кейсы"
          >
            {cases.map((it, i) => {
              const vibe = getCaseVibe(it.slug, i);
              const metric = it.metrics?.[0];
              return (
                <div key={i} className="snap-start snap-always" role="listitem">
                  <Card
                    className={`group relative h-full overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 dark:text-white ${vibe.surface} ${vibe.shadow}`}
                    variant="default"
                  >
                    <span
                      aria-hidden
                      className={`absolute -right-8 -top-10 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`}
                    />
                    <div className="relative z-[1] flex h-full flex-col">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl animate-float" aria-hidden>{vibe.emoji}</span>
                        <div className="flex-1">
                          <div className={`text-xs font-semibold uppercase tracking-[0.2em] opacity-75 ${vibe.accent}`}>
                            {vibe.label}
                          </div>
                          <div className="mt-1 text-base font-semibold leading-snug">{it.title}</div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-5 text-slate-800/90 dark:text-slate-100/90">{it.teaser}</p>
                      {metric && (
                        <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ${vibe.chip}`}>
                          <span className="opacity-75">{metric.label}</span>
                          <span>{metric.value}</span>
                        </div>
                      )}
                      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium">
                        {it.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={`rounded-full px-3 py-1 shadow-sm ${vibe.chip}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`/cases/${it.slug}`}
                        className={`mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold tracking-wide transition-colors duration-300 ${vibe.link}`}
                      >
                        <span>Подробнее →</span>
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                      </a>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet/Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c, index) => {
            const resultId = `case-${c.slug}-result`;
            const vibe = getCaseVibe(c.slug, index);
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
                  <div>
                    <div className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-75 ${vibe.accent}`}>
                      <span aria-hidden className="text-lg">{vibe.emoji}</span>
                      {vibe.label}
                    </div>
                    <h3
                      id={`case-${c.slug}-title`}
                      className="mt-2 text-xl font-semibold leading-snug"
                    >
                      {c.title}
                      {c.status && (
                        <span className={statusChip(c.status)}>{c.status}</span>
                      )}
                      {c.nda && <span className={ndaChip}>NDA</span>}
                    </h3>
                    <p className="mt-1 text-sm text-slate-800/90 dark:text-slate-100/90">{c.teaser}</p>
                  </div>
                  {c.result && (
                    <div id={resultId} className="result-callout mt-2 text-sm">
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
                      <span
                        key={t}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${vibe.chip}`}
                      >
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
