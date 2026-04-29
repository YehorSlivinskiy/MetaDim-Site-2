"use client";

import { TextField, TextareaField } from "./Fields";
import { StringArrayField, ObjectArrayField } from "./ArrayField";
import type {
  HeroSettings,
  ContactSettings,
  WhyMetaDimSettings,
  NavigationSettings,
  FooterSettings,
} from "@/lib/supabase";

const SectionShell = ({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action: (formData: FormData) => void;
  children: React.ReactNode;
}) => (
  <form
    action={action}
    className="bg-zinc-950 border border-zinc-800 p-4 sm:p-6 flex flex-col gap-4 sm:gap-5"
  >
    <header>
      <h2 className="font-display text-lg text-zinc-100">{title}</h2>
      {description && <p className="text-xs text-zinc-500 mt-1">{description}</p>}
    </header>
    {children}
    <div className="pt-4 border-t border-zinc-800">
      <button
        type="submit"
        className="bg-gold text-zinc-950 font-display text-sm px-5 py-2.5 hover:bg-gold-dim transition-colors"
      >
        Зберегти
      </button>
    </div>
  </form>
);

export function HeroForm({
  initial,
  action,
}: {
  initial: HeroSettings;
  action: (formData: FormData) => void;
}) {
  return (
    <SectionShell
      title="Hero (головний банер)"
      description="Перший екран сайту — заголовок, підзаголовок, кнопки."
      action={action}
    >
      <TextField label="Надзаголовок (eyebrow)" name="eyebrow" defaultValue={initial.eyebrow} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <TextField
          label="Заголовок (рядок 1)"
          name="title_line1"
          defaultValue={initial.title_line1}
        />
        <TextField
          label="Заголовок (рядок 2, золотом)"
          name="title_line2_gold"
          defaultValue={initial.title_line2_gold}
        />
      </div>
      <TextareaField
        label="Підзаголовок"
        name="subtitle"
        defaultValue={initial.subtitle}
        rows={3}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <TextField
          label="Основна CTA — текст"
          name="primary_cta_label"
          defaultValue={initial.primary_cta.label}
        />
        <TextField
          label="Основна CTA — посилання"
          name="primary_cta_href"
          defaultValue={initial.primary_cta.href}
        />
        <TextField
          label="Друга CTA — текст"
          name="secondary_cta_label"
          defaultValue={initial.secondary_cta.label}
        />
        <TextField
          label="Друга CTA — посилання"
          name="secondary_cta_href"
          defaultValue={initial.secondary_cta.href}
        />
      </div>
      <ObjectArrayField
        label="Міні-статистика (під підзаголовком)"
        name="mini_stats"
        defaultValue={initial.mini_stats}
        fields={[
          { key: "value", label: "Значення", placeholder: "27" },
          { key: "label", label: "Підпис", placeholder: "Років" },
        ]}
        emptyItem={{ value: "", label: "" }}
      />
    </SectionShell>
  );
}

export function ContactForm({
  initial,
  action,
}: {
  initial: ContactSettings;
  action: (formData: FormData) => void;
}) {
  return (
    <SectionShell
      title="Контакти"
      description="Адреса, телефон, email, графік. Використовується в секції контактів і футері."
      action={action}
    >
      <TextField label="Адреса" name="address" defaultValue={initial.address} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <TextField label="Телефон" name="phone" defaultValue={initial.phone} type="tel" />
        <TextField label="Email" name="email" defaultValue={initial.email} type="email" />
      </div>
      <TextField label="Графік роботи" name="hours" defaultValue={initial.hours} />
    </SectionShell>
  );
}

export function WhyMetaDimForm({
  initial,
  action,
}: {
  initial: WhyMetaDimSettings;
  action: (formData: FormData) => void;
}) {
  return (
    <SectionShell
      title="Чому MetaDim"
      description="Секція з причинами обрати компанію."
      action={action}
    >
      <TextField label="Надзаголовок" name="eyebrow" defaultValue={initial.eyebrow} />
      <TextField label="Заголовок" name="heading" defaultValue={initial.heading} />
      <TextareaField label="Вступний текст" name="intro" defaultValue={initial.intro} rows={3} />
      <ObjectArrayField
        label="Причини (5 пунктів зазвичай)"
        name="reasons"
        defaultValue={initial.reasons}
        fields={[
          { key: "num", label: "Номер", placeholder: "01" },
          { key: "title", label: "Заголовок", placeholder: "Власний парк техніки" },
          { key: "desc", label: "Опис" },
        ]}
        emptyItem={{ num: "", title: "", desc: "" }}
      />
      <StringArrayField
        label="Сертифікати"
        name="certs"
        defaultValue={initial.certs}
        placeholder="ISO 9001"
      />
    </SectionShell>
  );
}

export function NavigationForm({
  initial,
  action,
}: {
  initial: NavigationSettings;
  action: (formData: FormData) => void;
}) {
  return (
    <SectionShell
      title="Навігація"
      description="Пункти головного меню та кнопка-CTA."
      action={action}
    >
      <ObjectArrayField
        label="Пункти меню"
        name="items"
        defaultValue={initial.items}
        fields={[
          { key: "label", label: "Назва", placeholder: "Послуги" },
          { key: "href", label: "Посилання", placeholder: "#services або /works" },
        ]}
        emptyItem={{ label: "", href: "" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <TextField
          label="CTA-кнопка — текст"
          name="cta_label"
          defaultValue={initial.cta?.label}
        />
        <TextField
          label="CTA-кнопка — посилання"
          name="cta_href"
          defaultValue={initial.cta?.href}
        />
      </div>
    </SectionShell>
  );
}

export function FooterForm({
  initial,
  action,
}: {
  initial: FooterSettings;
  action: (formData: FormData) => void;
}) {
  return (
    <SectionShell
      title="Футер"
      description="Нижня частина сайту — опис компанії, соцмережі, посилання."
      action={action}
    >
      <TextareaField
        label="Опис компанії"
        name="brand_tagline"
        defaultValue={initial.brand_tagline}
        rows={3}
      />
      <ObjectArrayField
        label="Соцмережі"
        name="social"
        defaultValue={initial.social}
        fields={[
          {
            key: "platform",
            label: "Платформа",
            placeholder: "linkedin / instagram / facebook",
          },
          { key: "href", label: "Посилання", placeholder: "https://..." },
        ]}
        emptyItem={{ platform: "", href: "" }}
      />
      <ObjectArrayField
        label="Посилання — Компанія"
        name="company_links"
        defaultValue={initial.company_links}
        fields={[
          { key: "label", label: "Назва", placeholder: "Про компанію" },
          { key: "href", label: "Посилання", placeholder: "#why" },
        ]}
        emptyItem={{ label: "", href: "" }}
      />
      <ObjectArrayField
        label="Посилання — Послуги"
        name="service_links"
        defaultValue={initial.service_links}
        fields={[
          { key: "label", label: "Назва" },
          { key: "href", label: "Посилання" },
        ]}
        emptyItem={{ label: "", href: "" }}
      />
      <TextField label="Копірайт" name="copyright" defaultValue={initial.copyright} />
    </SectionShell>
  );
}
