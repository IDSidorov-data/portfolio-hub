import Container from '@/components/Container';
import CarouselRow from '@/components/CarouselRow';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { sendEvent } from '@/lib/analytics';
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
  // добавили новые статусы
  status?: 'prod' | 'demo' | 'pilot' | 'delivered' | 'ready';
  nda?: boolean;
  ctas?: CTA[];
};

// status chips (добавлены delivered, ready)
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
  'ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400';

// chip classes определены в app/globals.css
const metricChip = (m: Metric) => `chip ${m.positive ? 'chip-positive' : 'chip-neutral'}`;

const cases: CaseItem[] = [
  {
    slug: 'ab-test-mobile-game',
    title: 'A/B: Cookie Cats — гейт 40→30',
    teaser:
      'D7 вырос статистически значимо → рекомендация: раскатить gate_30. Цепочка: ETL → Postgres → SQL → Z-тест.',
    tags: ['Analytics', 'A/B', 'SQL', 'Python/statsmodels', 'PostgreSQL'],
    result: 'Рекомендация подтверждена: D7 ↑ +0.82 п.п. (p=0.0016).',
    metrics: [{ label: 'D7', value: '+0.82 п.п. (sig)', note: 'p=0.0016', positive: true }],
    status: 'prod',
    ctas: [
      { label: 'Код', href: 'https://github.com/IDSidorov-data/mobile-game-ab-test-analysis', kind: 'external', variant: 'accent' },
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
      { label: 'Демо', href: 'https://log-calc.streamlit.app/', kind: 'external', variant: 'accent' },
      { label: 'ТЗ v2', href: 'https://github.com/IDSidorov-data/logistics_calculator/blob/main/MVP_v2_SPEC.md', kind: 'external', variant: 'accent' },
      { label: 'Код', href: 'https://github.com/IDSidorov-data/logistics_calculator', kind: 'external', variant: 'accent' },
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
      { label: 'Код (core)', href: 'https://github.com/IDSidorov-data/scenario-core', kind: 'external', variant: 'accent' },
      { label: 'Код (landing)', href: 'https://github.com/IDSidorov-data/scenario-landing', kind: 'external', variant: 'accent' },
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
      { label: 'Код', href: 'https://github.com/IDSidorov-data/loki-reborn-ai-assistant', kind: 'external', variant: 'accent' },
    ],
  },

  {
    slug: 'rpa-bot',
    title: 'RPA-бот',
    teaser:
      'Автопарсинг сайта → сразу в Telegram. Раньше: сайт → Excel → Telegram. Теперь: сайт → Telegram без ручной рутины.',
    tags: ['Python', 'Браузерная автоматизация', 'API-интеграции', 'Мониторинг', 'Excel', 'Telegram'],
    result: 'Ключевой отчёт: 7 мин → 15 сек (≈–96%); экономия ~300 000 ₽/мес при текущём объёме.',
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
      <Container>
        <h2 className="mb-6 text-3xl font-semibold">Кейсы</h2>
      {/* Mobile carousel (cases) */}
      <div className="md:hidden mt-2">
        <div className="grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory touch-pan-x" role="list" aria-label="Кейсы">
          {cases.map((it, i) => (
            <div key={i} className="snap-start" role="listitem">
              <div className="h-full rounded-2xl border p-4 shadow-sm">
                <div className="text-base font-semibold">{it.title}</div>
                <p className="mt-2 text-sm opacity-80">{it.teaser}</p>
                <a href={`/cases/${it.slug}`} className="mt-3 inline-block text-sm font-medium underline underline-offset-4">Подробнее →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    
        <div className="hidden md:grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const resultId = `case-${c.slug}-result`;
            return (
              <Card
                key={c.slug}
                className="flex flex-col gap-3 p-6 focus-within:shadow-md"
                role="article"
                aria-labelledby={`case-${c.slug}-title`}
                aria-describedby={c.result ? resultId : undefined}
              >
                <div>
                  <h3 id={`case-${c.slug}-title`} className="text-xl font-semibold leading-snug">
                    {c.title}
                    {c.status && <span className={statusChip(c.status)}>{c.status}</span>}
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
                      <span key={i} className={metricChip(m)} title={m.note || ''}>
                        <span className="mr-1 opacity-70">{m.label}:</span> {m.value}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border px-3 py-1 opacity-80">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    variant="primary"
                    href={`/cases/${c.slug}`}
                    aria-label={`Читать разбор: ${c.title}`}
                    onClick={() => sendEvent(`click_case_${c.slug}_read`)}
                  >
                    Читать разбор
                  </Button>

                  {c.ctas?.map((cta) => (
                    <Button
                      key={cta.label}
                      variant={cta.variant || 'secondary'}
                      href={cta.href}
                      target={cta.kind === 'external' ? '_blank' : undefined}
                      rel={cta.kind === 'external' ? 'noopener noreferrer' : undefined}
                      aria-label={`${cta.label}: ${c.title}`}
                      onClick={() => sendEvent(`click_case_${c.slug}_${cta.label.toLowerCase()}`)}
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
