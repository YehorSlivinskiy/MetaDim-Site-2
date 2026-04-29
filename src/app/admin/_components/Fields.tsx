"use client";

import { useId } from "react";

const labelClass = "text-xs uppercase tracking-widest text-zinc-500";
const inputClass =
  "w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-gold transition-colors text-sm";

type CommonProps = {
  label: string;
  name: string;
  hint?: string;
  required?: boolean;
};

export function TextField({
  label,
  name,
  defaultValue,
  hint,
  required,
  placeholder,
  type = "text",
}: CommonProps & {
  defaultValue?: string;
  placeholder?: string;
  type?: "text" | "email" | "url" | "tel";
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export function NumberField({
  label,
  name,
  defaultValue,
  hint,
  required,
  step,
  min,
}: CommonProps & {
  defaultValue?: number | null;
  step?: number | string;
  min?: number;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type="number"
        defaultValue={defaultValue ?? ""}
        step={step}
        min={min}
        required={required}
        className={inputClass}
      />
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export function TextareaField({
  label,
  name,
  defaultValue,
  hint,
  required,
  rows = 4,
  placeholder,
}: CommonProps & {
  defaultValue?: string | null;
  rows?: number;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        required={required}
        className={inputClass + " resize-y"}
      />
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export function ToggleField({
  label,
  name,
  defaultChecked,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3 py-2">
      <input
        id={id}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 w-4 h-4 accent-gold"
      />
      <label htmlFor={id} className="flex-1 cursor-pointer">
        <div className="text-sm text-zinc-200">{label}</div>
        {hint && <div className="text-xs text-zinc-500 mt-0.5">{hint}</div>}
      </label>
    </div>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
  hint,
  required,
}: CommonProps & {
  defaultValue?: string;
  options: { label: string; value: string }[];
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className={inputClass}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-zinc-900">
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}
