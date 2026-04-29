"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";
import type { ProjectRow } from "@/lib/supabase";
import ProjectModal from "@/components/sections/ProjectModal";

function ProjectCard({ project, onClick }: { project: ProjectRow; onClick: () => void }) {
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
        <p className="text-zinc-500 text-xs mt-1">{project.area}</p>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-700 px-3 py-1.5">
          <span className="text-[10px] text-zinc-400 tracking-widest uppercase">Детальніше</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorksClient({ projects }: { projects: ProjectRow[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("Всі");
  const [active, setActive] = useState<{ project: ProjectRow; number: number } | null>(null);

  const filtered = useMemo(
    () => activeCategory === "Всі" ? projects : projects.filter((p) => p.category === activeCategory),
    [activeCategory, projects]
  );

  return (
    <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
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

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setActive({ project, number: i + 1 })}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="py-32 text-center">
          <p className="text-zinc-500 text-lg">Немає проектів у цій категорії</p>
        </div>
      )}

      <AnimatePresence>
        {active && (
          <ProjectModal project={active.project} number={active.number} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
