'use client';
import Link from 'next/link';
import Container from '@/components/Container';
import { TG_URL, GITHUB_URL } from '@/lib/constants';
import { sendEvent } from '@/lib/analytics';
import ThemeToggle from '@/components/ThemeToggle';
import Button from '@/components/Button';

export default function Nav({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-semibold">
          Иван Сидоров · Системный архитектор
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="#services"
            className="rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Услуги
          </Link>
          <Link
            href="#cases"
            className="rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Кейсы
          </Link>
          <Link
            href="#process"
            className="rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Процесс
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            GitHub
          </a>
          <a
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sendEvent('click_tg_primary', { source: 'nav' })}
            className="rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Telegram
          </a>
          <Button
            variant="secondary"
            className="ml-2 hidden sm:inline-flex"
            onClick={() => {
              sendEvent('tg_booking_click_placeholder', { source: 'nav' });
              onOpenBooking();
            }}
          >
            15-мин (скоро)
          </Button>
          <ThemeToggle />
        </div>
      </Container>
    </nav>
  );
}
