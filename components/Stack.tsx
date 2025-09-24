import Container from '@/components/Container';
import Card from '@/components/Card';

type StackVibe = {
  emoji: string;
  badge: string;
  surface: string;
  shadow: string;
  chip: string;
  accent: string;
  halo: string;
};

const stackVibes: StackVibe[] = [
  {
    emoji: '🧠',
    badge: 'Analytics',
    surface: 'bg-gradient-to-br from-sky-100 via-blue-50 to-emerald-100 dark:from-sky-500/20 dark:via-blue-500/10 dark:to-emerald-500/10',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(56,189,248,0.32)]',
    chip: 'bg-white/75 text-sky-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-sky-100 dark:border-white/15',
    accent: 'text-sky-700 dark:text-sky-200',
    halo: 'bg-sky-200/45 dark:bg-sky-500/20',
  },
  {
    emoji: '🧩',
    badge: 'Backend',
    surface: 'bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100 dark:from-purple-500/20 dark:via-violet-500/10 dark:to-indigo-500/10',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(167,139,250,0.32)]',
    chip: 'bg-white/75 text-purple-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-purple-100 dark:border-white/15',
    accent: 'text-purple-700 dark:text-purple-200',
    halo: 'bg-purple-200/45 dark:bg-purple-500/20',
  },
  {
    emoji: '🤖',
    badge: 'Automation',
    surface: 'bg-gradient-to-br from-amber-100 via-orange-50 to-lime-100 dark:from-amber-500/20 dark:via-orange-500/10 dark:to-lime-500/10',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(251,191,36,0.32)]',
    chip: 'bg-white/75 text-amber-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-amber-100 dark:border-white/15',
    accent: 'text-amber-700 dark:text-amber-200',
    halo: 'bg-amber-200/45 dark:bg-amber-500/20',
  },
  {
    emoji: '🚀',
    badge: 'Product',
    surface: 'bg-gradient-to-br from-rose-100 via-pink-50 to-emerald-100 dark:from-rose-500/20 dark:via-pink-500/10 dark:to-emerald-500/10',
    shadow: 'shadow-[0_18px_40px_-18px_rgba(244,114,182,0.32)]',
    chip: 'bg-white/75 text-rose-700/85 border-white/40 shadow-sm dark:bg-white/10 dark:text-rose-100 dark:border-white/15',
    accent: 'text-rose-700 dark:text-rose-200',
    halo: 'bg-rose-200/45 dark:bg-rose-500/20',
  },
];

const sections = [
  {
    title: '�?�?���>��'����',
    intro: '�?�' �?�?�+�<�'��� �� �?��'�?��? �?�? ���?�?�?��?�?��?�<�: �?����?�'��� �� �?��?��?���.',
    lines: [
      '���+�?�?/ETL �?�?�+�<�'��� ��' SQL-�?�?�?��>�� ��' �?��'�?���� �� �?���?�+�?�?�?�<',
      'A/B-�?��?����?��?��?�'�<, z/t-�'��?�'�<, �?�'�ؑ'�'�< ���? ��?��'��?��?�? �?�?����:��',
    ],
    chips: ['SQL', 'Postgres/Supabase', 'Superset/Metabase', 'Python/Pandas'],
  },
  {
    title: 'Backend / API',
    intro: '�?�?���>���?�?�?�� �+����?�? ���?�? ���?�?�?�?��'�?�?�<�� �����?���ؐ�.',
    lines: [
      'FastAPI + Postgres, �?�ؐ�?��?��, �?��+�:�?��� �� ��?�'��?�?���Ő��',
      '�?�?�'�?�?������Ő�?, ���>���'����, ���?�?�?�'�<�� ���?�?��?���',
    ],
    chips: ['FastAPI', 'Postgres', 'Supabase Auth/Storage', 'Cloud Run/Vercel'],
  },
  {
    title: 'TG-�+�?�'�< & �?�?�'�?�?���'������Ő�?',
    intro: '�?�?�'�?�?�?�?�?�<�� ���?�?�?�%�?���� �� ��?�'��?�?���Ő�� �? �?��?�'��?���?��.',
    lines: [
      'aiogram-�+�?�'�< ��" API ��" Sheets/CRM, �?�����?�?��?���?��?/�?�'�ؑ'�'�<',
      'TG Web App, ��?�'��?�?���Ő�� c AI-�?��?�?��?���?��, �?�>�?��?���? �+����?�?-�>�?�?����',
    ],
    chips: ['aiogram', 'Playwright/RPA', 'Webhook', 'Google Sheets', 'AI ��?�'��?�?���Ő��'],
  },
  {
    title: '�������?���+�?�'��� �?�����'�?�?',
    intro: '�?�' �>��?�?��?�?�?�? �?�? �?�?�?�?�?�?�'�?���?��ؐ?�<�: ���?��>�?���?���.',
    lines: [
      '�>��?�?��?�?�� (Tilda) �� ���?�?�?�?',
      'Next.js/React: �?�?�?�?�?�?�'�?���?��ؐ?���� �? ���?�?��?��?��, API-��>�?�ؐ��?�� �� ��?�'��?�?���Ő�?�?��',
    ],
    chips: ['Next.js', 'React', 'Tailwind', 'Tilda', 'Vercel'],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="py-16 sm:py-24">
      <Container className="px-0 md:px-5 ">
        <h2 className="mb-6 text-2xl font-semibold">���'��� �� ��?�?�'�?�?�?��?�'�<</h2>
        <p className="opacity-80 mb-8">
          ��'�? ��?��?�?�? �? �?��>���? �� ��� ������: ��?�?���?�?��?�'�?�? �?�'�? �?�?�+��?���?.
        </p>

        <div className="md:hidden mt-2">
          <div className="grid auto-cols-[85%] grid-flow-col gap-4 snap-x md:snap-mandatory snap-proximity overflow-x-auto [-webkit-overflow-scrolling:touch] touch-auto md:touch-pan-x scroll-px-0 px-0" role="list" aria-label="���'��� �� ��?�?�'�?�?�?��?�'�<">
            {sections.map((it, i) => {
              const vibe = stackVibes[i % stackVibes.length];
              return (
                <div key={i} className="snap-start snap-always" role="listitem">
                  <Card
                    className={`group relative h-full overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 dark:text-white ${vibe.surface} ${vibe.shadow}`}
                    variant="default"
                  >
                    <span
                      aria-hidden
                      className={`absolute -right-8 -top-12 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`}
                    />
                    <div className="relative z-[1] flex h-full flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl animate-float">{vibe.emoji}</span>
                        <div className="flex-1">
                          <div className={`text-xs font-semibold uppercase tracking-[0.22em] opacity-70 ${vibe.accent}`}>
                            {vibe.badge}
                          </div>
                          <h3 className="mt-1 text-lg font-semibold leading-snug">{it.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm leading-5 text-slate-800/90 dark:text-slate-100/90">{it.intro}</p>
                      <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
                        {it.chips.slice(0, 3).map((chip) => (
                          <span key={chip} className={`rounded-full px-3 py-1 ${vibe.chip}`}>
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden md:grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s, index) => {
            const vibe = stackVibes[index % stackVibes.length];
            return (
              <Card
                key={s.title}
                className={`group relative flex flex-col overflow-hidden border border-transparent p-6 text-slate-900 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl dark:text-white ${vibe.surface} ${vibe.shadow}`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${vibe.halo}`}
                />
                <h3 className="text-lg font-semibold leading-snug">
                  <span
                    className={`mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70 ${vibe.accent}`}
                  >
                    <span aria-hidden className="text-lg">{vibe.emoji}</span>
                    {vibe.badge}
                  </span>
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-slate-800/90 dark:text-slate-100/90">{s.intro}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-800/90 dark:text-slate-100/90 list-disc pl-4">
                  {s.lines.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  {s.chips.map((c) => (
                    <span key={c} className={`rounded-full px-3 py-1 ${vibe.chip}`}>
                      {c}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
