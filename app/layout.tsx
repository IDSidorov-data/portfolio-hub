import "./globals.css";
import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import ThemeScript from "@/components/ThemeScript";
import ScrollMemory from "@/components/ScrollMemory";
import Providers from "./providers";
import dynamic from "next/dynamic";

const BackgroundFXGate = dynamic(() => import("@/components/BackgroundFXGate"), { ssr: false });

// базовый URL сайта
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Иван Сидоров — Системный архитектор",
  description: "Аналитика, бекенд и боты — системно, быстро, с результатом",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Иван Сидоров — Системный архитектор",
    images: ["/og.png"], // если есть og-image
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <meta name="color-scheme" content="light dark" />
      </head>
      {/* .page-bg остаётся как fallback на случай отключённого WebGL */}
      <body className="page-bg min-h-dvh antialiased min-h-screen overflow-x-hidden">
        <Providers>
          <BackgroundFXGate />
          <div className="relative z-10">{children}</div>
        </Providers>
        <ScrollMemory />
        <Analytics />
      </body>
    </html>
  );
}
