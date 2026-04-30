"use client";

import { TextField, NumberField, TextareaField, ToggleField } from "./Fields";
import { StringArrayField, ObjectArrayField } from "./ArrayField";
import ImagePicker from "./ImagePicker";
import { FormShell, FormActions } from "./PageHeader";
import DeleteButton from "./DeleteButton";
import type { ServiceRow } from "@/lib/supabase";

export default function ServiceForm({
  initial,
  gallery,
  action,
  cancelHref,
  destructiveAction,
}: {
  initial?: ServiceRow;
  gallery: string[];
  action: (formData: FormData) => void;
  cancelHref: string;
  destructiveAction?: () => void;
}) {
  return (
    <>
    <form action={action}>
      <FormShell>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          <TextField label="Назва послуги" name="title" defaultValue={initial?.title} required />
          <TextField
            label="Slug"
            name="slug"
            defaultValue={initial?.slug}
            hint="Залиште пустим для авто-генерації."
          />
        </div>

        <TextareaField
          label="Короткий опис"
          name="description"
          defaultValue={initial?.description ?? ""}
          rows={2}
          required
        />

        <ImagePicker
          label="Іконка / зображення послуги"
          name="icon"
          defaultValue={initial?.icon ?? ""}
          gallery={gallery}
          recommendation={{
            ratio: "1:1 (квадратне) або 4:3",
            minSize: "≥ 1000 × 1000 px",
          }}
        />

        <StringArrayField
          label="Особливості"
          name="features"
          defaultValue={initial?.features}
          placeholder="Гарантія 10 років"
        />

        <TextareaField
          label="Розширений опис (для модалки)"
          name="intro"
          defaultValue={initial?.intro ?? ""}
          rows={4}
        />

        <ObjectArrayField
          label="Етапи процесу"
          name="process"
          defaultValue={initial?.process}
          fields={[
            { key: "step", label: "Номер", placeholder: "01" },
            { key: "label", label: "Назва", placeholder: "Планування" },
          ]}
          emptyItem={{ step: "", label: "" }}
        />

        <TextareaField
          label="Підсумок / результат"
          name="result"
          defaultValue={initial?.result ?? ""}
          rows={3}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          <NumberField
            label="Порядок"
            name="sort_order"
            defaultValue={initial?.sort_order ?? 0}
          />
          <ToggleField
            label="Перевернути макет"
            name="flip"
            defaultChecked={initial?.flip ?? false}
            hint="Зображення з іншого боку."
          />
          <ToggleField
            label="Опубліковано"
            name="is_published"
            defaultChecked={initial?.is_published ?? true}
          />
        </div>

        <FormActions cancelHref={cancelHref} />
      </FormShell>
    </form>

    {destructiveAction && (
      <div className="px-4 sm:px-6 lg:px-10 pb-10 max-w-4xl">
        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm text-zinc-300">Небезпечна зона</p>
            <p className="text-xs text-zinc-500 mt-1">
              Видалення послуги незворотне і одразу вилучає її з сайту.
            </p>
          </div>
          <DeleteButton
            action={destructiveAction}
            label="Видалити послугу"
            confirmMessage={`Видалити послугу «${initial?.title ?? ""}»? Цю дію неможливо скасувати.`}
          />
        </div>
      </div>
    )}
    </>
  );
}
