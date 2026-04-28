"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MapPin, Calendar, Ruler, Buildings } from "@phosphor-icons/react";
import SectionLabel from "@/components/ui/SectionLabel";
import { projects, type Project } from "@/lib/projects";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 70, damping: 18 },
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

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
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
        {/* Hero image */}
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

        {/* Meta row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-zinc-800">
          {[
            { icon: <MapPin size={14} weight="fill" />, label: "Локація", value: project.full.location },
            { icon: <Ruler size={14} weight="fill" />, label: "Площа", value: project.full.area },
            { icon: <Calendar size={14} weight="fill" />, label: "Тривалість", value: project.full.duration },
            { icon: <Buildings size={14} weight="fill" />, label: "Категорія", value: project.category },
          ].map((m, i) => (
            <div key={i} className="flex flex-col gap-1 px-6 py-4 border-r border-zinc-800 last:border-r-0">
              <div className="flex items-center gap-1.5 text-gold/60">{m.icon}
                <span className="text-[10px] tracking-widest uppercase text-zinc-500">{m.label}</span>
              </div>
              <span className="text-zinc-200 text-sm font-medium">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10">
          <div className="flex flex-col gap-8">
            <p className="text-zinc-300 leading-relaxed">{project.full.description}</p>

            {/* Facts */}
            <div>
              <h4 className="font-display text-xs tracking-[0.15em] uppercase text-zinc-500 mb-4">
                Ключові характеристики
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.full.facts.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.full.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 border border-zinc-700 text-zinc-400 text-xs tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Side number */}
          <div className="hidden lg:flex items-start justify-end">
            <span className="font-display text-[8rem] font-semibold text-zinc-800/60 leading-none tracking-tighter select-none">
              {String(project.id).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 lg:px-12 pb-8 lg:pb-10 flex items-center gap-4 border-t border-zinc-800 pt-6">
          <a
            href="#contact"
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

export default function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <section id="portfolio" className="bg-zinc-950 py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Портфоліо</SectionLabel>
              <h2
                className="font-display font-semibold tracking-tight text-zinc-100 mt-5 leading-none"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Реалізовані об&apos;єкти
              </h2>
            </div>
            <p className="text-zinc-500 text-sm max-w-[36ch] md:text-right leading-relaxed">
              Кожен об&apos;єкт — документація якості. 340 завершених проектів від Карпат до узбережжя.
            </p>
          </div>

          {/* Masonry grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:[grid-auto-rows:80px]"
          >
            {projects.slice(0, 6).map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                onClick={() => setActive(project)}
                className={`col-span-12 ${project.colClass} ${project.rowClass} ${project.minH} relative group overflow-hidden cursor-pointer`}
              >
                <img
                  src={project.img}
                  alt={project.name}
                  loading={project.id === 1 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent transition-colors duration-500 group-hover:from-zinc-950/80" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-expo" />
                <div className="absolute bottom-0 left-0 p-5 md:p-6">
                  <span className="block text-xs text-zinc-500 tracking-widest uppercase mb-1">
                    {project.category} · {project.year}
                  </span>
                  <h3 className="font-display font-medium text-zinc-100 text-lg tracking-tight">
                    {project.name}
                  </h3>
                </div>
                {/* Hover hint */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-700 px-3 py-1.5">
                    <span className="text-[10px] text-zinc-400 tracking-widest uppercase">Детальніше</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
