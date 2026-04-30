"use client";

import { useState, useTransition } from "react";
import { Trash, Spinner } from "@phosphor-icons/react";

/**
 * Standalone destructive action button with a JS confirm() guard.
 * Renders its own <form> so it never gets nested inside an outer form.
 */
export default function DeleteButton({
  action,
  label = "Видалити",
  confirmMessage = "Ви впевнені? Цю дію неможливо скасувати.",
  className = "",
}: {
  action: () => void | Promise<void>;
  label?: string;
  confirmMessage?: string;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (typeof window !== "undefined" && !window.confirm(confirmMessage)) {
            return;
          }
          setError(null);
          startTransition(async () => {
            try {
              await action();
            } catch (e) {
              setError(
                e instanceof Error ? e.message : "Не вдалося видалити.",
              );
            }
          });
        }}
        className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm px-3 py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? (
          <Spinner size={14} className="animate-spin" />
        ) : (
          <Trash size={14} />
        )}
        {pending ? "Видалення…" : label}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
