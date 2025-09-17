import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { sendEvent } from '@/lib/analytics';

type Service = {
  id: string;
  title: string;
  desc: string;
  timeline: string;
  budget: string;
  tasks: string[];
};

const services: Service[] = [
  {
    id: 'analytics',
    title: 'Analytics',
    desc: 'Метрики, эксперименты, дашборды — чтобы принимать решения по данным',
    timeline: '3–10 дней',
    budget: 'от 50 000 ₽',
    tasks: [
      'Аудит воронки/юнит-экономики',
      'Настройка GA4 / Я.Метрики / GTM',
      'Постановка событий и конверсий',
      'A/B-тест (дизайн, запуск, анализ)',
      'BI-дашборд (Metabase/Looker Studio)',
    ],
  },
  {
    id: 'backend',
    title: 'Backend / API',
    desc: 'Продакшен-API на FastAPI/Node, интеграции и инфраструктура',
    timeline: '1–3 недели',
    budget: 'от 120 000 ₽',
    tasks: [
      'Проектирование REST/GraphQL',
      'Интеграции (CRM, платежи, Telegram, Notion)',
      'Бэкграунд-джобы / вебхуки',
      'Тестирование и логирование (Sentry)',
      'CI/CD и деплой (Fly/Render/Vercel)',
    ],
  },
  {
    id: 'bots',
    title: 'Bots / RPA',
    desc: 'Телеграм-боты, интеграции, автоматизация рутины',
    timeline: '5–12 дней',
    budget: 'от 80 000 ₽',
    tasks: [
      'Телеграм-бот (меню, платежи, WebApp)',
      'Сбор заявок/обратной связи',
      'Автосинк в Notion/Sheets/CRM',
      'Распознавание/парсинг документов',
      'RPA-сценарии (загрузка/рассылка)',
    ],
  },
  {
    id: 'mvp',
    title: 'MVP / Prototypes',
    desc: 'Быстрые прототипы на Next.js + Supabase для проверки гипотез',
    timeline: '1–4 недели',
    budget: 'от 150 000 ₽',
    tasks: [
      'Сборка MVP (авторизация, CRUD)',
      'Дизайн простых UI/кейсы/лендинг',
      'Платежи/подписки, email-уведомления',
      'Аналитика и события продукта',
      'Подготовка к пилоту/демо',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16">
      <Container>
        <h2 className="mb-6 text-2xl font-semibold">Услуги</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Card key={s.id} className="flex flex-col gap-3">
              <div>
                <h3 className="text-lg font-medium">{s.title}</h3>
                <p className="mt-1 text-sm opacity-90">{s.desc}</p>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm opacity-90">
                {s.tasks.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between pt-3 text-sm opacity-90">
                <span>⏱ {s.timeline}</span>
                <span>💰 {s.budget}</span>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  href="#brief"
                  onClick={() => sendEvent(`click_service_${s.id}`)}
                >
                  Обсудить
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
