import SectionLabel from "@/components/ui/SectionLabel";
import { getTestimonials } from "@/lib/db";
import TestimonialsClient from "./TestimonialsClient";

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section className="bg-zinc-950 py-28 border-t border-zinc-800 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
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

        <TestimonialsClient testimonials={testimonials} />
      </div>
    </section>
  );
}
