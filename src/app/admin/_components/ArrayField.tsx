"use client";

import { useState } from "react";
import { Plus, Trash } from "@phosphor-icons/react";

const labelClass = "text-xs uppercase tracking-widest text-zinc-500";
const inputClass =
  "w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-gold transition-colors text-sm";

/**
 * Renders a hidden input with the JSON-serialized array of strings under `name`.
 * Server actions read formData.get(name) and JSON.parse it.
 */
export function StringArrayField({
  label,
  name,
  defaultValue,
  hint,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string[] | null;
  hint?: string;
  placeholder?: string;
}) {
  const [items, setItems] = useState<string[]>(defaultValue ?? []);

  const update = (i: number, v: string) =>
    setItems((prev) => prev.map((x, idx) => (idx === i ? v : x)));
  const remove = (i: number) =>
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  const add = () => setItems((prev) => [...prev, ""]);

  return (
    <div className="flex flex-col gap-2">
      <label className={labelClass}>{label}</label>
      {hint && <p className="text-xs text-zinc-500 -mt-1">{hint}</p>}
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="px-3 text-zinc-500 hover:text-red-400 transition-colors"
              aria-label="Видалити"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="self-start flex items-center gap-1.5 text-xs text-zinc-400 hover:text-gold border border-zinc-800 hover:border-gold px-3 py-1.5 transition-colors"
      >
        <Plus size={14} />
        Додати
      </button>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
    </div>
  );
}

/**
 * Array of objects with a defined shape (e.g. process steps {step, label}).
 * Each field has its own input row.
 */
export function ObjectArrayField<T extends Record<string, string>>({
  label,
  name,
  defaultValue,
  fields,
  hint,
  emptyItem,
}: {
  label: string;
  name: string;
  defaultValue?: T[] | null;
  fields: { key: keyof T & string; label: string; placeholder?: string }[];
  hint?: string;
  emptyItem: T;
}) {
  const [items, setItems] = useState<T[]>(defaultValue ?? []);

  const update = (i: number, key: keyof T & string, v: string) =>
    setItems((prev) =>
      prev.map((x, idx) => (idx === i ? { ...x, [key]: v } : x)),
    );
  const remove = (i: number) =>
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  const add = () => setItems((prev) => [...prev, { ...emptyItem }]);

  return (
    <div className="flex flex-col gap-2">
      <label className={labelClass}>{label}</label>
      {hint && <p className="text-xs text-zinc-500 -mt-1">{hint}</p>}
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-2 items-start bg-zinc-900/50 border border-zinc-800 p-3"
          >
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {fields.map((f) => (
                <div key={f.key} className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600">
                    {f.label}
                  </span>
                  <input
                    value={item[f.key] ?? ""}
                    onChange={(e) => update(i, f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-zinc-500 hover:text-red-400 transition-colors p-2"
              aria-label="Видалити"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="self-start flex items-center gap-1.5 text-xs text-zinc-400 hover:text-gold border border-zinc-800 hover:border-gold px-3 py-1.5 transition-colors"
      >
        <Plus size={14} />
        Додати
      </button>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
    </div>
  );
}
