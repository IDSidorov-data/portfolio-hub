import Container from '@/components/Container';
import CarouselRow from '@/components/CarouselRow';
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
   <Container className="px-0 md:px-5 ">
    <h2 className="mb-6 text-2xl font-semibold">Как я работаю</h2>

    {/* Mobile carousel (process) */}
    <div className="block md:hidden mt-2">
     <div className="grid auto-cols-[85%] grid-flow-col gap-4 snap-x md:snap-mandatory snap-proximity overflow-x-auto [-webkit-overflow-scrolling:touch] touch-auto md:touch-pan-x scroll-px-0 px-0" role="list" aria-label="Как я работаю">
      {steps.map((it, i) => (
       <div key={i} className="snap-start snap-always" role="listitem">
        <Card className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] h-full hover:translate-y-[1px] transition" variant="soft">
         <div className="text-base font-semibold">{it.title}</div>
         <p className="mt-2 text-sm opacity-80">{it.text}</p>
        </Card>
       </div>
      ))}
     </div>
    </div>

    {/* Моб/планшет — сетка */}
    <div className="hidden md:grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
     {steps.map((s) => (
      <Card key={s.title} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] h-full hover:translate-y-[1px] p-6 transition">
       <h3 className="text-xl font-semibold">{s.title}</h3>
       <p className="mt-1 text-sm opacity-80">{s.text}</p>
      </Card>
     ))}
    </div>

    {/* Десктоп — ряд со стрелками по центру */}
    <div className="mt-2 hidden lg:flex items-center gap-4">
     {steps.map((s, i) => (
      <div key={s.title} className="flex items-center">
       <Card className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] h-full hover:translate-y-[1px] p-6 transition w-72">
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
