"use client";

import Container from '@/components/Container';
import Button from '@/components/Button';
import { TG_URL, GITHUB_URL, RESUME_URL } from '@/lib/constants';
import { sendEvent } from '@/lib/analytics';
import { useCleanMode } from '@/lib/clean-mode';

export default function Footer() {
  const cleanMode = useCleanMode();
  return (
    <footer className="border-t border-border dark:border-border py-10 text-sm">
      <Container className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} Иван Сидоров · Системный архитектор
        </div>
        {cleanMode ? (
          <p className="text-zinc-600 dark:text-zinc-300">
            Для связи используйте чат площадки.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              href={TG_URL}
              onClick={() => sendEvent('click_tg_primary', { source: 'footer' })}
              data-qa="cta-footer-telegram"
              className="min-h-[44px]"
            >
              Telegram
            </Button>
            <Button
              variant="secondary"
              href={GITHUB_URL}
              data-qa="cta-footer-github"
              className="min-h-[44px]"
            >
              GitHub
            </Button>
            <Button
              variant="secondary"
              href={RESUME_URL}
              onClick={() => sendEvent('click_resume_pdf')}
              data-qa="cta-footer-resume"
              className="min-h-[44px]"
            >
              Резюме (PDF)
            </Button>
          </div>
        )}
      </Container>
    </footer>
  );
}
