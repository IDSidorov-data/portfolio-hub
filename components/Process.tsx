'use client';

import Container from '@/components/Container';
import Card from '@/components/Card';
import Badge from '@/components/primitives/Badge';
import { useCardAnalytics } from '@/components/hooks/useCardAnalytics';
import type { BadgeTone } from '@/lib/badge';

const steps = [
  {
    title: 'Дискавери и гипотезы',
    text: 'Совместно формируем контекст, собираем данные, определяем критерии успеха. Подготовлю бэклог задач и дорожную карту.',
  },
  {
    title: 'Запуск MVP',
    text: 'Собираю рабочий прототип за 1–3 недели: backend, интеграции, UI. Настраиваем метрики и доступы, готовим к релизу.',
  },
  {
    title: 'Рост и масштабирование',
    text: 'Подключаем эксперименты, автоматизации, отчёты. Разворачиваем аналитику и улучшаем ключевые показатели.',
  },
  {
    title: 'Поддержка и развитие',
    text: 'Передаю проект, документирую процессы и остаюсь на связи. Могу помогать с дальнейшими итерациями и развитием команды.',
  },
];

type StepVibe = {
  emoji: string;
  label: string;
  tone: BadgeTone;
  surface: string;
  shadow: string;
  halo: string;
};

const stepVibes: StepVibe[] = [
  {
    emoji: '🔍',
    label: 'Discovery',
    tone: 'sky',
    surface:
      'bg-gradient-to-br from-sky-50 via-blue-50/80 to-indigo-50 dark:from-sky-500/15 dark:via-blue-500/15 dark:to-indigo-500/15',
    shadow: 'shadow-[0_18px_40px_-22px_rgba(59,130,246,0.28)]',
    halo: 'bg-sky-200/35 dark:bg-sky-500/20',
  },
  {
    emoji: '🛠️',
    label: 'MVP',
    tone: 'amber',
    surface:
      'bg-gradient-to-br from-amber-50 via-orange-50/80 to-lime-50 dark:from-amber-500/15 dark:via-orange-500/15 dark:to-lime-500/15',
    shadow: 'shadow-[0_18px_40px_-22px_rgba(251,191,36,0.28)]',
    halo: 'bg-amber-200/35 dark:bg-amber-500/20',
  },
  {
    emoji: '📊',
    label: 'Scale',
    tone: 'emerald',
    surface:
      'bg-gradient-to-br from-emerald-50 via-teal-50/80 to-sky-50 dark:from-emerald-500/15 dark:via-teal-500/15 dark:to-sky-500/15',
    shadow: 'shadow-[0_18px_40px_-22px_rgba(16,185,129,0.28)]',
    halo: 'bg-emerald-200/35 dark:bg-emerald-500/20',
  },
  {
    emoji: '🚀',
    label: 'Launch',
    tone: 'purple',
    surface:
      'bg-gradient-to-br from-purple-50 via-violet-50/80 to-rose-50 dark:from-purple-500/15 dark:via-violet-500/15 dark:to-rose-500/15',
    shadow: 'shadow-[0_18px_40px_-22px_rgba(147,51,234,0.28)]',
    halo: 'bg-purple-200/35 dark:bg-purple-500/20',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-24">
      <Container>
        <header className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Как работаем
          </p>
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Процесс от запроса до запуска</h2>
          <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Шаги, которые проходим вместе с командой: от брифа и первичных гипотез до метрик и передачи в эксплуатацию.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-6" role="list">
          {steps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

type StepCardProps = {
  step: { title: string; text: string };
  index: number;
};

function StepCard({ step, index }: StepCardProps) {
  const vibe = stepVibes[index % stepVibes.length];
  const { ref } = useCardAnalytics<HTMLLIElement>({
    id: `step-${index + 1}`,
    section: 'process',
    index,
    payload: { title: step.title },
  });

  const cardId = `process-step-${index + 1}`;

  return (
    <li ref={ref} className="group/card list-none">
      <Card
        role="article"
        aria-labelledby={`${cardId}-title`}
        className={`relative flex h-full flex-col gap-3 transition md:hover:-translate-y-1 md:hover:shadow-lg motion-reduce:md:hover:translate-y-0 ${vibe.surface} ${vibe.shadow}`}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 md:group-hover/card:opacity-100 ${vibe.halo}`}
        />
        <div className="flex items-center justify-between gap-3">
          <Badge tone={vibe.tone} size="sm" leftIcon={vibe.emoji}>
            {vibe.label}
          </Badge>
          <Badge tone="slate" size="sm">
            Шаг {index + 1}
          </Badge>
        </div>
        <h3
          id={`${cardId}-title`}
          className="mt-2 text-lg font-semibold leading-tight text-slate-900 line-clamp-2 md:mt-3 dark:text-white"
        >
          {step.title}
        </h3>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          {step.text}
        </p>
      </Card>
    </li>
  );
}
