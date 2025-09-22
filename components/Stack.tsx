import Container from '@/components/Container';
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
      <Container className="px-0 md:px-5 px-0 md:px-5">
        <h2 className="mb-6 text-3xl font-semibold">Стек и инструменты</h2>
        <p className="opacity-80 mb-8">
          Что именно я делаю и из каких компонентов это собираю.
        </p>

{/* Mobile carousel (stack) */}
<div className="md:hidden mt-2">
  <div className="grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory [overscroll-behavior-x:contain] [-webkit-overflow-scrolling:touch] touch-pan-x scroll-px-4 px-4 overscroll-x-contain" role="list" aria-label="Стек и инструменты">
    {sections.map((it, i) => (
      <div key={i} className="snap-start snap-always" role="listitem">
        <Card className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] h-full hover:translate-y-[1px] p-6 transition" variant="soft">
          <h3 className="text-lg font-semibold">{it.title}</h3>
          <p className="mt-1 text-sm opacity-80">{it.intro}</p>
        </Card>
      </div>
    ))}
  </div>
</div>



        <div className="hidden md:grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {sections.map((s) => (
            <Card key={s.title} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] h-full hover:translate-y-[1px] p-6 transition">
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
