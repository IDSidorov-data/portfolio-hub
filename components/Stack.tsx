import Container from '@/components/Container';
import Card from '@/components/Card';

type StackSection = {
  id: string;
  title: string;
  intro: string;
  lines: string[];
  chips: string[];
  emoji: string;
  badge: string;
  surface: string;
  shadow: string;
  chip: string;
  accent: string;
  halo: string;
};

const sections: StackSection[] = [
  {
    id: 'analytics',
    title: 'Аналитика и метрики',
    intro: 'От событий и витрин до проверяемых гипотез и решений.',
    lines: [
      'ETL-сбор → SQL-модели → метрики и дашборды',
      'A/B-эксперименты, Z/T-тесты, отчёты по критериям успеха',
    ],
    chips: ['SQL', 'Postgres/Supabase', 'Superset/Metabase', 'Python/Pandas'],
    emoji: '📊',
    badge: 'Аналитика',
    surface:
      'bg-gradient-to-br from-sky-100 via-blue-50 to-emerald-100 dark:from-sky-500/20 dark:via-blue-500/12 dark:to-emerald-500/12',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(56,189,248,0.32)]',
    chip:
      'bg-white/80 text-sky-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-sky-100 dark:border-white/15',
    accent: 'text-sky-700 dark:text-sky-200',
    halo: 'bg-sky-200/45 dark:bg-sky-500/20',
  },
  {
    id: 'backend',
    title: 'Backend и API',
    intro: 'Прикладной бекенд под продуктовые задачи.',
    lines: [
      'FastAPI + Postgres, очереди, вебхуки и интеграции',
      'Авторизация, платежи, простые админки',
    ],
    chips: ['FastAPI', 'Postgres', 'Supabase Auth/Storage', 'Cloud Run/Vercel'],
    emoji: '🧩',
    badge: 'Backend / API',
    surface:
      'bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100 dark:from-purple-500/20 dark:via-violet-500/12 dark:to-indigo-500/12',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(167,139,250,0.32)]',
    chip:
      'bg-white/80 text-purple-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-purple-100 dark:border-white/15',
    accent: 'text-purple-700 dark:text-purple-200',
    halo: 'bg-purple-200/45 dark:bg-purple-500/20',
  },
  {
    id: 'automation',
    title: 'TG-боты и автоматизация',
    intro: 'Телеграм-ассистенты, интеграции с AI и CRM, RPA-скрипты.',
    lines: [
      'aiogram-боты ↔ API ↔ Sheets/CRM, напоминания и отчёты',
      'TG Web App, интеграции c AI-сервисами, RPA и браузерные сценарии',
    ],
    chips: ['aiogram', 'Playwright/RPA', 'Webhook', 'Google Sheets', 'AI интеграции'],
    emoji: '🤖',
    badge: 'Automation',
    surface:
      'bg-gradient-to-br from-amber-100 via-orange-50 to-lime-100 dark:from-amber-500/20 dark:via-orange-500/12 dark:to-lime-500/12',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(251,191,36,0.32)]',
    chip:
      'bg-white/80 text-amber-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-amber-100 dark:border-white/15',
    accent: 'text-amber-700 dark:text-amber-200',
    halo: 'bg-amber-200/45 dark:bg-amber-500/20',
  },
  {
    id: 'product',
    title: 'Сайты и интерфейсы',
    intro: 'От лендингов до многостраничных приложений на Next.js.',
    lines: [
      'Лендинги и промо на Tilda',
      'Next.js/React: мультистраничники с админкой, API и интеграциями',
    ],
    chips: ['Next.js', 'React', 'Tailwind', 'Tilda', 'Vercel'],
    emoji: '🚀',
    badge: 'Product',
    surface:
      'bg-gradient-to-br from-rose-100 via-pink-50 to-emerald-100 dark:from-rose-500/20 dark:via-pink-500/12 dark:to-emerald-500/12',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(244,114,182,0.32)]',
    chip:
      'bg-white/80 text-rose-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-rose-100 dark:border-white/15',
    accent: 'text-rose-700 dark:text-rose-200',
    halo: 'bg-rose-200/45 dark:bg-rose-500/20',
  },
];

export default function Stack() {
  return (
    <section id="stack" className="py-16 sm:py-24">
      <Container className="px-0 md:px-5 ">
        <h2 className="mb-6 text-3xl font-semibold">Стек и технологии</h2>
        <p className="mb-8 max-w-2xl text-base text-slate-700/85 dark:text-slate-200/85">
          Что именно делаю и из каких компонентов собираю решения.
        </p>

        {/* Mobile carousel */}
        <div className="md:hidden mt-2">
          <div
            className="grid auto-cols-[85%] grid-flow-col gap-4 snap-x snap-mandatory overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
            role="list"
            aria-label="Стек и технологии"
          >
            {sections.map((section) => (
              <div key={section.id} className="snap-start snap-always" role="listitem">
                <Card
                  variant="default"
                  className={`group relative h-full overflow-hidden border border-transparent p-6 text-slate-900 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.22)] transition-all duration-500 ease-out dark:text-white ${section.surface} ${section.shadow}`}
                  aria-labelledby={`stack-${section.id}-title`}
                >
                  <span
                    aria-hidden
                    className={`absolute -right-8 -top-12 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${section.halo}`}
                  />
                  <div className="relative z-[1] flex h-full flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-sm dark:bg-white/10">
                        {section.emoji}
                      </span>
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${section.chip}`}
                      >
                        {section.badge}
                      </span>
                    </div>
                    <h3 id={`stack-${section.id}-title`} className="sr-only">
                      {section.title}
                    </h3>
                    <p className="text-sm leading-5 text-slate-800/90 dark:text-slate-100/90">{section.intro}</p>
                    <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
                      {section.chips.slice(0, 3).map((chip) => (
                        <span key={chip} className={`rounded-full px-3 py-1 ${section.chip}`}>
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <Card
              key={section.id}
              className={`group relative flex h-full flex-col overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl dark:text-white ${section.surface} ${section.shadow}`}
              role="article"
              aria-labelledby={`stack-${section.id}-title-desktop`}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${section.halo}`}
              />
              <header className="relative z-[1] flex flex-col gap-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${section.chip}`}
                >
                  <span aria-hidden className="text-lg">
                    {section.emoji}
                  </span>
                  {section.badge}
                </span>
                <h3 id={`stack-${section.id}-title-desktop`} className="sr-only">
                  {section.title}
                </h3>
              </header>
              <p className="mt-1 text-sm text-slate-800/90 dark:text-slate-100/90">{section.intro}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-800/90 dark:text-slate-100/90 list-disc pl-4">
                {section.lines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {section.chips.map((chip) => (
                  <span key={chip} className={`rounded-full px-3 py-1 ${section.chip}`}>
                    {chip}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
