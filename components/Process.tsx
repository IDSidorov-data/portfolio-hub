import Container from '@/components/Container';
import Card from '@/components/Card';
import { ArrowRight } from 'lucide-react';

type StepVibe = {
  emoji: string;
  badge: string;
  surface: string;
  shadow: string;
  accent: string;
  chip: string;
};

const mobileStepVibes: StepVibe[] = [
  {
    emoji: '🧭',
    badge: 'Discovery',
    surface: 'bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 dark:from-sky-500/20 dark:via-blue-600/10 dark:to-indigo-600/10',
    shadow: 'shadow-[0_18px_40px_-20px_rgba(59,130,246,0.45)]',
    accent: 'text-sky-700 dark:text-sky-200',
    chip: 'bg-white/75 text-sky-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-sky-100 dark:border-white/15',
  },
  {
    emoji: '🛠️',
    badge: 'Build',
    surface: 'bg-gradient-to-br from-amber-100 via-orange-50 to-lime-100 dark:from-amber-500/20 dark:via-orange-500/10 dark:to-lime-500/10',
    shadow: 'shadow-[0_18px_40px_-20px_rgba(251,191,36,0.45)]',
    accent: 'text-amber-700 dark:text-amber-200',
    chip: 'bg-white/75 text-amber-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-amber-100 dark:border-white/15',
  },
  {
    emoji: '📈',
    badge: 'Scale',
    surface: 'bg-gradient-to-br from-emerald-100 via-teal-50 to-sky-100 dark:from-emerald-500/20 dark:via-teal-500/10 dark:to-sky-500/10',
    shadow: 'shadow-[0_18px_40px_-20px_rgba(16,185,129,0.45)]',
    accent: 'text-emerald-700 dark:text-emerald-200',
    chip: 'bg-white/75 text-emerald-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-emerald-100 dark:border-white/15',
  },
  {
    emoji: '🤝',
    badge: 'Care',
    surface: 'bg-gradient-to-br from-violet-100 via-purple-50 to-rose-100 dark:from-violet-500/20 dark:via-purple-500/10 dark:to-rose-500/10',
    shadow: 'shadow-[0_18px_40px_-20px_rgba(192,132,252,0.45)]',
    accent: 'text-purple-700 dark:text-purple-200',
    chip: 'bg-white/75 text-purple-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-purple-100 dark:border-white/15',
  },
];

const steps = [
  { title: 'Диагностика и метрики', text: 'Быстрое погружение, цели/ограничения и критерии успеха. Согласуем, что меряем и какие артефакты на выходе.' },
  { title: 'Спринт MVP', text: 'Прототип/интеграция за 1–2 недели. Делаем только то, что проверяет гипотезу. Прозрачные риски и сроки.' },
  { title: 'Валидация на данных', text: 'Запуск A/B или пилота. Снимаем метрики, делаем вывод — раскатывать, доработать или закрыть.' },
  { title: 'Продукт в работу', text: 'Упаковка решения: автоматизация, документация, передача артефактов. Поддержка по договорённости.' },
];

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-24">
      <Container className="px-0 md:px-5 ">
        <h2 className="mb-6 text-2xl font-semibold">Как я работаю</h2>

        {/* Mobile — горизонтальная карусель */}
        <div className="block md:hidden mt-2">
          <div
            className="grid auto-cols-[85%] grid-flow-col gap-4 snap-x md:snap-mandatory snap-proximity overflow-x-auto [-webkit-overflow-scrolling:touch] touch-auto md:touch-pan-x scroll-px-0 px-0"
            role="list"
            aria-label="Как я работаю"
          >
            {steps.map((it, i) => {
              const vibe = mobileStepVibes[i % mobileStepVibes.length];
              return (
                <div key={i} className="snap-start snap-always" role="listitem">
                  <Card
                    className={`group relative h-full overflow-hidden border border-transparent p-6 text-slate-900 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 dark:text-white ${vibe.surface} ${vibe.shadow}`}
                    variant="default"
                  >
                    <span
                      aria-hidden
                      className="absolute -right-10 -top-14 h-36 w-36 rounded-full bg-white/35 blur-3xl dark:bg-white/5"
                    />
                    <div className="relative z-[1] flex h-full flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{vibe.emoji}</span>
                        <div className="flex-1">
                          <div className={`text-xs font-semibold uppercase tracking-[0.22em] opacity-70 ${vibe.accent}`}>
                            {vibe.badge}
                          </div>
                          <div className="mt-1 text-base font-semibold leading-snug">{it.title}</div>
                        </div>
                      </div>
                      <p className="text-sm leading-5 text-slate-800/90 dark:text-slate-100/90">{it.text}</p>
                      <div className={`mt-auto inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-[11px] font-semibold ${vibe.chip}`}>
                        <span aria-hidden>🌟</span>
                        <span>Следующий шаг уже рядом</span>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}

          </div>
        </div>

        {/* Desktop — ряд со стрелками, выравнен по левому краю контейнера */}
        <div className="hidden md:flex items-stretch gap-4 mt-2">
          {steps.map((s, i) => (
            <div key={s.title} className="flex items-center">
              <Card
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-[rgb(var(--ring))] h-full hover:translate-y-[1px] transition p-6"
                variant="soft"
              >
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm opacity-80">{s.text}</p>
              </Card>
              {i < steps.length - 1 && (
                <div className="mx-4 flex items-center">
                  <ArrowRight className="h-6 w-6 text-zinc-500 dark:text-zinc-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
