"use client";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"          // вешает .dark на <html>
      defaultTheme="system"      // стартуем от системной темы
      enableSystem               // можно выключить, если не нужно
      storageKey="theme"         // ключ в localStorage синхронизирован с ThemeScript
      disableTransitionOnChange  // без миганий при переключении
    >
      {children}
    </ThemeProvider>
  );
}
