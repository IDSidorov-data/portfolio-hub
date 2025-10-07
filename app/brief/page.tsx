import type { Metadata } from "next";
import BriefForm from "@/components/BriefForm";

export const metadata: Metadata = {
  title: "Brief · Мини-форма",
  description: "Заявка в Telegram без БД",
};

const CLIENT_MAX_UPLOAD_MB =
  Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_MB ?? process.env.MAX_UPLOAD_MB ?? 4);

export default function BriefPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Оставить заявку</h1>
      <p className="text-sm text-gray-500 mb-6">
        Заявка уйдёт напрямую в мой приватный Telegram-канал. Без БД.
      </p>
      <BriefForm maxUploadMB={CLIENT_MAX_UPLOAD_MB} />
    </main>
  );
}
