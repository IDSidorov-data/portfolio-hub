import './globals.css';
import type { Metadata } from 'next';
import Analytics from '@/components/Analytics';
import ThemeScript from '@/components/ThemeScript';

export const metadata: Metadata = {
  title: 'Иван Сидоров — Системный архитектор',
  description: 'Аналитика, бекенд и боты — системно, быстро, с результатом',
  metadataBase: new URL('https://your-domain.ru'),
  openGraph: { images: ['/og.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}