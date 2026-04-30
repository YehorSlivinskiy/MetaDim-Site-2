"use client";

import { useState } from "react";
import { Plus, Trash, ArrowUp, ArrowDown } from "@phosphor-icons/react";
import type { LegalSection } from "@/lib/supabase";

const labelClass = "text-xs uppercase tracking-widest text-zinc-500";
const inputClass =
  "w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-gold transition-colors text-sm";

export default function LegalSectionsEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: LegalSection[] | null;
}) {
  const [sections, setSections] = useState<LegalSection[]>(
    (defaultValue ?? []).map((s) => ({
      title: s.title ?? "",
      paragraphs: s.paragraphs?.length ? s.paragraphs : [""],
    })),
  );

  const updateSection = (i: number, patch: Partial<LegalSection>) =>
    setSections((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    );

  const moveSection = (i: number, dir: -1 | 1) =>
    setSections((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const copy = prev.slice();
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

  const removeSection = (i: number) =>
    setSections((prev) => prev.filter((_, idx) => idx !== i));

  const addSection = () =>
    setSections((prev) => [...prev, { title: "", paragraphs: [""] }]);

  const updateParagraph = (sIdx: number, pIdx: number, value: string) =>
    setSections((prev) =>
      prev.map((s, idx) =>
        idx === sIdx
          ? {
              ...s,
              paragraphs: s.paragraphs.map((p, j) => (j === pIdx ? value : p)),
            }
          : s,
      ),
    );

  const addParagraph = (sIdx: number) =>
    setSections((prev) =>
      prev.map((s, idx) =>
        idx === sIdx ? { ...s, paragraphs: [...s.paragraphs, ""] } : s,
      ),
    );

  const removeParagraph = (sIdx: number, pIdx: number) =>
    setSections((prev) =>
      prev.map((s, idx) =>
        idx === sIdx
          ? { ...s, paragraphs: s.paragraphs.filter((_, j) => j !== pIdx) }
          : s,
      ),
    );

  return (
    <div className="flex flex-col gap-2">
      <label className={labelClass}>Секції документа</label>
      <p className="text-xs text-zinc-500 -mt-1">
        Кожна секція = заголовок (H2 на сайті) + один або кілька параграфів.
      </p>

      <div className="flex flex-col gap-3 mt-2">
        {sections.map((section, i) => (
          <div
            key={i}
            className="bg-zinc-950 border border-zinc-800 p-4 flex flex-col gap-3"
          >
            <div className="flex items-start gap-2">
              <div className="flex-1 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600">
                  Секція {i + 1} — заголовок
                </span>
                <input
                  value={section.title ?? ""}
                  onChange={(e) => updateSection(i, { title: e.target.value })}
                  placeholder="Наприклад: Загальні положення"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1 pt-5">
                <button
                  type="button"
                  onClick={() => moveSection(i, -1)}
                  disabled={i === 0}
                  className="text-zinc-500 hover:text-gold disabled:opacity-30 p-1 transition-colors"
                  aria-label="Догори"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(i, 1)}
                  disabled={i === sections.length - 1}
                  className="text-zinc-500 hover:text-gold disabled:opacity-30 p-1 transition-colors"
                  aria-label="Донизу"
                >
                  <ArrowDown size={14} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeSection(i)}
                className="text-zinc-500 hover:text-red-400 transition-colors p-2 mt-4"
                aria-label="Видалити секцію"
              >
                <Trash size={14} />
              </button>
            </div>

            <div className="flex flex-col gap-2 pl-1">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600">
                Параграфи
              </span>
              {section.paragraphs.map((p, pIdx) => (
                <div key={pIdx} className="flex gap-2 items-start">
                  <textarea
                    value={p}
                    rows={3}
                    onChange={(e) => updateParagraph(i, pIdx, e.target.value)}
                    placeholder="Текст параграфа…"
                    className={inputClass + " resize-y"}
                  />
                  <button
                    type="button"
                    onClick={() => removeParagraph(i, pIdx)}
                    disabled={section.paragraphs.length === 1}
                    className="text-zinc-500 hover:text-red-400 disabled:opacity-30 transition-colors p-2"
                    aria-label="Видалити параграф"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addParagraph(i)}
                className="self-start flex items-center gap-1.5 text-xs text-zinc-400 hover:text-gold border border-zinc-800 hover:border-gold px-3 py-1.5 transition-colors"
              >
                <Plus size={12} />
                Додати параграф
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSection}
        className="self-start flex items-center gap-1.5 text-sm text-zinc-200 border border-zinc-700 hover:border-gold hover:text-gold px-4 py-2 transition-colors"
      >
        <Plus size={14} />
        Додати секцію
      </button>

      <input
        type="hidden"
        name={name}
        value={JSON.stringify(
          sections.map((s) => ({
            title: s.title?.trim() || undefined,
            paragraphs: s.paragraphs
              .map((p) => p.trim())
              .filter((p) => p.length > 0),
          })),
        )}
      />
    </div>
  );
}
