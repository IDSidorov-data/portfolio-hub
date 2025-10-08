import type { Metadata } from "next";
import CleanModeRootProvider from "@/components/CleanModeRootProvider";
import type { ReactNode } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Иван Сидоров — Системный архитектор",
  description: "Аналитика, бекенд и боты — системно, быстро, с результатом",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: new URL('/', siteUrl).toString(),
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/market`,
    siteName: "Иван Сидоров — Системный архитектор",
    title: "Иван Сидоров — Системный архитектор",
    description: "Аналитика, бекенд и боты — системно, быстро, с результатом",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function MarketLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <CleanModeRootProvider value>{children}</CleanModeRootProvider>;
}
