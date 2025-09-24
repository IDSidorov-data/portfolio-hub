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

type ServiceVibe = {
  emoji: string;
  label: string;
  surface: string;
  shadow: string;
  accent: string;
  chip: string;
  halo: string;
};

const serviceVibes: Record<Service['id'], ServiceVibe> = {
  analytics: {
    emoji: '📊',
    label: 'Data',
    surface: 'bg-gradient-to-br from-rose-100 via-orange-50/75 to-amber-100 dark:from-rose-500/20 dark:via-orange-500/10 dark:to-amber-500/10',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(251,191,36,0.32)]',
    accent: 'text-amber-700 dark:text-amber-200',
    chip: 'bg-white/75 text-amber-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-amber-100 dark:border-white/15',
    halo: 'bg-amber-200/45 dark:bg-amber-500/20',
  },
  backend: {
    emoji: '🧩',
    label: 'API',
    surface: 'bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-100 dark:from-sky-500/20 dark:via-cyan-500/10 dark:to-emerald-500/10',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(14,165,233,0.32)]',
    accent: 'text-sky-700 dark:text-sky-200',
    chip: 'bg-white/75 text-sky-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-sky-100 dark:border-white/15',
    halo: 'bg-sky-200/45 dark:bg-sky-500/20',
  },
  bots: {
    emoji: '🤖',
    label: 'Automation',
    surface: 'bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100 dark:from-purple-500/20 dark:via-violet-500/10 dark:to-indigo-500/10',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(167,139,250,0.32)]',
    accent: 'text-purple-700 dark:text-purple-200',
    chip: 'bg-white/75 text-purple-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-purple-100 dark:border-white/15',
    halo: 'bg-purple-200/45 dark:bg-purple-500/20',
  },
  mvp: {
    emoji: '🚀',
    label: 'Product',
    surface: 'bg-gradient-to-br from-emerald-100 via-lime-50 to-lime-100 dark:from-emerald-500/20 dark:via-lime-500/10 dark:to-lime-500/10',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(16,185,129,0.32)]',
    accent: 'text-emerald-700 dark:text-emerald-200',
    chip: 'bg-white/75 text-emerald-700/90 border-white/40 shadow-sm dark:bg-white/10 dark:text-emerald-100 dark:border-white/15',
    halo: 'bg-emerald-200/45 dark:bg-emerald-500/20',
  },
};

const serviceVibeFallback: ServiceVibe = serviceVibes.analytics;

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16">
      <Container className="px-0 md:px-5 ">
        <h2 className="mb-6 text-2xl font-semibold">Услуги</h2>

        {/* Mobile carousel */}
        <div className="md:hidden mt-2">
          <div
            className="grid auto-cols-[85%] grid-flow-col gap-4 snap-x snap-mandatory overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
            role="list"
            aria-label="Услуги"
          >
            {services.map((it) => {
              const vibe = serviceVibes[it.id] ?? serviceVibeFallback;
              const shortlist = it.tasks.slice(0, 3);
              const badgeClass = `${badgeBaseClass} ${vibe.chip}`;

              return (
                <div key={it.id} className="snap-start snap-always" role="listitem">
                  <Card className={`group relative h-full overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] dark:text-white ${vibe.surface} ${vibe.shadow}`} variant="default">
                    <span aria-hidden className={`absolute -right-10 -top-14 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`} />
                    <div className="relative z-[1] flex h-full flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-white/75 text-xl shadow-sm dark:bg-white/10">
                          {vibe.emoji}
                        </span>
                        <div className="flex-1">
                          <span className={`${badgeBaseClass} text-[10px] tracking-[0.22em] opacity-70 ${vibe.accent}`}>
                            {vibe.label}
                          </span>
                          <h3 className="mt-1 text-lg font-semibold leading-snug">{it.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm leading-5 text-slate-800/90 dark:text-slate-100/90">{it.desc}</p>
                      {shortlist.length > 0 && (
                        <ul className="mt-2 space-y-1 text-xs text-slate-700/85 dark:text-slate-100/80">
                          {shortlist.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span aria-hidden className="mt-0.5 text-base">✨</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-auto flex flex-wrap gap-2 text-xs font-semibold">
                        <span className={badgeClass}>
                          <span aria-hidden>⏱️</span>
                          <span>{it.timeline}</span>
                        </span>
                        <span className={badgeClass}>
                          <span aria-hidden>💸</span>
                          <span>{it.budget}</span>
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const vibe = serviceVibes[s.id] ?? serviceVibeFallback;
            const badgeClass = `${badgeBaseClass} ${vibe.chip}`;

            return (
              <Card key={s.id} className={`group relative flex flex-col gap-4 overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl dark:text-white ${vibe.surface} ${vibe.shadow}`}>
                <span aria-hidden className={`pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`} />
                <div className="relative z-[1] flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-sm dark:bg-white/10">
                      {vibe.emoji}
                    </span>
                    <div className="flex-1">
                      <span className={`${badgeBaseClass} text-[10px] tracking-[0.22em] opacity-70 ${vibe.accent}`}>
                        {vibe.label}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-800/90 dark:text-slate-100/90">{s.desc}</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-800/90 dark:text-slate-100/90">
                    {s.tasks.map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span aria-hidden className="mt-0.5 text-base">✨</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative z-[1] mt-auto flex flex-wrap items-center justify-between gap-3 pt-4 text-sm">
                  <div className="flex flex-wrap gap-2">
                    <span className={badgeClass}>
                      <span aria-hidden>⏱️</span>
                      <span>{s.timeline}</span>
                    </span>
                    <span className={badgeClass}>
                      <span aria-hidden>💸</span>
                      <span>{s.budget}</span>
                    </span>
                  </div>
                  <Button variant="primary" href="#brief" className="transition-transform duration-300 hover:-translate-y-0.5">
                    Обсудить
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
