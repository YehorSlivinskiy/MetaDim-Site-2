"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import SectionLabel from "@/components/ui/SectionLabel";
import type { HeroSettings } from "@/lib/supabase";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 20 },
  },
};

const svgVariants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1.2,
      delay: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function HeroClient({ settings }: { settings: HeroSettings }) {
  return (
    <section className="hero-section relative flex items-center overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-gold/[0.04] blur-[120px]" />
        <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 pb-16 lg:pt-0 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-0 items-center min-h-[100dvh] lg:min-h-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 lg:py-32"
          >
            {settings.eyebrow && (
              <motion.div variants={itemVariants}>
                <SectionLabel>{settings.eyebrow}</SectionLabel>
              </motion.div>
            )}

            <div className="overflow-hidden">
              <motion.h1
                variants={itemVariants}
                className="font-display font-semibold tracking-[-0.03em] leading-none text-zinc-100"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5.75rem)" }}
              >
                {settings.title_line1}
                {settings.title_line2_gold && (
                  <>
                    <br />
                    <span className="text-gold">{settings.title_line2_gold}</span>
                  </>
                )}
              </motion.h1>
            </div>

            {settings.subtitle && (
              <motion.p
                variants={itemVariants}
                className="text-zinc-400 text-lg leading-relaxed max-w-[48ch]"
              >
                {settings.subtitle}
              </motion.p>
            )}

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {settings.primary_cta?.label && (
                <a
                  href={settings.primary_cta.href || "#"}
                  className="inline-flex items-center gap-2 bg-gold text-zinc-950 font-display font-medium px-7 py-4 text-sm tracking-wide hover:bg-gold-dim transition-colors duration-200 active:scale-[0.98]"
                >
                  {settings.primary_cta.label}
                  <ArrowRight size={16} weight="bold" />
                </a>
              )}
              {settings.secondary_cta?.label && (
                <a
                  href={settings.secondary_cta.href || "#"}
                  className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 font-display px-7 py-4 text-sm tracking-wide hover:border-zinc-500 hover:text-zinc-100 transition-colors duration-200"
                >
                  {settings.secondary_cta.label}
                </a>
              )}
            </motion.div>

            {settings.mini_stats?.length > 0 && (
              <motion.div variants={itemVariants} className="flex items-center gap-6 pt-2">
                {settings.mini_stats.map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-display font-semibold text-zinc-100 text-xl">
                      {s.value}
                    </span>
                    <span className="text-zinc-500 text-xs tracking-wide">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center justify-center lg:h-screen"
            aria-hidden="true"
          >
            <img
              src="/images/image-17.webp"
              alt="Архітектурне креслення"
              className="h-full w-auto max-h-screen object-contain"
              style={{
                mixBlendMode: "screen",
                opacity: 0.9,
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskComposite: "source-in",
              }}
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent"
        />
      </div>
    </section>
  );
}
