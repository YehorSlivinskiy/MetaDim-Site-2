"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import type { NavigationSettings } from "@/lib/supabase";

export default function NavigationClient({ settings }: { settings: NavigationSettings }) {
  const navLinks = settings.items;
  const cta = settings.cta;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.04] shadow-[inset_0_-1px_0_rgba(201,168,76,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <MetaDimLogo />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          {cta?.label && (
            <div className="hidden md:flex items-center gap-4">
              <a
                href={cta.href || "#contact"}
                className="text-sm font-medium bg-gold text-zinc-950 px-5 py-2.5 hover:bg-gold-dim transition-colors duration-200 tracking-wide"
              >
                {cta.label}
              </a>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-zinc-400 hover:text-zinc-100 transition-colors p-1"
            aria-label="Відкрити меню"
          >
            <List size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-zinc-950/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.04]">
              <MetaDimLogo />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 transition-colors p-1"
                aria-label="Закрити меню"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-6 pt-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl font-display font-medium text-zinc-200 hover:text-gold transition-colors py-3 border-b border-white/[0.04]"
                >
                  {link.label}
                </motion.a>
              ))}
              {cta?.label && (
                <motion.a
                  href={cta.href || "#contact"}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36, duration: 0.4 }}
                  className="mt-8 text-center font-medium bg-gold text-zinc-950 py-4 text-base tracking-wide"
                >
                  {cta.label}
                </motion.a>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MetaDimLogo() {
  return (
    <svg
      width="148"
      height="32"
      viewBox="0 0 148 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MetaDim"
    >
      {/* Icon mark: stacked building floors */}
      <rect x="0" y="0" width="22" height="7" fill="#c9a84c" />
      <rect x="0" y="10" width="22" height="7" fill="#c9a84c" fillOpacity="0.55" />
      <rect x="0" y="20" width="22" height="7" fill="#c9a84c" fillOpacity="0.25" />

      {/* Wordmark: META */}
      <text
        x="32"
        y="23"
        fontFamily="var(--font-display), Space Grotesk, system-ui, sans-serif"
        fontSize="15"
        fontWeight="600"
        letterSpacing="3"
        fill="#f4f4f5"
      >
        META
      </text>

      {/* Wordmark: DIM — gold */}
      <text
        x="96"
        y="23"
        fontFamily="var(--font-display), Space Grotesk, system-ui, sans-serif"
        fontSize="15"
        fontWeight="300"
        letterSpacing="3"
        fill="#c9a84c"
      >
        DIM
      </text>
    </svg>
  );
}
