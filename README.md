

# 🧑‍💻 Иван Сидоров — Системный архитектор

**Product / Data Analytics ↔ Backend/API ↔ Bots & Automation**

Навожу порядок в данных и процессах, быстро проверяю гипотезы через MVP и A/B-тесты, создаю работающие интеграции, API и Telegram-ботов.

🚀 Этот репозиторий — мой сайт-визитка на **Next.js 14 + Supabase**, с кейсами и формой обратной связи.

---

## ✨ Что внутри

* **Кейсы** — реальные проекты в формате *Контекст → Гипотеза → Подход → Результат*.
* **Услуги** — понятные пакеты с задачами, сроками и бюджетами.
* **Форма брифа** — заявки валидируются, сохраняются в Supabase и приходят на email.
* **Аналитика** — встроена поддержка GA4 и Яндекс.Метрики.
* **Полиглот** — базовая поддержка EN-версии сайта.
* **SEO/UX** — OG-картинки для кейсов, skeleton-загрузки, toast-уведомления.

---

## 🛠 Стек

* **Frontend:** Next.js 14 (App Router, TS), TailwindCSS
* **Content:** MDX для кейсов
* **Backend:** API-роуты на Next.js + Supabase
* **Automation:** Email-уведомления (Resend/SMTP), UTM-tracking
* **Analytics:** GA4 + Yandex.Metrica

---

## 🚀 Деплой

Сайт легко запускается на **Vercel**.
База — **Supabase** (таблицы `contacts`, `briefs`).

```bash
npm install
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

---

## 🧼 Маркет-режим без контактов

* Альтернативная страница: [http://localhost:3000/market](http://localhost:3000/market).
* Контент совпадает с главной, но блоки контактов, формы, CTA и упоминания мессенджеров не рендерятся.
* Внутри страницы выводится нейтральное сообщение «Для связи используйте чат площадки».
* Маршрут помечен `noindex, nofollow`, исключён из `robots.txt`/`sitemap.xml`, а в `middleware` добавлен заголовок `X-Robots-Tag`.

### Проверки

```bash
# после npm run build
npm run check:clean-market
npm run test:e2e
```

`check:clean-market` поднимает собранное приложение через `next start` и валидирует HTML на отсутствие контактов.
Playwright-сценарий `npm run test:e2e` запускается поверх production-сборки (нужен `npm run build`) и проверяет метатеги/DOM.
Для запуска тестов локально установите браузеры Playwright: `npx playwright install`.

---

## 🔑 Настройка `.env.local`

```env
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Analytics
NEXT_PUBLIC_YM_ID=

# Brief → Telegram
TG_BOT_TOKEN=
TG_CHAT_ID=
TG_TOPIC_ID=            # optional: topic/thread id for forum chats
MAX_UPLOAD_MB=4         # server-side upload limit in MB
NEXT_PUBLIC_MAX_UPLOAD_MB=4
ALLOWED_ORIGIN=         # optional: strict CORS origin

# Email (выберите одно)
RESEND_API_KEY=           # Resend.com
# или SMTP:
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
MAIL_FROM="Your Name <noreply@domain.com>"
MAIL_TO=owner@domain.com
```

---

## 📸 Скриншоты

* Кейсы лежат в `/content/cases` + картинки в `/public/cases/*/screenshot.png`
* OG-карточки автоматически подтягиваются при шаринге

---

## 📬 Контакты

* 🌐 [Сайт](https://your-domain.com)
* 💼 [GitHub](https://github.com/IDSidorov-data)
* ✈️ [Telegram](https://t.me/IDSidorov_data)

---

👉 Этот проект можно использовать как **стартер для личного портфолио**: меняешь контент и подключаешь свой Supabase.


