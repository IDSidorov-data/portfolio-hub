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
  const base = `${badgeBaseClass} backdrop-blur border border-white/35 bg-white/55 text-slate-700 dark:border-white/20 dark:bg-white/10 dark:text-white`;
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

const ndaChip = `${badgeBaseClass} backdrop-blur border border-fuchsia-400/40 bg-white/60 text-fuchsia-700 dark:border-fuchsia-400/35 dark:bg-fuchsia-500/25 dark:text-fuchsia-50`;

const metricChip = (m: Metric) => `chip ${m.positive ? 'chip-positive' : 'chip-neutral'}`;

const cases: CaseItem[] = [
  {
    slug: 'ab-test-mobile-game',
    title: 'A/B: Cookie Cats — gate_30',
    teaser: 'D7 вырос статистически значимо → решение раскатить gate_30. Цепочка: ETL → Postgres → SQL → Z-тест.',
    tags: ['Analytics', 'A/B', 'SQL', 'Python/statsmodels', 'PostgreSQL'],
    result: 'Рекомендация подтверждена: D7 ↑ +0.82 п.п. (p = 0.0016).',
    metrics: [{ label: 'D7', value: '+0.82 п.п. (sig)', note: 'p = 0.0016', positive: true }],
    status: 'prod',
    ctas: [
      { label: 'Код', href: 'https://github.com/IDSidorov-data/mobile-game-ab-test-analysis', kind: 'external', variant: 'accent' },
    ],
  },
  {
    slug: 'logistics-calculator',
    title: 'Логистика: калькулятор маржи (MVP)',
    teaser: 'Мгновенный расчёт и индикатор “выгодно/убыточно”. Интервью → pivot к калькулятору ценообразования (MVP v2).',
    tags: ['Streamlit', 'Python', 'Product Discovery'],
    result: 'Предотвращена лишняя разработка (~200 ч экономии); MVP собран за 5 часов.',
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
    teaser: 'Песочница юнит-экономики: профили доходов/затрат, what-if и чувствительность; каскадный пересчёт, расширяемые модули.',
    tags: ['Analytics', 'Modeling', 'Core', 'What-if', 'Sensitivity'],
    result: 'Архитектура: модульное ядро + профили; детерминированный граф и пресеты для быстрых ответов.',
    status: 'ready',
    ctas: [
      { label: 'Код (core)', href: 'https://github.com/IDSidorov-data/scenario-core', kind: 'external', variant: 'accent' },
      { label: 'Прототип', href: 'https://github.com/IDSidorov-data/scenario-proto', kind: 'external', variant: 'accent' },
    ],
  },
  {
    slug: 'loki-assistant',
    title: 'LOKI: ассистент для интерфейса',
    teaser: 'Лёгкий ассистент на базе LLМ для интерфейса: контекст, быстрые действия и внедрение без боли.',
    tags: ['AI', 'Next.js', 'LLM', 'Assistant'],
    status: 'demo',
  },
  {
    slug: 'rpa-bot',
    title: 'RPA: сценарии и интеграции',
    teaser: 'Телеграм‑боты, интеграции, парсинг документов и рассылки. Экономия времени и меньше рутины.',
    tags: ['Automation', 'aiogram', 'Playwright', 'RPA'],
    status: 'delivered',
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-12 sm:py-16">
      <Container className="px-0 md:px-5">
        <h2 className="mb-6 text-2xl font-semibold">Кейсы</h2>

        {/* Mobile carousel (cards) */}
        <div className="md:hidden mt-2">
          <div className="grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory [overscroll-behavior-x:contain] [-webkit-overflow-scrolling:touch] touch-pan-x scroll-px-4 px-4 overscroll-x-contain" role="list" aria-label="Кейсы">
            {cases.map((c, index) => {
              const vibe = getCaseVibe(c.slug, index);
              const badgeClass = `${badgeBaseClass} ${vibe.chip}`;

              return (
                <div key={c.slug} className="snap-start snap-always" role="listitem">
                  <Card className={`group relative h-full overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] dark:text-white ${vibe.surface} ${vibe.shadow}`} variant="default">
                    <span aria-hidden className={`absolute -right-10 -top-14 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`} />
                    <div className="relative z-[1] flex h-full flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className={badgeClass}>
                          <span aria-hidden className="text-lg">{vibe.emoji}</span>
                          {vibe.label}
                        </span>
                        {c.status && <span className={statusChip(c.status)}>{c.status}</span>}
                        {c.nda && <span className={ndaChip}>NDA</span>}
                      </div>
                      <div className="text-base font-semibold leading-snug">{c.title}</div>
                      <p className="text-sm opacity-85">{c.teaser}</p>
                      <a href={`/cases/${c.slug}`} className={`mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold tracking-wide transition-colors duration-300 ${vibe.link}`}>
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

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 gap-4 lg:grid-cols-3">
          {cases.map((c, index) => {
            const vibe = getCaseVibe(c.slug, index);
            const badgeClass = `${badgeBaseClass} ${vibe.chip}`;
            const resultId = `case-${c.slug}-result`;

            return (
              <Card
                key={c.slug}
                className={`group relative flex flex-col overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 dark:text-white ${vibe.surface} ${vibe.shadow}`}
                role="article"
                aria-labelledby={`case-${c.slug}-title`}
                aria-describedby={c.result ? resultId : undefined}
              >
                <span aria-hidden className={`pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`} />
                <div className="relative z-[1] flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={badgeClass}>
                      <span aria-hidden className="text-lg">{vibe.emoji}</span>
                      {vibe.label}
                    </span>
                    {c.status && <span className={statusChip(c.status)}>{c.status}</span>}
                    {c.nda && <span className={ndaChip}>NDA</span>}
                  </div>
                  <h3 id={`case-${c.slug}-title`} className="text-xl font-semibold leading-snug">{c.title}</h3>
                  <p className="text-sm text-slate-800/85 dark:text-slate-100/85">{c.teaser}</p>

                  {c.result && (
                    <div id={resultId} className="rounded-2xl border border-white/40 bg-white/65 p-4 text-sm font-medium text-slate-800 shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-slate-100">
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
                      <span key={t} className={`${badgeBaseClass} border border-white/35 bg-white/70 text-slate-700 shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-white`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-[1] mt-auto flex flex-wrap items-center gap-3 pt-4">
                  <Button variant="primary" href={`/cases/${c.slug}`} aria-label={`Читать разбор: ${c.title}`} className="transition-transform duration-300 hover:translate-x-0.5">
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
