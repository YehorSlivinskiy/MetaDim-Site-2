"use client";

import { useState, useTransition } from "react";
import { signInAction } from "../actions/auth";

export default function LoginForm({ next }: { next: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        setError(null);
        startTransition(async () => {
          const result = await signInAction(formData);
          if (result?.error) setError(result.error);
        });
      }}
      className="flex flex-col gap-5"
    >
      <input type="hidden" name="next" value={next} />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-widest text-zinc-500">Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="bg-zinc-900 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-gold transition-colors"
          placeholder="you@metadim.ua"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-widest text-zinc-500">Пароль</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="bg-zinc-900 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="bg-gold text-zinc-950 font-display font-medium px-6 py-3 text-sm tracking-wide hover:bg-gold-dim disabled:opacity-60 transition-colors"
      >
        {pending ? "Вхід..." : "Увійти"}
      </button>
    </form>
  );
}
