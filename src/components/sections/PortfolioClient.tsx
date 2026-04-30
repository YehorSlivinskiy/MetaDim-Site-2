"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectRow } from "@/lib/supabase";

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

/**
 * Asymmetric masonry pattern, deterministic by index — Tailwind sees the literal
 * classes here at build time so they always compile, regardless of DB state.
 */
const LAYOUT_PATTERN = [
  "md:col-span-7 md:row-span-5 min-h-[320px] md:min-h-0",
  "md:col-span-5 md:row-span-3 min-h-[240px] md:min-h-0",
  "md:col-span-5 md:row-span-4 min-h-[280px] md:min-h-0",
  "md:col-span-7 md:row-span-3 min-h-[240px] md:min-h-0",
  "md:col-span-5 md:row-span-4 min-h-[280px] md:min-h-0",
  "md:col-span-7 md:row-span-4 min-h-[280px] md:min-h-0",
];

export default function PortfolioClient({ projects }: { projects: ProjectRow[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:[grid-auto-rows:80px]"
    >
      {projects.map((project, i) => {
        const layout = LAYOUT_PATTERN[i % LAYOUT_PATTERN.length];
        return (
          <motion.div
            key={project.id}
            variants={cardVariants}
            className={`col-span-12 ${layout} relative group overflow-hidden`}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label={`Відкрити проект ${project.name}`}
            >
              <Image
                src={project.img}
                alt={project.name}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-expo" />
              <div className="absolute bottom-0 left-0 p-5 md:p-6">
                <span className="block text-xs text-zinc-500 tracking-widest uppercase mb-1">
                  {project.category} · {project.year}
                </span>
                <h3 className="font-display font-medium text-zinc-100 text-lg tracking-tight">
                  {project.name}
                </h3>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-700 px-3 py-1.5">
                  <span className="text-[10px] text-zinc-400 tracking-widest uppercase">
                    Детальніше
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
