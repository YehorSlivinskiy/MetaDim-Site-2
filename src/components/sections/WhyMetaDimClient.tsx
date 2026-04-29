"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import type { WhyMetaDimSettings } from "@/lib/supabase";

export default function WhyMetaDimClient({ settings }: { settings: WhyMetaDimSettings }) {
  const { eyebrow, heading, intro, reasons, certs } = settings;
  return (
    <section id="why" className="bg-zinc-950 py-28 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24">
          {/* Left */}
          <div className="flex flex-col gap-6">
            {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
            {heading && (
              <h2
                className="font-display font-semibold tracking-tight text-zinc-100 leading-tight"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                {heading}
              </h2>
            )}
            {intro && (
              <p className="text-zinc-400 leading-relaxed whitespace-pre-line">{intro}</p>
            )}
            {certs?.length > 0 && (
              <div className="mt-4 pt-6 border-t border-zinc-800">
                <p className="text-zinc-600 text-sm uppercase tracking-widest mb-3">
                  Ліцензії та сертифікати
                </p>
                <div className="flex flex-wrap gap-2">
                  {certs.map((cert) => (
                    <span
                      key={cert}
                      className="text-xs text-zinc-400 border border-zinc-700 px-3 py-1 tracking-wide"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Numbered list */}
          <div className="flex flex-col">
            {reasons.map((r, i) => (
              <motion.div
                key={r.num}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 70,
                  damping: 18,
                }}
                className="relative flex gap-6 py-7 border-b border-zinc-800 last:border-b-0 group"
              >
                {/* Ghost number */}
                <span
                  className="font-display font-bold text-[4.5rem] leading-none text-gold/40 flex-shrink-0 w-16 group-hover:text-gold/60 transition-colors duration-300"
                  style={{ marginTop: "-0.5rem" }}
                >
                  {r.num}
                </span>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="font-display font-medium text-zinc-100 text-lg tracking-tight">
                    {r.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
