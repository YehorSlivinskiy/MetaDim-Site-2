import type { Metadata } from "next";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getProjects } from "@/lib/db";
import WorksClient from "./WorksClient";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  breadcrumbSchema,
  projectsItemListSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Каталог робіт — 340+ реалізованих об'єктів MetaDim",
  description:
    "Усі реалізовані об'єкти будівельної компанії MetaDim: житлові комплекси, бізнес-центри, промислові та інтер'єрні проекти. Фільтр за категоріями та роком побудови.",
  alternates: { canonical: "/works" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/works`,
    title: "Каталог робіт MetaDim",
    description:
      "340+ реалізованих об'єктів: житло, комерція, промисловість, реконструкція.",
  },
};

export default async function WorksPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm"
          >
            <ArrowLeft size={16} weight="bold" />
            <span className="tracking-wide">Назад</span>
          </a>
          <a
            href="/"
            className="font-display font-semibold text-zinc-100 tracking-[0.15em] text-sm"
          >
            META<span className="text-gold font-light">DIM</span>
          </a>
          <a
            href="/#contact"
            className="text-sm font-medium bg-gold text-zinc-950 px-5 py-2 hover:bg-gold-dim transition-colors tracking-wide"
          >
            Обговорити проект
          </a>
        </div>
      </header>

      <WorksClient projects={projects} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", url: `${SITE_URL}/` },
          { name: "Каталог робіт", url: `${SITE_URL}/works` },
        ])}
      />
      <JsonLd data={projectsItemListSchema(projects)} />
    </div>
  );
}
