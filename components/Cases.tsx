import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import * as React from 'react';

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

type MobileCaseVibe = {
  emoji: string;
  label: string;
  surface: string;
  shadow: string;
  accent: string;
  chip: string;
  link: string;
};

const mobileCasePalette: MobileCaseVibe[] = [
  {
    emoji: '🎮',
    label: 'A/B',
    surface: 'bg-gradient-to-br from-rose-100 via-orange-50/80 to-amber-100 dark:from-rose-500/25 dark:via-orange-500/10 dark:to-amber-500/10',
    shadow: 'shadow-[0_18px_42px_-22px_rgba(244,114,182,0.55)]',
    accent: 'text-rose-700 dark:text-rose-200',
    chip: 'bg-white/75 text-rose-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-rose-100 dark:border-white/15',
    link: 'text-rose-700 hover:text-rose-800 dark:text-rose-100 dark:hover:text-rose-50',
  },
  {
    emoji: '🚚',
    label: 'Ops',
    surface: 'bg-gradient-to-br from-emerald-100 via-sky-50 to-lime-100 dark:from-emerald-500/20 dark:via-sky-500/10 dark:to-lime-500/10',
    shadow: 'shadow-[0_18px_42px_-22px_rgba(16,185,129,0.45)]',
    accent: 'text-emerald-700 dark:text-emerald-200',
    chip: 'bg-white/75 text-emerald-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-emerald-100 dark:border-white/15',
    link: 'text-emerald-700 hover:text-emerald-800 dark:text-emerald-100 dark:hover:text-emerald-50',
  },
  {
    emoji: '🧠',
    label: 'Modeling',
    surface: 'bg-gradient-to-br from-violet-100 via-indigo-50 to-sky-100 dark:from-violet-500/25 dark:via-indigo-500/15 dark:to-sky-500/10',
    shadow: 'shadow-[0_18px_42px_-22px_rgba(129,140,248,0.45)]',
    accent: 'text-violet-700 dark:text-violet-200',
    chip: 'bg-white/75 text-violet-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-violet-100 dark:border-white/15',
    link: 'text-violet-700 hover:text-violet-800 dark:text-violet-100 dark:hover:text-violet-50',
  },
  {
    emoji: '🤖',
    label: 'AI',
    surface: 'bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 dark:from-sky-500/25 dark:via-indigo-600/15 dark:to-purple-600/15',
    shadow: 'shadow-[0_18px_42px_-22px_rgba(56,189,248,0.45)]',
    accent: 'text-sky-700 dark:text-sky-200',
    chip: 'bg-white/75 text-sky-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-sky-100 dark:border-white/15',
    link: 'text-sky-700 hover:text-sky-800 dark:text-sky-100 dark:hover:text-sky-50',
  },
  {
    emoji: '🛠️',
    label: 'Automation',
    surface: 'bg-gradient-to-br from-amber-100 via-orange-50 to-lime-100 dark:from-amber-500/20 dark:via-orange-500/10 dark:to-lime-500/10',
    shadow: 'shadow-[0_18px_42px_-22px_rgba(251,191,36,0.45)]',
    accent: 'text-amber-700 dark:text-amber-200',
    chip: 'bg-white/75 text-amber-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-amber-100 dark:border-white/15',
    link: 'text-amber-700 hover:text-amber-800 dark:text-amber-100 dark:hover:text-amber-50',
  },
];

const mobileCaseVibes: Record<string, MobileCaseVibe> = {
  'ab-test-mobile-game': mobileCasePalette[0],
  'logistics-calculator': mobileCasePalette[1],
  'scenario': mobileCasePalette[2],
  'loki-assistant': mobileCasePalette[3],
  'rpa-bot': mobileCasePalette[4],
};

const mobileCaseFallbacks = mobileCasePalette;

const cases: CaseItem[] = [
  {
    slug: 'ab-test-mobile-game',
    title: 'A/B: Cookie Cats — гейт 40→30',
    teaser:
      'D7 вырос статистически значимо → рекомендация: раскатить gate_30. Цепочка: ETL → Postgres → SQL → Z-тест.',
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
              const vibe = mobileCaseVibes[it.slug] ?? mobileCaseFallbacks[i % mobileCaseFallbacks.length];
              const metric = it.metrics?.[0];
              return (
                <div key={i} className="snap-start snap-always" role="listitem">
                  <Card
                    className={`group relative h-full overflow-hidden border border-transparent p-6 text-slate-900 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 dark:text-white ${vibe.surface} ${vibe.shadow}`}
                    variant="default"
                  >
                    <span
                      aria-hidden
                      className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/40 blur-3xl dark:bg-white/5"
                    />
                    <div className="relative z-[1] flex h-full flex-col">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{vibe.emoji}</span>
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
                        className={`mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold tracking-wide ${vibe.link}`}
                      >
                        <span>Подробнее →</span>
                        <span aria-hidden>↗</span>
                      </a>
                    </div>
                  </Card>
                </div>
              );
            })}

          </div>
        </div>

        {/* Tablet/Desktop grid */}
        <div className="hidden md:grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const resultId = `case-${c.slug}-result`;
            return (
              <Card
                key={c.slug}
                className="flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-within:shadow-md gap-3 h-full hover:translate-y-[1px] p-6 transition"
                role="article"
                aria-labelledby={`case-${c.slug}-title`}
                aria-describedby={c.result ? resultId : undefined}
              >
                <div>
                  <h3
                    id={`case-${c.slug}-title`}
                    className="text-xl font-semibold leading-snug"
                  >
                    {c.title}
                    {c.status && (
                      <span className={statusChip(c.status)}>{c.status}</span>
                    )}
                    {c.nda && <span className={ndaChip}>NDA</span>}
                  </h3>
                  <p className="mt-1 text-sm opacity-80">{c.teaser}</p>
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
                      className="rounded-full border border-border px-3 py-1 opacity-80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    variant="primary"
                    href={`/cases/${c.slug}`}
                    aria-label={`Читать разбор: ${c.title}`}
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
