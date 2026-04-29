import SectionLabel from "@/components/ui/SectionLabel";
import { getServices } from "@/lib/db";
import ServicesClient from "./ServicesClient";

export default async function Services() {
  const services = await getServices();

  return (
    <section id="services" className="bg-zinc-950 py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <SectionLabel>Послуги</SectionLabel>
          <h2
            className="font-display font-semibold tracking-tight text-zinc-100 mt-5 leading-none"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Повний цикл будівництва
          </h2>
        </div>

        <ServicesClient services={services} />
      </div>
    </section>
  );
}
