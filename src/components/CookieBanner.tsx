"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "metadim_cookie_consent_v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Slight delay so the banner doesn't fight LCP
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage may be unavailable (private mode) — show banner anyway
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: true, ts: Date.now() }),
      );
    } catch {}
    setVisible(false);
  };

  const dismiss = () => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: false, ts: Date.now() }),
      );
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Згода на використання cookies"
      className="fixed bottom-0 inset-x-0 z-[100] p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-[1200px] mx-auto bg-zinc-950 border border-zinc-800 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:p-5">
        <p className="text-sm text-zinc-300 leading-relaxed flex-1">
          Цей сайт використовує cookies для забезпечення роботи та аналітики
          відвідувань.{" "}
          <Link
            href="/cookies"
            className="text-gold hover:text-gold-dim underline underline-offset-2"
          >
            Докладніше
          </Link>
        </p>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={dismiss}
            className="text-sm text-zinc-400 hover:text-zinc-200 px-3 py-2 transition-colors"
          >
            Відхилити
          </button>
          <button
            type="button"
            onClick={accept}
            className="bg-gold text-zinc-950 font-display text-sm px-5 py-2 hover:bg-gold-dim transition-colors whitespace-nowrap"
          >
            Прийняти
          </button>
        </div>
      </div>
    </div>
  );
}
