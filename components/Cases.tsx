import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { sendEvent } from '@/lib/analytics';

type CaseItem = {
  slug: string;
  title: string;
  teaser: string;
  tags: string[];
  result?: string;
};

const cases: CaseItem[] = [
  {
    slug: 'ab-test-mobile-game',
    title: 'Мобильная игра: гейт на 30-м',
    teaser: 'Спроектировал A/B-тест; подтверждён рост удержания — рекомендовано раскатывать.',
    tags: ['SQL', 'Python/statsmodels', 'PostgreSQL'],
    result: 'рост D7: +0.82 п.п.',
  },
  {
    slug: 'logistics-calculator',
    title: 'Логистика: MVP → pivot (~200 ч)',
    teaser: 'Прототип выявил истинную потребность: калькулятор ценообразования.',
    tags: ['Python', 'Streamlit', 'Customer interview'],
    result: 'экономия разработки: ~200 ч',
  },
  {
    slug: 'scenario',
    title: 'Scenario: ядро расчётов + лиды',
    teaser: 'Core считает P&L/CF/LTV; лендинг собирает лиды с антиспамом и логированием.',
    tags: ['Pandas/Streamlit', 'Excel-экспорт', 'Next.js', 'Sentry/reCAPTCHA', 'Тесты'],
    result: 'демо-платформа + лидогенерация',
  },
  {
    slug: 'loki-assistant',
    title: 'Локальный AI ассистент',
    teaser: '3 контура: локальные команды, LLM-классификация, визуальный анализ экрана.',
    tags: ['Whisper', 'piper-tts', 'Gemini 2.5 Flash', 'Python/Poetry'],
    result: 'быстрые команды + сложные сценарии',
  },
  {
    slug: 'rpa-bot',
    title: 'RPA: −95% времени, ~300k ₽/мес',
    teaser: 'Автоматизация рутины; детали под NDA.',
    tags: ['Python', 'Браузерная автоматизация', 'API-интеграции', 'Мониторинг'],
    result: '15 секунд вместо 7 минут',
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-12 sm:py-16">
      <Container>
        <h2 className="mb-6 text-3xl font-semibold">Кейсы</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Card key={c.slug} className="flex flex-col p-6 gap-3">
              <div>
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm opacity-80">{c.teaser}</p>
              </div>

              {c.result && (
                <div className="mt-2 text-sm font-medium text-foreground">
                  <span className="opacity-70">Результат: </span>
                  {c.result}
                </div>
              )}

              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-3 py-1 opacity-80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex justify-start">
                <Button
                  variant="primary"
                  href={`/cases/${c.slug}`}
                  onClick={() => sendEvent(`click_case_${c.slug}`)}
                >
                  Читать разбор
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
