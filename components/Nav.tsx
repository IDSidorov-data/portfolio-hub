import Link from 'next/link'
import Button from '@/components/Button'
import ThemeToggle from '@/components/ThemeToggle'
import BackgroundToggle from '@/components/BackgroundToggle' // ← вернули

export default function Nav({ backToCases = false }: { backToCases?: boolean }) {
  return (
    // плотная плашка и там, и там
    <header
      data-back={backToCases ? '1' : undefined}
      className="sticky top-0 z-40 border-b border-border supports-[backdrop-filter]:bg-background/80 bg-background/95 backdrop-blur"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 min-w-0">
        <nav className="flex h-14 items-center justify-between">
          {/* левая группа не раздувает ширину */}
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            {backToCases && (
              <Button variant="secondary" href="/" className="px-3 py-1.5">
                ← Назад
              </Button>
            )}
            <Link
              href="/"
              className="font-semibold hidden max-w-[60vw] md:inline text-sm truncate"
            >
              Иван Сидоров · Системный архитектор
            </Link>
          </div>

          {/* правая группа не сжимается и не ломает ширину */}
          <div className="flex items-center gap-1 md:gap-4 shrink-0">
            <div className="rounded-lg p-1.5 hover:bg-[rgb(var(--muted))] transition">
              <ThemeToggle aria-label="Переключить тему" />
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <Link href="/#services" className="opacity-80 hover:opacity-100">
                Услуги
              </Link>
              <Link href="/#cases" className="opacity-80 hover:opacity-100">
                Кейсы
              </Link>
              <Link href="/#process" className="opacity-80 hover:opacity-100">
                Процесс
              </Link>
              <Link href="https://github.com" className="opacity-80 hover:opacity-100">
                GitHub
              </Link>
              <Link href="https://t.me" className="opacity-80 hover:opacity-100">
                Telegram
              </Link>
              <div className="hidden md:flex rounded-lg p-1.5 hover:bg-[rgb(var(--muted))] transition">
                <BackgroundToggle aria-label="Переключить фон" />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
