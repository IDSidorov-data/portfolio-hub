'use client';

import Button from '@/components/Button';
import Container from '@/components/Container';
import { TG_URL, RESUME_URL } from '@/lib/constants';
import { sendEvent } from '@/lib/analytics';
import { useCleanMode } from '@/lib/clean-mode';

export default function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  const cleanMode = useCleanMode();
  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      <Container className="text-left">
        <h1 className="text-4xl font-bold leading-tight sm:text-6xl max-w-4xl">
          Аналитика, бэкенд, сайты и боты — системно, быстро, с результатом
        </h1>

        <p className="mt-6 max-w-2xl text-xl sm:text-2xl opacity-80">
          A/B-тесты, MVP-валидации, API интеграции и автоматизация, которые экономят спринты и растят ключевые метрики.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {cleanMode ? (
            <p className="text-base text-slate-600 dark:text-slate-300">
              Для связи используйте чат площадки.
            </p>
          ) : (
            <>
              <Button
                variant="accent"
                href={TG_URL}
                onClick={() => sendEvent('click_tg_primary', { source: 'hero' })}
                data-qa="cta-hero-telegram"
                className="min-h-[44px]"
              >
                Написать в Telegram
              </Button>

              <Button
                variant="secondary"
                onClick={() => document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth' })}
                data-qa="cta-hero-brief"
                className="min-h-[44px]"
              >
                Оставить бриф проекта
              </Button>

              <Button
                variant="secondary"
                href={RESUME_URL}
                onClick={() => sendEvent('click_resume_pdf')}
                data-qa="cta-hero-resume"
                className="min-h-[44px]"
              >
                Скачать резюме (PDF)
              </Button>

              <Button
                variant="secondary"
                onClick={() => {
                  sendEvent('tg_booking_click_placeholder', { source: 'hero' });
                  onOpenBooking();
                }}
                data-qa="cta-hero-booking"
                className="min-h-[44px]"
              >
                Записаться на 15-мин (скоро)
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
