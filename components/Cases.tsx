import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { sendEvent } from '@/lib/analytics';

const cases = [
  {
    id: 'abtest',
    slug: 'ab-test-mobile-game',
    title: 'A/B-тест (моб. игра)',
    tag: '+D7 удержание',
    desc: 'SQL-агрегации → Python/statsmodels → прирост D7; решение о rollout.',
  },
  {
    id: 'logistics',
    slug: 'logistics-calculator',
    title: 'Logistics Calculator',
    tag: 'MVP за дни',
    desc: 'Streamlit-MVP → −200 ч разработки; отказ от ненужной фичи.',
  },
  {
    id: 'scenario',
    slug: 'scenario',
    title: 'Scenario',
    tag: 'CAC, ARPU, ROMI',
    desc: 'Метрики, юнит-экономика, подготовка к продажам.',
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-16 sm:py-24">
      <Container>
        <h2 className="mb-10 text-3xl font-semibold">Кейсы</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Card key={c.id} className="flex flex-col justify-between p-6">
              <div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">{c.tag}</p>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{c.desc}</p>
              </div>
              <div className="mt-6">
                <Button
                  variant="ghost"
                  href={`/cases/${c.slug}`}
                  onClick={() => sendEvent(`click_case_${c.id}`)}
                >
                  Разбор
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
