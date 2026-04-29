# MetaDim — преміальний сайт будівельної компанії

Маркетинговий сайт + повноцінна адмін-панель для будівельної компанії MetaDim. Темна преміальна естетика, золотий акцент `#C9A84C`, оригінальні Phosphor-іконки, плавні анімації Framer Motion.

Усі контентні блоки сайту (Hero, послуги, проекти, відгуки, статистика, контакти, "Чому MetaDim", футер) редагуються через адмін-панель без правок коду.

---

## Стек

- **Next.js 14** (App Router, Server Components, Server Actions)
- **TypeScript**, strict mode
- **Tailwind CSS v3** + `tailwind-merge` + `clsx`
- **Framer Motion v11** — анімації на головній і в портфоліо
- **Supabase** — Postgres + Auth + Storage + RLS
- **Phosphor Icons** — іконки
- **Space Grotesk** (display) + **DM Sans** (body) через `next/font/google`
- **browser-image-compression** — клієнтське стиснення в WebP

---

## Можливості сайту

### Публічна частина (`/`, `/works`)

- Hero з анімованими лініями та архітектурним кресленням
- Маркі-стрічка партнерів
- Лічильники-стати з `react-countup`
- Каталог послуг з модалками
- Портфоліо: асиметрична масонрі-сітка з 6 проектів на головній
- "Чому MetaDim": 5 пунктів + сертифікати
- Каруселі відгуків
- Контактна форма → Supabase + Telegram-сповіщення
- Окрема сторінка `/works` з фільтрацією по категоріях і модалками проектів

### Адмін-панель (`/admin`)

Захищена через Supabase Auth, доступна лише авторизованим адмінам (RLS на запис).

| Розділ | Можливості |
|---|---|
| **Дашборд** | Лічильники контенту, останні заявки |
| **Проекти** | CRUD, тогл "На головній" окремо від "Опубліковано", сортування |
| **Послуги** | CRUD з масивами особливостей і кроків процесу |
| **Відгуки** | Інлайн редагування на одній сторінці |
| **Статистика** | Швидке редагування цифр у секції лічильників |
| **Контент сайту** | Редагування Hero, контактів, навігації, "Чому MetaDim", футера |
| **Заявки** | Список форм з контактів, зміна статусу (нове / в роботі / виконано / спам) |

### Завантаження зображень

- Drag-and-drop або вибір файлу з диску/телефона
- Автостиснення в WebP до ~500 КБ, max 2000 px по довшій стороні (повністю в браузері)
- Зберігання в публічному Supabase Storage bucket `site-images`
- Альтернативно — пікер з `/public/images` або введення зовнішнього URL
- Форма-специфічні підказки про оптимальні пропорції та розмір

### Мобільна оптимізація

- Sticky гамбургер-меню з назвою поточного розділу
- Усі форми, списки та сітки адаптовані під вузькі екрани
- Тапові цілі ≥ 44px, scroll-lock у відкритому меню, авто-закриття на переході

---

## Архітектура контенту

```
projects, services, testimonials, stats, contact_requests
                    ↓
              site_settings (key → JSONB)
                ↑                ↓
        admin server actions ← server components з fallback
                                  → public site
```

- Усі CRUD через **Server Actions** + `revalidatePath`.
- Адмін-write використовує сесію авторизованого користувача (RLS), без service-role-key на сервері.
- Захардкоджені раніше блоки (hero, контакти, футер тощо) винесено в єдину таблицю `site_settings` з типобезпечним JSON-shape для кожного ключа.

---

## Локальний запуск

### 1. Залежності

```bash
npm install
```

### 2. `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
TELEGRAM_BOT_TOKEN=<optional, for contact form notifications>
TELEGRAM_CHAT_ID=<optional>
```

### 3. Supabase

Таблиці й міграції описані як SQL у Supabase Dashboard / MCP. Потрібно мати:
- `projects`, `services`, `testimonials`, `stats`, `contact_requests`, `site_settings`
- RLS-політики: anon `select`, authenticated full access на контентні таблиці
- Storage bucket `site-images` (public, 10 МБ ліміт, тільки `image/*`)

### 4. Створити адмін-юзера

У Supabase Dashboard → **Authentication → Users → Add user** (email + password, без email confirmation для простоти).

### 5. Запуск

```bash
npm run dev
```

Сайт: http://localhost:3000  
Адмінка: http://localhost:3000/admin

---

## Структура

```
src/
├── app/
│   ├── (public)              — / (головна), /works
│   ├── api/contact/          — POST → Supabase + Telegram
│   └── admin/
│       ├── (shell)/          — захищені сторінки під сайдбаром
│       ├── login/            — публічна форма входу
│       ├── _components/      — Sidebar, форми, ImagePicker, поля
│       └── actions/          — Server Actions для кожної сутності
├── components/
│   ├── sections/             — Hero, Portfolio, Footer тощо
│   │   └── *Client.tsx       — інтерактивні частини, що рендеряться у клієнті
│   └── ui/                   — Button, SectionLabel, AnimatedNumber
├── lib/
│   ├── supabase.ts           — anon-клієнт + типи
│   ├── supabase-server.ts    — server-клієнт із cookie-сесіями
│   ├── supabase-browser.ts   — browser-клієнт (для аплоадів)
│   ├── db.ts                 — getProjects, getServices, getSiteSetting…
│   └── gallery.ts            — список файлів /public/images
└── middleware.ts             — захист /admin
```

---

## Розробка

```bash
npm run dev          # dev server
npm run build        # production build
npm run lint         # eslint
```

---

## Дизайн

- Палітра: `bg-zinc-950`, `text-zinc-100`, золото `#C9A84C` / `#A8893A`
- Типографіка: дисплей — Space Grotesk semibold, тіло — DM Sans
- Анімації: spring-easing для появи елементів, `cubic-bezier(0.16, 1, 0.3, 1)` для hover
- Іконки: Phosphor — `thin` weight для декору, `regular` / `bold` для UI

---

## Ліцензія

Приватний проект. © MetaDim, 2024–2026.
