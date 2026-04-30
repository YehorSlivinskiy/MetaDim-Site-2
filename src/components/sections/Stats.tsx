import AnimatedNumber from "@/components/ui/AnimatedNumber";
import SectionLabel from "@/components/ui/SectionLabel";
import { getStats } from "@/lib/db";

export default async function Stats() {
  const stats = await getStats();
  if (stats.length === 0) return null;

  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="bg-zinc-950 py-20 lg:py-24 border-b border-zinc-800"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <SectionLabel>MetaDim в цифрах</SectionLabel>
          <h2
            id="stats-heading"
            className="font-display font-semibold tracking-tight text-zinc-100 mt-4 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Чверть століття результатів, що говорять за себе
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
          {stats.map((stat, i) => (
            <div key={stat.id} className="bg-zinc-950 px-6 sm:px-8 py-8 lg:py-12">
              <div className="border-t-2 border-gold pt-6">
                <p
                  className="font-display font-semibold text-gold tracking-tight leading-none"
                  style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
                >
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    delay={i * 0.2}
                  />
                </p>
                <p className="mt-3 text-zinc-500 text-sm tracking-wide">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
