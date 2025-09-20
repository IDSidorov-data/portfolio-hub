import Container from '@/components/Container';
import CarouselRow from '@/components/CarouselRow';
import Card from '@/components/Card';

const sections = [
  {
    title: 'Аналитика',
    intro: 'От событий и витрин до проверяемых гипотез и решений.',
    lines: [
      'Сбор/ETL событий → SQL-модели → метрики и дашборды',
      'A/B-эксперименты, z/t-тесты, отчёты по критериям успеха',
    ],
    chips: ['SQL', 'Postgres/Supabase', 'Superset/Metabase', 'Python/Pandas'],
  },
  {
    title: 'Backend / API',
    intro: 'Прикладной бекенд под продуктовые задачи.',
    lines: [
      'FastAPI + Postgres, очереди, вебхуки и интеграции',
      'Авторизация, платежи, простые админки',
    ],
    chips: ['FastAPI', 'Postgres', 'Supabase Auth/Storage', 'Cloud Run/Vercel'],
  },
  {
    title: 'TG-боты & Автоматизация',
    intro: 'Автономные помощники и интеграции с системами.',
    lines: [
      'aiogram-боты ↔ API ↔ Sheets/CRM, напоминания/отчёты',
      'TG Web App, интеграции c AI-сервисами, сложная бекенд-логика',
    ],
    chips: ['aiogram', 'Playwright/RPA', 'Webhook', 'Google Sheets', 'AI интеграции'],
  },
  {
    title: 'Разработка сайтов',
    intro: 'От лендингов до многостраничных приложений.',
    lines: [
      'Лендинги (Tilda) и промо',
      'Next.js/React: многостраничники с админкой, API-ключами и интеграциями',
    ],
    chips: ['Next.js', 'React', 'Tailwind', 'Tilda', 'Vercel'],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="py-16 sm:py-24">
      <Container>
        <h2 className="mb-6 text-3xl font-semibold">Стек и инструменты</h2>
      {/* Mobile carousel (stack) */}
      <div className="md:hidden mt-2">
        <div className="grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory touch-pan-x" role="list" aria-label="Стек и инструменты">
          {sections.map((it, i) => (
            <div key={i} className="snap-start" role="listitem">
              <div className="h-full rounded-2xl border p-4 shadow-sm">
                <div className="text-base font-semibold">{it.title}</div>
                <p className="mt-2 text-sm opacity-80">{it.intro}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    
        <p className="opacity-80 mb-8">
          Что именно я делаю и из каких компонентов это собираю.
        </p>

        <div className="hidden md:grid grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {sections.map((s) => (
            <Card key={s.title} className="p-6">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm opacity-80">{s.intro}</p>
              <ul className="mt-3 space-y-1 text-sm opacity-90 list-disc pl-4">
                {s.lines.map((l, i) => (<li key={i}>{l}</li>))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 text-sm opacity-80">
                {s.chips.map((c) => (
                  <span key={c} className="rounded-full border border-border px-3 py-1">{c}</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
