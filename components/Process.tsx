import Container from '@/components/Container';

const steps = [
  'Быстрое погружение в задачу',
  'Формулирую гипотезы, метрики, ТЗ',
  'Дешёвая проверка (MVP / A/B)',
  'Реализация (API / бот / дашборд)',
  'Передача знаний команде',
];

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <Container>
        <h2 className="mb-10 text-3xl font-semibold">Как я работаю</h2>
        <ol className="space-y-6">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-medium">
                {i + 1}
              </span>
              <span className="text-zinc-700 dark:text-zinc-300">{s}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
