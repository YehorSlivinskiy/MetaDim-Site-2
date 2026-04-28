"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const testimonials = [
  {
    id: 1,
    quote:
      "MetaDim здала об'єкт на 12 днів раніше терміну. Це перший підрядник за 15 років, якому не довелося телефонувати двічі.",
    name: "Роман Ткаченко",
    role: "Директор",
    company: "Devland Group",
    initials: "РТ",
  },
  {
    id: 2,
    quote:
      "BIM-модель, яку надала компанія, дозволила нашим проектувальникам заощадити 3 місяці узгоджень. Рівень деталізації — вищий за всі наші очікування.",
    name: "Оксана Войтенко",
    role: "COO",
    company: "Meridian Invest",
    initials: "ОВ",
  },
  {
    id: 3,
    quote:
      "Фіксована ціна — це не маркетинг, а реальність. Жодної копійки зверх договору за весь цикл будівництва ЖК.",
    name: "Сергій Литвин",
    role: "Власник",
    company: "ЖК «Прибережний»",
    initials: "СЛ",
  },
  {
    id: 4,
    quote:
      "Як архітектор, я ціную точність виконання деталей. MetaDim — єдиний підрядник, що реалізував авторський проект без жодних спрощень.",
    name: "Катерина Бойченко",
    role: "Партнер-архітектор",
    company: "Bureau 17",
    initials: "КБ",
  },
];

function Card({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="w-[85vw] lg:w-[min(420px,85vw)] flex-shrink-0 snap-start bg-zinc-900 border border-zinc-800 p-8 flex flex-col gap-0">
      <span className="font-display text-5xl leading-none text-gold mb-4">&ldquo;</span>
      <p className="text-zinc-300 leading-relaxed text-base flex-1">{t.quote}</p>
      <div className="border-t border-zinc-800 mt-6 pt-5 flex items-center gap-3">
        <div className="w-9 h-9 bg-zinc-700 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-display font-medium text-zinc-300">{t.initials}</span>
        </div>
        <div>
          <p className="text-zinc-100 text-sm font-medium">{t.name}</p>
          <p className="text-zinc-500 text-xs">{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile: native scroll + snap ── */
function MobileCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.scrollWidth / testimonials.length;
      setActiveIndex(Math.round(el.scrollLeft / cardW));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {testimonials.map((t) => <Card key={t.id} t={t} />)}
        {/* trailing spacer so last card snaps flush */}
        <div className="flex-shrink-0 w-4" aria-hidden="true" />
      </div>
      {/* Dots */}
      <div className="mt-6 flex items-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const cardW = el.scrollWidth / testimonials.length;
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

/* ── Desktop: Framer Motion drag ── */
function DesktopCarousel() {
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
          {testimonials.map((t) => <Card key={t.id} t={t} />)}
        </motion.div>
      </div>
      <div className="mt-8 h-px bg-zinc-800 max-w-xs relative overflow-hidden">
        <motion.div className="absolute left-0 top-0 h-full bg-gold" style={{ width: progressWidth }} />
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-zinc-950 py-28 border-t border-zinc-800 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Відгуки</SectionLabel>
            <h2
              className="font-display font-semibold tracking-tight text-zinc-100 mt-5 leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Говорять клієнти
            </h2>
          </div>
          <p className="text-zinc-600 text-xs tracking-widest uppercase">
            Перетягніть для перегляду
          </p>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <MobileCarousel />
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <DesktopCarousel />
        </div>
      </div>
    </section>
  );
}
