import SectionLabel from "@/components/ui/SectionLabel";
import { getHomePortfolioProjects } from "@/lib/db";
import PortfolioClient from "./PortfolioClient";

export default async function Portfolio() {
  const projects = await getHomePortfolioProjects(6);
  if (projects.length === 0) return null;

  return (
    <section id="portfolio" className="bg-zinc-950 py-28 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel>Портфоліо</SectionLabel>
            <h2
              className="font-display font-semibold tracking-tight text-zinc-100 mt-5 leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Реалізовані об&apos;єкти
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-[36ch] md:text-right leading-relaxed">
            Кожен об&apos;єкт — документація якості. 340 завершених проектів від Карпат до узбережжя.
          </p>
        </div>

        <PortfolioClient projects={projects} />
      </div>
    </section>
  );
}
