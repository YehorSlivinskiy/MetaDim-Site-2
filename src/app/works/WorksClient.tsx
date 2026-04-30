"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { CATEGORIES } from "@/lib/constants";
import type { ProjectRow } from "@/lib/supabase";

function ProjectCard({
  project,
  priority,
}: {
  project: ProjectRow;
  priority?: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="relative group overflow-hidden cursor-pointer bg-zinc-900 block focus:outline-none focus:ring-2 focus:ring-gold"
        aria-label={`Перейти до проекту ${project.name}`}
      >
        <div className="aspect-[4/3] overflow-hidden relative">
          <Image
            src={project.img}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.05]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-expo" />
        <div className="absolute bottom-0 left-0 p-5">
          <span className="block text-[10px] text-zinc-500 tracking-widest uppercase mb-1">
            {project.category} · {project.year}
          </span>
          <h3 className="font-display font-medium text-zinc-100 text-lg tracking-tight leading-tight">
            {project.name}
          </h3>
          {project.area && (
            <p className="text-zinc-500 text-xs mt-1">{project.area}</p>
          )}
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-700 px-3 py-1.5">
            <span className="text-[10px] text-zinc-400 tracking-widest uppercase">
              Детальніше
            </span>
            <ArrowRight size={10} weight="bold" className="text-zinc-400" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorksClient({ projects }: { projects: ProjectRow[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("Всі");

  const filtered = useMemo(
    () =>
      activeCategory === "Всі"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory, projects],
  );

  // When "Всі" — group by category for proper H2 structure
  const grouped = useMemo(() => {
    if (activeCategory !== "Всі") return null;
    const order = CATEGORIES.filter((c) => c !== "Всі");
    const map = new Map<string, ProjectRow[]>();
    for (const p of filtered) {
      const list = map.get(p.category) ?? [];
      list.push(p);
      map.set(p.category, list);
    }
    return order
      .map((cat) => ({ category: cat, items: map.get(cat) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, [activeCategory, filtered]);

  return (
    <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
      <div className="mb-12">
        <span className="text-xs text-gold tracking-[0.2em] uppercase font-display">
          Портфоліо
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-4">
          <h1
            className="font-display font-semibold tracking-tight text-zinc-100 leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Каталог реалізованих об&apos;єктів
          </h1>
          <span className="font-display text-zinc-600 text-2xl mb-1">
            {filtered.length} / {projects.length}
          </span>
        </div>
        <p className="text-zinc-500 text-base max-w-2xl mt-4 leading-relaxed">
          340+ житлових, комерційних, промислових та інтер&apos;єрних об&apos;єктів,
          реалізованих компанією MetaDim з 1999 року. Натисніть на картку, щоб
          відкрити повний опис проекту.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Фільтр за категоріями"
        className="flex flex-wrap gap-2 mb-12"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
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

      {grouped ? (
        <div className="flex flex-col gap-16">
          {grouped.map(({ category, items }) => (
            <section key={category} aria-labelledby={`group-${category}`}>
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <h2
                  id={`group-${category}`}
                  className="font-display font-semibold text-zinc-100 tracking-tight"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                >
                  {category}
                </h2>
                <span className="text-xs text-zinc-500 tracking-widest uppercase">
                  {items.length} {items.length === 1 ? "проект" : "проектів"}
                </span>
              </div>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {items.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      priority={i === 0}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                priority={i === 0}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {filtered.length === 0 && (
        <div className="py-32 text-center">
          <p className="text-zinc-500 text-lg">Немає проектів у цій категорії</p>
        </div>
      )}
    </main>
  );
}
