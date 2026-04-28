"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, MapPin, Calendar, Ruler, Buildings, ArrowRight } from "@phosphor-icons/react";
import { projects, CATEGORIES, type Project } from "@/lib/projects";

/* ─── Modal ─── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-zinc-950/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 280, damping: 28 } }}
        exit={{ opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.18 } }}
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
            <span className="text-xs text-gold/70 tracking-widest uppercase">{project.category} · {project.year}</span>
            <h3 className="font-display font-semibold text-zinc-100 text-2xl lg:text-3xl tracking-tight mt-1">{project.name}</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-zinc-800">
          {[
            { icon: <MapPin size={14} weight="fill" />, label: "Локація", value: project.full.location },
            { icon: <Ruler size={14} weight="fill" />, label: "Площа", value: project.full.area },
            { icon: <Calendar size={14} weight="fill" />, label: "Тривалість", value: project.full.duration },
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
            <p className="text-zinc-300 leading-relaxed">{project.full.description}</p>
            <div>
              <h4 className="font-display text-xs tracking-[0.15em] uppercase text-zinc-500 mb-4">Ключові характеристики</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.full.facts.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.full.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 border border-zinc-700 text-zinc-400 text-xs tracking-wide">{tag}</span>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex items-start justify-end">
            <span className="font-display text-[8rem] font-semibold text-zinc-800/60 leading-none tracking-tighter select-none">
              {String(project.id).padStart(2, "0")}
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

/* ─── Card ─── */
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      onClick={onClick}
      className="relative group overflow-hidden cursor-pointer bg-zinc-900"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.img}
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.05]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-expo" />
      <div className="absolute bottom-0 left-0 p-5">
        <span className="block text-[10px] text-zinc-500 tracking-widest uppercase mb-1">
          {project.category} · {project.year}
        </span>
        <h3 className="font-display font-medium text-zinc-100 text-lg tracking-tight leading-tight">
          {project.name}
        </h3>
        <p className="text-zinc-500 text-xs mt-1">{project.full.area}</p>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-700 px-3 py-1.5">
          <span className="text-[10px] text-zinc-400 tracking-widest uppercase">Детальніше</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState("Всі");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () => activeCategory === "Всі" ? projects : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm">
            <ArrowLeft size={16} weight="bold" />
            <span className="tracking-wide">Назад</span>
          </a>
          <a href="/" className="font-display font-semibold text-zinc-100 tracking-[0.15em] text-sm">
            META<span className="text-gold font-light">DIM</span>
          </a>
          <a
            href="/#contact"
            className="text-sm font-medium bg-gold text-zinc-950 px-5 py-2 hover:bg-gold-dim transition-colors tracking-wide"
          >
            Обговорити проект
          </a>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Title */}
        <div className="mb-12">
          <span className="text-xs text-gold tracking-[0.2em] uppercase font-display">Портфоліо</span>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-4">
            <h1
              className="font-display font-semibold tracking-tight text-zinc-100 leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Всі роботи
            </h1>
            <span className="font-display text-zinc-600 text-2xl mb-1">
              {filtered.length} / {projects.length}
            </span>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2 text-sm tracking-wide transition-all duration-200 font-display ${
                activeCategory === cat
                  ? "text-zinc-950 bg-gold"
                  : "text-zinc-400 border border-zinc-700 hover:border-zinc-500 hover:text-zinc-100"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-gold -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-zinc-500 text-lg">Немає проектів у цій категорії</p>
          </div>
        )}
      </main>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
