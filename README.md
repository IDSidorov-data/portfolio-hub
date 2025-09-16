

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

## 🔑 Настройка `.env.local`

```env
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Analytics
NEXT_PUBLIC_YM_ID=

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


