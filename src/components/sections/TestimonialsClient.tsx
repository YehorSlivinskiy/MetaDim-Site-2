"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { TestimonialRow } from "@/lib/supabase";

type CardData = TestimonialRow & { initials: string };

function buildInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function Card({ t }: { t: CardData }) {
  return (
    <div className="w-[85vw] lg:w-[min(420px,85vw)] flex-shrink-0 snap-start bg-zinc-900 border border-zinc-800 p-8 flex flex-col gap-0">
      <span className="font-display text-5xl leading-none text-gold mb-4">&ldquo;</span>
      <p className="text-zinc-300 leading-relaxed text-base flex-1">{t.quote}</p>
      <div className="border-t border-zinc-800 mt-6 pt-5 flex items-center gap-3">
        <div className="w-9 h-9 bg-zinc-700 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-display font-medium text-zinc-300">{t.initials}</span>
        </div>
        <div>
          <p className="text-zinc-100 text-sm font-medium">{t.author_name}</p>
          <p className="text-zinc-500 text-xs">
            {t.author_role}
            {t.author_role && t.company ? " · " : ""}
            {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileCarousel({ items }: { items: CardData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.scrollWidth / items.length;
      setActiveIndex(Math.round(el.scrollLeft / cardW));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((t) => <Card key={t.id} t={t} />)}
        <div className="flex-shrink-0 w-4" aria-hidden="true" />
      </div>
      <div className="mt-6 flex items-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const cardW = el.scrollWidth / items.length;
              el.scrollTo({ left: cardW * i, behavior: "smooth" });
            }}
            className={`h-px transition-all duration-300 ${
              i === activeIndex ? "w-8 bg-gold" : "w-4 bg-zinc-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DesktopCarousel({ items }: { items: CardData[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(-1000);

  useEffect(() => {
    const compute = () => {
      if (trackRef.current && containerRef.current) {
        const trackW = trackRef.current.scrollWidth;
        const containerW = containerRef.current.offsetWidth;
        setMaxDrag(-(trackW - containerW - 40));
      }
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const progressWidth = useTransform(x, [maxDrag, 0], ["100%", "0%"]);

  return (
    <div>
      <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: maxDrag, right: 0 }}
          dragElastic={0.08}
          dragMomentum={true}
          style={{ x }}
          className="flex gap-5 select-none"
        >
          {items.map((t) => <Card key={t.id} t={t} />)}
        </motion.div>
      </div>
      <div className="mt-8 h-px bg-zinc-800 max-w-xs relative overflow-hidden">
        <motion.div className="absolute left-0 top-0 h-full bg-gold" style={{ width: progressWidth }} />
      </div>
    </div>
  );
}

export default function TestimonialsClient({ testimonials }: { testimonials: TestimonialRow[] }) {
  const items: CardData[] = testimonials.map((t) => ({ ...t, initials: buildInitials(t.author_name) }));

  return (
    <>
      <div className="lg:hidden">
        <MobileCarousel items={items} />
      </div>
      <div className="hidden lg:block">
        <DesktopCarousel items={items} />
      </div>
    </>
  );
}
