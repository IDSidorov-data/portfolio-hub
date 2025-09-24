import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';

import { badgeBaseClass } from '@/lib/badge';

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
  surface: string;
  shadow: string;
  chip: string;
  halo: string;
};

const serviceVibeFallback: ServiceVibe = {
  emoji: '🧩',
  label: 'Service',
  surface:
    'bg-gradient-to-br from-slate-100 via-slate-50 to-sky-100 dark:from-slate-600/20 dark:via-slate-700/15 dark:to-sky-700/15',
  shadow: 'shadow-[0_18px_40px_-18px_rgba(148,163,184,0.32)]',
  chip:
    'backdrop-blur border border-slate-200/60 bg-white/85 text-slate-800 dark:border-slate-400/35 dark:bg-slate-500/25 dark:text-slate-50',
  halo: 'bg-slate-200/45 dark:bg-slate-500/20',
};

const serviceVibes: Record<Service['id'], ServiceVibe> = {
  analytics: {
    emoji: '📊',
    label: 'Data',
    surface:
      'bg-gradient-to-br from-rose-100 via-orange-50/75 to-amber-100 dark:from-rose-500/20 dark:via-orange-500/12 dark:to-amber-500/12',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(251,191,36,0.32)]',
    chip:
      'backdrop-blur border border-amber-200/60 bg-white/85 text-amber-800 dark:border-amber-400/35 dark:bg-amber-500/25 dark:text-amber-50',
    halo: 'bg-amber-200/45 dark:bg-amber-500/20',
  },
  backend: {
    emoji: '🧱',
    label: 'API',
    surface:
      'bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-100 dark:from-sky-500/20 dark:via-cyan-500/12 dark:to-emerald-500/12',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(14,165,233,0.32)]',
    chip:
      'backdrop-blur border border-sky-200/60 bg-white/85 text-sky-800 dark:border-sky-400/35 dark:bg-sky-500/25 dark:text-sky-50',
    halo: 'bg-sky-200/45 dark:bg-sky-500/20',
  },
  bots: {
    emoji: '🤖',
    label: 'Automation',
    surface:
      'bg-gradient-to-br from-emerald-100 via-lime-50 to-sky-100 dark:from-emerald-500/20 dark:via-lime-500/12 dark:to-sky-500/12',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(16,185,129,0.32)]',
    chip:
      'backdrop-blur border border-emerald-200/60 bg-white/85 text-emerald-800 dark:border-emerald-400/35 dark:bg-emerald-500/25 dark:text-emerald-50',
    halo: 'bg-emerald-200/45 dark:bg-emerald-500/20',
  },
  mvp: {
    emoji: '🚀',
    label: 'Product',
    surface:
      'bg-gradient-to-br from-violet-100 via-pink-50 to-rose-100 dark:from-violet-500/20 dark:via-pink-500/12 dark:to-rose-500/12',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(192,132,252,0.32)]',
    chip:
      'backdrop-blur border border-violet-200/60 bg-white/85 text-violet-800 dark:border-violet-400/35 dark:bg-violet-500/25 dark:text-violet-50',
    halo: 'bg-purple-200/45 dark:bg-purple-500/20',
  },
};

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16">
      <Container className="px-0 md:px-5 ">
        <h2 className="mb-6 text-3xl font-semibold">Что я делаю</h2>

        {/* Mobile */}
        <div className="md:hidden mt-2">
          <div
            className="grid auto-cols-[85%] grid-flow-col gap-4 snap-x snap-mandatory overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
            role="list"
            aria-label="Сервисы"
          >
            {services.map((service) => {
              const vibe = serviceVibes[service.id] ?? serviceVibeFallback;
              const badgeClass = `${badgeBaseClass} ${vibe.chip}`;
              const shortlist = service.tasks.slice(0, 3);

              return (
                <div key={service.id} className="snap-start snap-always" role="listitem">
                  <Card
                    className={`group relative h-full overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg dark:text-white ${vibe.surface} ${vibe.shadow}`}
                    variant="default"
                  >
                    <span
                      aria-hidden
                      className={`absolute -right-8 -top-12 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`}
                    />
                    <div className="relative z-[1] flex h-full flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-sm dark:bg-white/10 animate-float">
                          {vibe.emoji}
                        </span>
                        <span className={badgeClass}>{vibe.label}</span>
                      </div>
                      <h3 className="text-base font-semibold leading-snug">{service.title}</h3>
                      <p className="text-sm leading-5 text-slate-800/90 dark:text-slate-100/90">{service.desc}</p>
                      {shortlist.length > 0 && (
                        <ul className="space-y-1 text-xs text-slate-700/85 dark:text-slate-200/80">
                          {shortlist.map((task) => (
                            <li key={task} className="flex items-start gap-2">
                              <span aria-hidden className="mt-0.5 text-base">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-auto flex flex-wrap gap-2 text-xs font-semibold">
                        <span className={`${badgeBaseClass} ${vibe.chip}`}>
                          <span aria-hidden>🗓</span>
                          <span>{service.timeline}</span>
                        </span>
                        <span className={`${badgeBaseClass} ${vibe.chip}`}>
                          <span aria-hidden>💸</span>
                          <span>{service.budget}</span>
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-2 gap-4 lg:grid-cols-4">
          {services.map((service) => {
            const vibe = serviceVibes[service.id] ?? serviceVibeFallback;
            const badgeClass = `${badgeBaseClass} ${vibe.chip}`;

            return (
              <Card
                key={service.id}
                className={`group relative flex flex-col gap-4 overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl dark:text-white ${vibe.surface} ${vibe.shadow}`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`}
                />
                <div className="relative z-[1] flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-sm dark:bg-white/10 animate-float">
                      {vibe.emoji}
                    </span>
                    <span className={badgeClass}>{vibe.label}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-slate-800/90 dark:text-slate-100/90">{service.desc}</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-800/90 dark:text-slate-100/90">
                    {service.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2">
                        <span aria-hidden className="mt-0.5 text-base">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative z-[1] mt-auto flex flex-wrap items-center justify-between gap-3 pt-4 text-sm">
                  <div className="flex flex-wrap gap-2">
                    <span className={`${badgeBaseClass} ${vibe.chip}`}>
                      <span aria-hidden>🗓</span>
                      <span>{service.timeline}</span>
                    </span>
                    <span className={`${badgeBaseClass} ${vibe.chip}`}>
                      <span aria-hidden>💸</span>
                      <span>{service.budget}</span>
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    href="#brief"
                    className="transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Обсудить задачу
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
