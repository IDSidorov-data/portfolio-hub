// app/privacy/page.tsx
export const metadata = {
  title: "Политика конфиденциальности",
};

export default function PrivacyPage() {
  return (
    <div className="prose">
      <h1>Политика конфиденциальности</h1>
      <p>
        Мы обрабатываем email и Telegram-аккаунты исключительно для связи по проектам.
        Данные не передаются третьим лицам: заявка уходит напрямую в закрытый Telegram-канал и не сохраняется в БД.
      </p>
    </div>
  );
}
