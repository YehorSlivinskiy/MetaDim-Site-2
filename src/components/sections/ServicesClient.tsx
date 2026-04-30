"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, CheckCircle } from "@phosphor-icons/react";
import type { ServiceRow } from "@/lib/supabase";

const itemVariants = {
  hidden: (flip: boolean) => ({ opacity: 0, x: flip ? 40 : -40 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 60, damping: 18 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 280, damping: 28 } },
  exit: { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.18 } },
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function ServiceModal({ service, index, onClose }: { service: ServiceRow; index: number; onClose: () => void }) {
  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-zinc-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800"
      >
        <div className="relative h-56 lg:h-72 overflow-hidden">
          {service.icon && (
            <Image
              src={service.icon}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
          <div className="absolute bottom-6 left-8 flex items-end gap-4">
            <span className="font-display text-5xl font-semibold text-gold/40 tracking-tighter leading-none">
              {pad(index)}
            </span>
            <h3 className="font-display font-semibold text-zinc-100 text-2xl lg:text-3xl tracking-tight leading-none mb-1">
              {service.title}
            </h3>
          </div>
        </div>

        <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10">
          <div className="flex flex-col gap-8">
            {service.intro && (
              <p className="text-zinc-300 leading-relaxed text-base">{service.intro}</p>
            )}

            <div>
              <h4 className="font-display text-xs tracking-[0.15em] uppercase text-zinc-500 mb-4">
                Що включає
              </h4>
              <ul className="flex flex-col gap-3">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                    <CheckCircle size={16} weight="fill" className="text-gold/70 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {service.result && (
              <div className="border-l-2 border-gold/40 pl-5">
                <p className="text-zinc-300 text-sm leading-relaxed italic">{service.result}</p>
              </div>
            )}
          </div>

          <div className="lg:w-56">
            <h4 className="font-display text-xs tracking-[0.15em] uppercase text-zinc-500 mb-6">
              Етапи роботи
            </h4>
            <div className="flex flex-col gap-0">
              {service.process.map((p, i) => (
                <div key={i} className="flex items-start gap-4 pb-5 relative">
                  {i < service.process.length - 1 && (
                    <div className="absolute left-[15px] top-7 bottom-0 w-px bg-zinc-800" />
                  )}
                  <div className="w-8 h-8 flex items-center justify-center border border-zinc-700 bg-zinc-900 flex-shrink-0 relative z-10">
                    <span className="font-display text-[10px] text-gold/60">{p.step}</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-snug pt-1.5">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 lg:px-12 pb-8 lg:pb-10 flex flex-wrap items-center gap-3 border-t border-zinc-800 pt-6">
          <Link
            href={`/services/${service.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-gold text-zinc-950 font-display font-medium px-6 py-3 text-sm tracking-wide hover:bg-gold-dim transition-colors duration-200 active:scale-[0.98]"
          >
            Повна сторінка послуги <ArrowRight size={14} weight="bold" />
          </Link>
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 font-display font-medium px-6 py-3 text-sm tracking-wide hover:border-zinc-500 hover:text-zinc-100 transition-colors"
          >
            Обговорити
          </a>
          <button
            onClick={onClose}
            className="ml-auto text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
          >
            Закрити
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesClient({ services }: { services: ServiceRow[] }) {
  const [active, setActive] = useState<{ service: ServiceRow; index: number } | null>(null);

  return (
    <>
      <div className="flex flex-col gap-0">
        {services.map((service, i) => {
          const num = i + 1;
          return (
            <motion.div
              key={service.id}
              custom={service.flip}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={`grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-0 border-b border-zinc-800 ${
                service.flip ? "lg:grid-cols-[2fr_3fr]" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${service.flip ? "lg:order-2" : ""}`}>
                <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] overflow-hidden group relative">
                  {service.icon && (
                    <Image
                      src={service.icon}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/10 transition-colors duration-500" />
                </div>
              </div>

              <div
                className={`flex flex-col justify-center gap-5 p-8 lg:p-12 xl:p-16 ${
                  service.flip ? "lg:order-1" : ""
                }`}
              >
                <span className="font-display text-4xl font-semibold text-gold/50 tracking-tighter leading-none">
                  {pad(num)}
                </span>
                <h3
                  className="font-display font-medium text-zinc-100 tracking-tight leading-tight -mt-2"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
                >
                  {service.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed max-w-[40ch]">
                  {service.description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setActive({ service, index: num })}
                    className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all duration-200 w-fit"
                  >
                    Детальніше <ArrowRight size={14} weight="bold" />
                  </button>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-zinc-500 hover:text-zinc-200 text-sm transition-colors"
                  >
                    Сторінка послуги →
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <ServiceModal
            service={active.service}
            index={active.index}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
