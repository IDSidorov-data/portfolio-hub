"use client";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"          // вешает .dark на <html>
      defaultTheme="system"      // стартуем от системной темы
      enableSystem               // можно выключить, если не нужно
      storageKey="site-theme"    // ключ в localStorage (опционально)
      disableTransitionOnChange  // без миганий при переключении
    >
      {children}
    </ThemeProvider>
  );
}
