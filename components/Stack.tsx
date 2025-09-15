import Container from '@/components/Container';

const stack = [
  'SQL',
  'Python',
  'Pandas',
  'FastAPI',
  'Streamlit',
  'Supabase / Postgres',
  'Superset',
  'aiogram (TG Bots)',
  'Playwright / RPA',
  'Excel',
  'PowerPoint',
  'GitHub',
];

export default function Stack() {
  return (
    <section id="stack" className="py-16 sm:py-24">
      <Container>
        <h2 className="mb-10 text-3xl font-semibold">Стек и инструменты</h2>
        <ul className="flex flex-wrap gap-3 text-sm text-zinc-700 dark:text-zinc-300">
          {stack.map((t) => (
            <li
              key={t}
              className="rounded-full border border-zinc-300 px-3 py-1 dark:border-zinc-700"
            >
              {t}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
