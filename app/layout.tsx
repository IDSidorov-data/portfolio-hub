// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import ThemeScript from "@/components/ThemeScript";
import Providers from "./providers";
import dynamic from "next/dynamic";

// динамический импорт нового фонового эффекта (отключён SSR)
const BackgroundFXPro = dynamic(() => import("@/components/BackgroundFXPro"), { ssr: false });

export const metadata: Metadata = {
  title: "Иван Сидоров — Системный архитектор",
  description: "Аналитика, бекенд и боты — системно, быстро, с результатом",
  metadataBase: new URL("https://your-domain.ru"),
  openGraph: { images: ["/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <meta name="color-scheme" content="light dark" />
      </head>
      {/* .page-bg остаётся как fallback на случай отключённого WebGL */}
      <body className="page-bg min-h-dvh antialiased">
        <Providers>
          <BackgroundFXPro />
          <div className="relative z-10">{children}</div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
