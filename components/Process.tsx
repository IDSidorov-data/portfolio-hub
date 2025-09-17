import Container from '@/components/Container';
import Card from '@/components/Card';
import { ArrowRight } from 'lucide-react';

const steps = [
  { title: 'Диагностика и метрики', text: 'Быстрое погружение, цель и критерии успеха. Согласуем, что меряем и какие артефакты на выходе.' },
  { title: 'Спринт MVP', text: 'Прототип/интеграция за 1–2 недели: только то, что проверяет гипотезу. Прозрачные риски и сроки.' },
  { title: 'Валидация на данных', text: 'Запуск A/B или пилота. Считаем метрики, делаем вывод — раскатывать, доработать или закрыть.' },
  { title: 'Продукт в работу', text: 'Упаковка решения: автоматизация, документация, передача артефактов. Поддержка по договорённости.' },
];

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-24">
      <Container>
        <h2 className="mb-6 text-3xl font-semibold">Как я работаю</h2>

        {/* Моб/планшет — сетка */}
        <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
          {steps.map((s) => (
            <Card key={s.title} className="p-6">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm opacity-80">{s.text}</p>
            </Card>
          ))}
        </div>

        {/* Десктоп — ряд со стрелками по центру */}
        <div className="mt-2 hidden lg:flex items-center gap-4">
          {steps.map((s, i) => (
            <div key={s.title} className="flex items-center">
              <Card className="p-6 w-72">
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
