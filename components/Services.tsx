import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { sendEvent } from '@/lib/analytics';

const services = [
  {
    id: 'analytics',
    title: 'Product / Data Analytics',
    desc: 'Метрики, воронки, A/B-тесты, BI/дашборды',
  },
  {
    id: 'backend',
    title: 'Backend / API Development',
    desc: 'Python/FastAPI, интеграции, продакшен-окружение',
  },
  {
    id: 'bots',
    title: 'Telegram Bots & Automation',
    desc: 'Боты (aiogram), RPA, автоматизация отчётов',
  },
  {
    id: 'mvp',
    title: 'MVP / Prototyping',
    desc: 'Streamlit/Next.js прототипы, быстрые итерации',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <Container>
        <h2 className="mb-10 text-3xl font-semibold">Услуги</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Card key={s.id} className="p-6">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{s.desc}</p>
              <div className="mt-4">
                <Button
                  variant="ghost"
                  onClick={() => sendEvent(`click_service_${s.id}`)}
                >
                  Подробнее
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
