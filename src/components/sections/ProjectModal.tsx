"use client";

import { motion } from "framer-motion";
import { X, ArrowRight, MapPin, Calendar, Ruler, Buildings } from "@phosphor-icons/react";
import type { ProjectRow } from "@/lib/supabase";

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

export default function ProjectModal({
  project,
  number,
  onClose,
}: {
  project: ProjectRow;
  number: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-zinc-950/85 backdrop-blur-sm"
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
        <div className="relative h-64 lg:h-80 overflow-hidden">
          <img src={project.img} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
          <div className="absolute bottom-6 left-8">
            <span className="text-xs text-gold/70 tracking-widest uppercase">
              {project.category} · {project.year}
            </span>
            <h3 className="font-display font-semibold text-zinc-100 text-2xl lg:text-3xl tracking-tight mt-1">
              {project.name}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-zinc-800">
          {[
            { icon: <MapPin size={14} weight="fill" />, label: "Локація", value: project.location },
            { icon: <Ruler size={14} weight="fill" />, label: "Площа", value: project.area },
            { icon: <Calendar size={14} weight="fill" />, label: "Тривалість", value: project.duration },
            { icon: <Buildings size={14} weight="fill" />, label: "Категорія", value: project.category },
          ].map((m, i) => (
            <div key={i} className="flex flex-col gap-1 px-6 py-4 border-r border-zinc-800 last:border-r-0">
              <div className="flex items-center gap-1.5 text-gold/60">
                {m.icon}
                <span className="text-[10px] tracking-widest uppercase text-zinc-500">{m.label}</span>
              </div>
              <span className="text-zinc-200 text-sm font-medium">{m.value}</span>
            </div>
          ))}
        </div>

        <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10">
          <div className="flex flex-col gap-8">
            {project.description && (
              <p className="text-zinc-300 leading-relaxed">{project.description}</p>
            )}

            {project.facts.length > 0 && (
              <div>
                <h4 className="font-display text-xs tracking-[0.15em] uppercase text-zinc-500 mb-4">
                  Ключові характеристики
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.facts.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 border border-zinc-700 text-zinc-400 text-xs tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:flex items-start justify-end">
            <span className="font-display text-[8rem] font-semibold text-zinc-800/60 leading-none tracking-tighter select-none">
              {String(number).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="px-8 lg:px-12 pb-8 lg:pb-10 flex items-center gap-4 border-t border-zinc-800 pt-6">
          <a
            href="/#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-gold text-zinc-950 font-display font-medium px-6 py-3 text-sm tracking-wide hover:bg-gold-dim transition-colors duration-200 active:scale-[0.98]"
          >
            Схожий проект <ArrowRight size={14} weight="bold" />
          </a>
          <button onClick={onClose} className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
            Закрити
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
