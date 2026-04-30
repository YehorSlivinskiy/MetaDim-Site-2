"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import type { ServiceRow } from "@/lib/supabase";

const itemVariants = {
  hidden: (flip: boolean) => ({ opacity: 0, x: flip ? 40 : -40 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 60, damping: 18 },
  },
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function ServicesClient({ services }: { services: ServiceRow[] }) {
  return (
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
            <Link
              href={`/services/${service.slug}`}
              className={`relative overflow-hidden block group ${service.flip ? "lg:order-2" : ""}`}
              aria-label={`Перейти до послуги ${service.title}`}
            >
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] overflow-hidden relative">
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
            </Link>

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
                <Link
                  href={`/services/${service.slug}`}
                  className="hover:text-gold transition-colors"
                >
                  {service.title}
                </Link>
              </h3>
              <p className="text-zinc-400 leading-relaxed max-w-[40ch]">
                {service.description}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all duration-200 w-fit"
              >
                Детальніше <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
