import Container from '@/components/Container';
import Card from '@/components/Card';
import { ArrowRight } from 'lucide-react';

import { badgeBaseClass } from '@/lib/badge';

type StepVibe = {
  emoji: string;
  badgeTone: string;
  surface: string;
  shadow: string;
  chip: string;
  halo: string;
};

const stepVibes: StepVibe[] = [
  {
    emoji: '🧭',
    badgeTone:
      'backdrop-blur border border-sky-200/60 bg-white/85 text-sky-800 dark:border-sky-400/35 dark:bg-sky-500/25 dark:text-sky-50',
    surface:
      'bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 dark:from-sky-500/20 dark:via-blue-600/12 dark:to-indigo-600/12',
    shadow: 'shadow-[0_18px_40px_-20px_rgba(59,130,246,0.32)]',
    chip:
      'backdrop-blur border border-sky-200/60 bg-white/80 text-sky-800 dark:border-sky-400/35 dark:bg-sky-500/25 dark:text-sky-50',
    halo: 'bg-sky-200/45 dark:bg-sky-500/20',
  },
  {
    emoji: '🛠️',
    badgeTone:
      'backdrop-blur border border-amber-200/60 bg-white/85 text-amber-800 dark:border-amber-400/35 dark:bg-amber-500/25 dark:text-amber-50',
    surface:
      'bg-gradient-to-br from-amber-100 via-orange-50 to-lime-100 dark:from-amber-500/20 dark:via-orange-500/12 dark:to-lime-500/12',
    shadow: 'shadow-[0_18px_40px_-20px_rgba(251,191,36,0.32)]',
    chip:
      'backdrop-blur border border-amber-200/60 bg-white/80 text-amber-800 dark:border-amber-400/35 dark:bg-amber-500/25 dark:text-amber-50',
    halo: 'bg-amber-200/45 dark:bg-amber-500/20',
  },
  {
    emoji: '📈',
    badgeTone:
      'backdrop-blur border border-emerald-200/60 bg-white/85 text-emerald-800 dark:border-emerald-400/35 dark:bg-emerald-500/25 dark:text-emerald-50',
    surface:
      'bg-gradient-to-br from-emerald-100 via-teal-50 to-sky-100 dark:from-emerald-500/20 dark:via-teal-500/12 dark:to-sky-500/12',
    shadow: 'shadow-[0_18px_40px_-20px_rgba(16,185,129,0.32)]',
    chip:
      'backdrop-blur border border-emerald-200/60 bg-white/80 text-emerald-800 dark:border-emerald-400/35 dark:bg-emerald-500/25 dark:text-emerald-50',
    halo: 'bg-emerald-200/45 dark:bg-emerald-500/20',
  },
  {
    emoji: '🤝',
    badgeTone:
      'backdrop-blur border border-violet-200/60 bg-white/85 text-violet-800 dark:border-violet-400/35 dark:bg-violet-500/25 dark:text-violet-50',
    surface:
      'bg-gradient-to-br from-violet-100 via-purple-50 to-rose-100 dark:from-violet-500/20 dark:via-purple-500/12 dark:to-rose-500/12',
    shadow: 'shadow-[0_18px_40px_-20px_rgba(167,139,250,0.32)]',
    chip:
      'backdrop-blur border border-violet-200/60 bg-white/80 text-violet-800 dark:border-violet-400/35 dark:bg-violet-500/25 dark:text-violet-50',
    halo: 'bg-purple-200/45 dark:bg-purple-500/20',
  },
];

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

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-24">
      <Container className="px-0 md:px-5 ">
        <h2 className="mb-6 text-3xl font-semibold">Как я работаю</h2>

        <div className="mt-2 block md:hidden">
          <div
            className="grid auto-cols-[85%] grid-flow-col gap-4 snap-x snap-mandatory overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
            role="list"
            aria-label="Как я работаю"
          >
            {steps.map((step, index) => {
              const vibe = stepVibes[index % stepVibes.length];
              const badgeClass = `${badgeBaseClass} ${vibe.badgeTone}`;

              return (
                <div key={step.title} className="snap-start snap-always" role="listitem">
                  <Card
                    className={`group relative h-full overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 dark:text-white ${vibe.surface} ${vibe.shadow}`}
                    variant="default"
                  >
                    <span
                      aria-hidden
                      className={`absolute -right-10 -top-14 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`}
                    />
                    <div className="relative z-[1] flex h-full flex-col gap-3">
                      <span className={badgeClass}>
                        <span aria-hidden className="text-lg">{vibe.emoji}</span>
                        {step.title}
                      </span>
                      <p className="text-sm leading-5 text-slate-800/90 dark:text-slate-100/90">{step.text}</p>
                      <div className={`${badgeBaseClass} ${vibe.chip} mt-auto inline-flex items-center gap-2 text-[11px]`}>
                        <span aria-hidden>→</span>
                        <span>Следующий шаг рядом</span>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 hidden items-stretch gap-4 md:flex">
          {steps.map((step, index) => {
            const vibe = stepVibes[index % stepVibes.length];
            const badgeClass = `${badgeBaseClass} ${vibe.badgeTone}`;

            return (
              <div key={step.title} className="group/step flex items-center">
                <Card
                  className={`group relative h-full max-w-sm overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl dark:text-white ${vibe.surface} ${vibe.shadow}`}
                  variant="default"
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`}
                  />
                  <span className={badgeClass}>
                    <span aria-hidden className="text-lg">{vibe.emoji}</span>
                    {step.title}
                  </span>
                  <p className="mt-3 text-sm text-slate-800/90 dark:text-slate-100/90">{step.text}</p>
                </Card>
                {index < steps.length - 1 && (
                  <div className="mx-3 hidden items-center lg:flex">
                    <ArrowRight className="h-6 w-6 text-slate-400 transition-transform duration-300 group-hover/step:translate-x-1" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
