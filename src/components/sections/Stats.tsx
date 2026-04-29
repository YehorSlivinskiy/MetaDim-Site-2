import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { getStats } from "@/lib/db";

export default async function Stats() {
  const stats = await getStats();

  return (
    <section className="bg-zinc-950 py-24 border-b border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr_1.2fr] gap-px bg-zinc-800">
          {stats.map((stat, i) => (
            <div key={stat.id} className="bg-zinc-950 px-8 py-10 lg:py-12">
              <div className="border-t-2 border-gold pt-6">
                <p
                  className="font-display font-semibold text-gold tracking-tight leading-none"
                  style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
                >
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    delay={i * 0.2}
                  />
                </p>
                <p className="mt-3 text-zinc-500 text-sm tracking-wide">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
