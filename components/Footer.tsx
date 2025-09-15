import Container from '@/components/Container';
import Button from '@/components/Button';
import { TG_URL, GITHUB_URL, RESUME_URL } from '@/lib/constants';
import { sendEvent } from '@/lib/analytics';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10 text-sm">
      <Container className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} Иван Сидоров · Системный архитектор
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="ghost"
            href={TG_URL}
            onClick={() => sendEvent('click_tg_primary', { source: 'footer' })}
          >
            Telegram
          </Button>
          <Button variant="ghost" href={GITHUB_URL}>
            GitHub
          </Button>
          <Button
            variant="ghost"
            href={RESUME_URL}
            onClick={() => sendEvent('click_resume_pdf')}
          >
            Резюме (PDF)
          </Button>
        </div>
      </Container>
    </footer>
  );
}
