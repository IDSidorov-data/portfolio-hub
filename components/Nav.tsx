import Link from 'next/link';
import Button from '@/components/Button';
import ThemeToggle from '@/components/ThemeToggle';

export default function Nav({ backToCases = false }: { backToCases?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 md:bg-background/70 md:backdrop-blur blur-mobile-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {backToCases && (
              <Button variant="secondary" href="/#cases" className="px-3 py-1.5">
                ← Назад
              </Button>
            )}
            <Link href="/" className="text-sm font-semibold truncate max-w-[60vw]">
              Иван Сидоров · Системный архитектор
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/#services" className="opacity-80 hover:opacity-100">Услуги</Link>
            <Link href="/#cases" className="opacity-80 hover:opacity-100">Кейсы</Link>
            <Link href="/#process" className="opacity-80 hover:opacity-100">Процесс</Link>
            <Link href="https://github.com" className="opacity-80 hover:opacity-100">GitHub</Link>
            <Link href="https://t.me" className="opacity-80 hover:opacity-100">Telegram</Link>

            <div className="flex items-center gap-1 shrink-0">
              {/* 1) Сначала — тёмная/светлая тема */}
              <div className="rounded-lg p-1.5 hover:bg-[rgb(var(--muted))] transition">
                <ThemeToggle aria-label="Переключить тему" />
              </div>

              {/* 2) Потом — динамический/статичный фон */}
              <div className="rounded-lg p-1.5 hover:bg-[rgb(var(--muted))] transition"></div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
