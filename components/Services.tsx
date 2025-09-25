'use client';

import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/primitives/Badge';
import { useCardAnalytics } from '@/components/hooks/useCardAnalytics';
import type { BadgeTone } from '@/lib/badge';

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
    desc: 'Метрики, эксперименты, дашборды и витрины — чтобы решения принимались на данных.',
    timeline: '3–10 дней',
    budget: 'от 50 000 ₽',
    tasks: [
      'Аудит воронки/юнит-экономики',
      'Настройка GA4 / Я.Метрики / GTM',
      'Постановка событий и конверсий',
      'A/B-тест: дизайн, запуск, анализ',
      'BI-дашборд (Metabase/Looker Studio)',
    ],
  },
  {
    id: 'backend',
    title: 'Backend / API',
    desc: 'Продакшн-API на FastAPI/Node, интеграции и инфраструктура.',
    timeline: '1–3 недели',
    budget: 'от 120 000 ₽',
    tasks: [
      'Проектирование REST/GraphQL',
      'Интеграции (CRM, платежи, Telegram, Notion)',
      'Бэкграунд-джобы / вебхуки',
      'Тестирование, мониторинг (Sentry)',
      'CI/CD и деплой (Fly/Render/Vercel)',
    ],
  },
  {
    id: 'bots',
    title: 'Bots / RPA',
    desc: 'Телеграм-боты, ассистенты, автоматизация процессов и RPA.',
    timeline: '5–12 дней',
    budget: 'от 80 000 ₽',
    tasks: [
      'Телеграм-боты (aiogram, WebApp, webhook)',
      'Интеграции с AI/LLM и корпоративными системами',
      'Синхронизация с Notion/Sheets/CRM',
      'Мониторинг событий и уведомления',
      'RPA-скрипты (Playwright/браузерная автом.)',
    ],
  },
  {
    id: 'mvp',
    title: 'MVP / Prototypes',
    desc: 'Продуктовые MVP на Next.js + Supabase: быстрый запуск и проверка гипотез.',
    timeline: '1–4 недели',
    budget: 'от 150 000 ₽',
    tasks: [
      'Проектирование MVP (процессы, роли, CRUD)',
      'UI/UX, дизайн-системы, адаптив',
      'Авторизация/платежи, email-уведомления',
      'Интеграции с внутренними сервисами',
      'Поддержка и развитие после запуска',
    ],
  },
];

type ServiceVibe = {
  emoji: string;
  label: string;
  tone: BadgeTone;
  surface: string;
  shadow: string;
  halo: string;
};

const serviceVibeFallback: ServiceVibe = {
  emoji: '🧩',
  label: 'Service',
  tone: 'slate',
  surface: 'bg-gradient-to-br from-slate-50/40 via-white/60 to-white/90 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-900/30',
  shadow: 'shadow-[0_18px_32px_-18px_rgba(15,23,42,0.3)]',
  halo: 'bg-slate-300/30 dark:bg-slate-600/20',
};

const serviceVibes: Record<Service['id'], ServiceVibe> = {
  analytics: {
    emoji: '📊',
    label: 'Data',
    tone: 'amber',
    surface:
      'bg-gradient-to-br from-amber-50 via-orange-50/80 to-rose-50 dark:from-amber-500/15 dark:via-orange-500/15 dark:to-rose-500/15',
    shadow: 'shadow-[0_20px_40px_-22px_rgba(245,158,11,0.35)]',
    halo: 'bg-amber-200/40 dark:bg-amber-500/20',
  },
  backend: {
    emoji: '⚙️',
    label: 'API',
    tone: 'sky',
    surface:
      'bg-gradient-to-br from-sky-50 via-cyan-50/80 to-emerald-50 dark:from-sky-500/15 dark:via-cyan-500/15 dark:to-emerald-500/15',
    shadow: 'shadow-[0_20px_40px_-22px_rgba(14,165,233,0.32)]',
    halo: 'bg-sky-200/40 dark:bg-sky-500/20',
  },
  bots: {
    emoji: '🤖',
    label: 'Automation',
    tone: 'emerald',
    surface:
      'bg-gradient-to-br from-emerald-50 via-lime-50/80 to-sky-50 dark:from-emerald-500/15 dark:via-lime-500/15 dark:to-sky-500/15',
    shadow: 'shadow-[0_20px_40px_-22px_rgba(16,185,129,0.32)]',
    halo: 'bg-emerald-200/40 dark:bg-emerald-500/20',
  },
  mvp: {
    emoji: '🧪',
    label: 'Product',
    tone: 'purple',
    surface:
      'bg-gradient-to-br from-purple-50 via-violet-50/80 to-rose-50 dark:from-purple-500/15 dark:via-violet-500/15 dark:to-rose-500/15',
    shadow: 'shadow-[0_20px_40px_-22px_rgba(147,51,234,0.32)]',
    halo: 'bg-purple-200/40 dark:bg-purple-500/20',
  },
};

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <Container>
        <header className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Чем поможем
          </p>
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Услуги и форматы работы</h2>
          <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
            От быстрой аналитики до полноценных MVP. Все карточки унифицированы и готовы к action.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3" role="list">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

type ServiceCardProps = {
  service: Service;
  index: number;
};

function ServiceCard({ service, index }: ServiceCardProps) {
  const vibe = serviceVibes[service.id] ?? serviceVibeFallback;
  const { ref, trackClick } = useCardAnalytics<HTMLLIElement>({
    id: service.id,
    section: 'services',
    index,
    payload: { title: service.title },
  });

  const limitedTasks = service.tasks.slice(0, 3);
  const restCount = service.tasks.length - limitedTasks.length;
  const cardId = `service-${service.id}`;

  return (
    <li ref={ref} className="group/card list-none">
      <Card
        role="article"
        aria-labelledby={`${cardId}-title`}
        className={`relative flex h-full flex-col gap-4 transition md:hover:-translate-y-1 md:hover:shadow-lg motion-reduce:md:hover:translate-y-0 ${vibe.surface} ${vibe.shadow}`}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 md:group-hover/card:opacity-100 ${vibe.halo}`}
        />
        <div className="flex items-start gap-3">
          <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-sm dark:bg-white/10">
            {vibe.emoji}
          </span>
          <Badge tone={vibe.tone} size="sm">
            {vibe.label}
          </Badge>
        </div>
        <h3
          id={`${cardId}-title`}
          className="mt-2 text-lg font-semibold leading-tight text-slate-900 line-clamp-2 md:mt-3 dark:text-white"
        >
          {service.title}
        </h3>
        <p className="text-sm leading-6 text-slate-600 line-clamp-2 dark:text-slate-300">
          {service.desc}
        </p>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300" aria-label="Список задач">
          {limitedTasks.map((task) => (
            <li key={task} className="flex items-start gap-2">
              <span aria-hidden className="mt-0.5 text-base">•</span>
              <span>{task}</span>
            </li>
          ))}
          {restCount > 0 ? (
            <li className="text-xs text-slate-500 dark:text-slate-400">+ ещё {restCount} пункта</li>
          ) : null}
        </ul>
        <footer className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <Badge tone={vibe.tone} size="sm" leftIcon="🗓">
            {service.timeline}
          </Badge>
          <Badge tone={vibe.tone} size="sm" leftIcon="💸">
            {service.budget}
          </Badge>
          <Button
            variant="primary"
            href="#brief"
            className="mt-2 w-full min-h-[44px] justify-center text-sm font-semibold md:w-auto"
            onClick={() => trackClick({ action: 'brief' })}
            data-qa={`service-${service.id}-cta`}
          >
            Обсудить проект
          </Button>
        </footer>
      </Card>
    </li>
  );
}
