"use client";

import { TextField, NumberField, TextareaField, ToggleField, SelectField } from "./Fields";
import { StringArrayField } from "./ArrayField";
import ImagePicker from "./ImagePicker";
import { FormShell, FormActions } from "./PageHeader";
import type { ProjectRow } from "@/lib/supabase";

const CATEGORIES = [
  { label: "Житлове", value: "Житлове" },
  { label: "Комерційне", value: "Комерційне" },
  { label: "Промислове", value: "Промислове" },
  { label: "Реконструкція", value: "Реконструкція" },
  { label: "Інтер'єр", value: "Інтер'єр" },
];

export default function ProjectForm({
  initial,
  gallery,
  action,
  cancelHref,
  destructiveAction,
}: {
  initial?: ProjectRow;
  gallery: string[];
  action: (formData: FormData) => void;
  cancelHref: string;
  destructiveAction?: () => void;
}) {
  return (
    <form action={action}>
      <FormShell>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          <TextField label="Назва проекту" name="name" defaultValue={initial?.name} required />
          <TextField
            label="Slug (URL-ідентифікатор)"
            name="slug"
            defaultValue={initial?.slug}
            hint="Залиште пустим — згенерується з назви."
          />
          <SelectField
            label="Категорія"
            name="category"
            defaultValue={initial?.category}
            options={CATEGORIES}
            required
          />
          <NumberField
            label="Рік"
            name="year"
            defaultValue={initial?.year ?? new Date().getFullYear()}
            min={1900}
            required
          />
          <TextField
            label="Розташування"
            name="location"
            defaultValue={initial?.location ?? ""}
            placeholder="м. Київ, вул. Хрещатик"
          />
          <TextField label="Площа" name="area" defaultValue={initial?.area ?? ""} placeholder="2 500 м²" />
          <TextField
            label="Тривалість"
            name="duration"
            defaultValue={initial?.duration ?? ""}
            placeholder="8 місяців"
          />
          <NumberField
            label="Порядок сортування"
            name="sort_order"
            defaultValue={initial?.sort_order ?? 0}
            hint="Менше число — вище у списку."
          />
        </div>

        <ImagePicker
          label="Зображення проекту"
          name="img"
          defaultValue={initial?.img}
          gallery={gallery}
          recommendation={{
            ratio: "4:3 або 16:9 (горизонтальне)",
            minSize: "≥ 1600 × 1200 px",
            note:
              "Для масонрі-сітки на головній найкраще працюють горизонтальні фото; вертикальні теж приймаються.",
          }}
        />

        <TextareaField
          label="Опис"
          name="description"
          defaultValue={initial?.description ?? ""}
          rows={5}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          <StringArrayField
            label="Факти"
            name="facts"
            defaultValue={initial?.facts}
            placeholder="Власна котельня"
          />
          <StringArrayField
            label="Теги"
            name="tags"
            defaultValue={initial?.tags}
            placeholder="BIM"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-zinc-950/50 border border-zinc-800 px-4 py-3">
          <ToggleField
            label="Опубліковано"
            name="is_published"
            defaultChecked={initial?.is_published ?? true}
            hint="Якщо вимкнено — проект ховається і з головної, і з каталогу."
          />
          <ToggleField
            label="Показувати в Портфоліо на головній"
            name="show_on_home"
            defaultChecked={initial?.show_on_home ?? true}
            hint="Каталог /works завжди показує проект, якщо він опублікований."
          />
        </div>

        {/* Hidden legacy fields — preserve existing layout values if set */}
        <input type="hidden" name="col_class" value={initial?.col_class ?? ""} />
        <input type="hidden" name="row_class" value={initial?.row_class ?? ""} />
        <input type="hidden" name="min_h" value={initial?.min_h ?? ""} />

        <FormActions
          cancelHref={cancelHref}
          destructive={
            destructiveAction
              ? { action: destructiveAction, label: "Видалити проект" }
              : undefined
          }
        />
      </FormShell>
    </form>
  );
}
