import Link from 'next/link';
import Button from '@/components/Button';
import ThemeToggle from '@/components/ThemeToggle';
import BackgroundToggle from '@/components/BackgroundToggle';

export default function Nav({ backToCases = false }: { backToCases?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border supports-[backdrop-filter]:bg-background/80 bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            {backToCases && (
              <Button variant="secondary" href="/#cases" className="px-3 py-1.5">
                ← Назад
              </Button>
            )}
            <Link href="/" className="text-sm font-semibold">
              Иван Сидоров · Системный архитектор
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/#services" className="opacity-80 hover:opacity-100">Услуги</Link>
            <Link href="/#cases" className="opacity-80 hover:opacity-100">Кейсы</Link>
            <Link href="/#process" className="opacity-80 hover:opacity-100">Процесс</Link>
            <Link href="https://github.com" className="opacity-80 hover:opacity-100">GitHub</Link>
            <Link href="https://t.me" className="opacity-80 hover:opacity-100">Telegram</Link>

            {/* переключатель фона */}
            <div className="rounded-lg p-1.5 hover:bg-[rgb(var(--muted))] transition">
              <BackgroundToggle />
            </div>

            {/* переключатель темы */}
            <div className="rounded-lg p-1.5 hover:bg-[rgb(var(--muted))] transition">
              <ThemeToggle aria-label="Переключить тему" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
