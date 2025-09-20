'use client';
import Link from 'next/link';
import Container from '@/components/Container';
import CarouselRow from '@/components/CarouselRow';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { sendEvent } from '@/lib/analytics';

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

// chips
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

const metricChip = (m: Metric) => `chip ${m.positive ? 'chip-positive' : 'chip-neutral'}`;

// твой массив cases (укоротил тут ради примера)
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
  // …остальные
];

function CaseCard(c: CaseItem) {
  const resultId = `case-${c.slug}-result`;

  return (
    <Card
      key={c.slug}
      className="flex flex-col gap-3 p-6 h-full"
      role="article"
      aria-labelledby={`case-${c.slug}-title`}
      aria-describedby={c.result ? resultId : undefined}
    >
      <div>
        <h3 id={`case-${c.slug}-title`} className="text-lg font-semibold leading-snug">
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

      {c.metrics && (
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
}

export default function Cases() {
  return (
    <section id="cases" className="py-12 sm:py-16">
      <Container>
        <CarouselRow
          id="cases"
          title="Кейсы"
          items={cases}
          render={(c) => <CaseCard {...c} />}
          right={<Link href="/cases" className="text-sm underline opacity-90">Все кейсы</Link>}
        />
      </Container>
    </section>
  );
}
