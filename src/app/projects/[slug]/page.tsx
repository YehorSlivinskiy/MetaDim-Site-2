import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Ruler,
  Clock,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";
import {
  getProjectBySlug,
  getProjectSlugs,
  getRelatedProjects,
} from "@/lib/db";
import {
  SITE_URL,
  breadcrumbSchema,
  fullProjectSchema,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import SectionLabel from "@/components/ui/SectionLabel";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Проект не знайдено" };

  const titleParts = [
    project.name,
    project.category,
    project.location ?? null,
    String(project.year),
  ].filter(Boolean);
  const title = `${project.name} — ${project.category}${project.location ? `, ${project.location}` : ""}`;
  const description =
    (project.description ?? "").slice(0, 200) ||
    `${project.category} проект MetaDim${project.location ? `, ${project.location}` : ""}, рік: ${project.year}${project.area ? `, площа ${project.area}` : ""}.`;

  return {
    title,
    description,
    keywords: [
      project.name,
      project.category,
      ...(project.tags ?? []),
      "MetaDim",
      "будівництво",
      project.location ?? "Київ",
    ].filter(Boolean) as string[],
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/projects/${project.slug}`,
      title: titleParts.join(" · "),
      description,
      images: [
        {
          url: project.img.startsWith("http")
            ? project.img
            : `${SITE_URL}${project.img}`,
          width: 1600,
          height: 1200,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleParts.join(" · "),
      description,
      images: [
        project.img.startsWith("http")
          ? project.img
          : `${SITE_URL}${project.img}`,
      ],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const related = await getRelatedProjects(project.id, project.category, 3);

  const meta = [
    project.location && { Icon: MapPin, label: "Локація", value: project.location },
    project.area && { Icon: Ruler, label: "Площа", value: project.area },
    project.duration && { Icon: Clock, label: "Термін", value: project.duration },
    { Icon: Buildings, label: "Категорія", value: project.category },
  ].filter(Boolean) as { Icon: typeof MapPin; label: string; value: string }[];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link
            href="/works"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm"
          >
            <ArrowLeft size={16} weight="bold" />
            <span className="tracking-wide">До каталогу</span>
          </Link>
          <Link
            href="/"
            className="font-display font-semibold text-zinc-100 tracking-[0.15em] text-sm"
          >
            META<span className="text-gold font-light">DIM</span>
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium bg-gold text-zinc-950 px-5 py-2 hover:bg-gold-dim transition-colors tracking-wide"
          >
            Обговорити
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav
        aria-label="Хлібні крихти"
        className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-6 text-xs text-zinc-500"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              Головна
            </Link>
          </li>
          <li className="text-zinc-700">/</li>
          <li>
            <Link href="/works" className="hover:text-zinc-300 transition-colors">
              Каталог робіт
            </Link>
          </li>
          <li className="text-zinc-700">/</li>
          <li className="text-zinc-300">{project.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-8 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12">
          <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-zinc-900">
            <Image
              src={project.img}
              alt={project.name}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 lg:py-6">
            <SectionLabel>{project.category}</SectionLabel>
            <h1
              className="font-display font-semibold tracking-tight text-zinc-100 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {project.name}
            </h1>
            {project.description && (
              <p className="text-zinc-400 text-base leading-relaxed">
                {project.description}
              </p>
            )}
            <dl className="grid grid-cols-2 gap-4 mt-2 pt-6 border-t border-zinc-800">
              {meta.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon
                    size={18}
                    weight="thin"
                    className="text-gold mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-zinc-500">
                      {label}
                    </dt>
                    <dd className="text-zinc-200 text-sm mt-0.5">{value}</dd>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <Clock
                  size={18}
                  weight="thin"
                  className="text-gold mt-0.5 flex-shrink-0"
                />
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-zinc-500">
                    Рік завершення
                  </dt>
                  <dd className="text-zinc-200 text-sm mt-0.5">{project.year}</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Facts */}
      {project.facts?.length > 0 && (
        <section className="bg-zinc-900/50 border-y border-zinc-800 py-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h2 className="text-xs uppercase tracking-widest text-gold mb-6">
              Ключові характеристики
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {project.facts.map((fact, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 px-5 py-4"
                >
                  <span className="font-display text-gold/60 text-sm tabular-nums mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-zinc-200 text-sm leading-relaxed">
                    {fact}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Tags */}
      {project.tags?.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
            Технології та підхід
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-zinc-300 border border-zinc-700 px-3 py-1.5 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-zinc-950 border-t border-zinc-800 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <SectionLabel>Схожі об&apos;єкти</SectionLabel>
                <h2
                  className="font-display font-semibold tracking-tight text-zinc-100 mt-3 leading-none"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  Інші проекти у категорії «{project.category}»
                </h2>
              </div>
              <Link
                href="/works"
                className="hidden sm:inline-flex text-sm text-zinc-400 hover:text-gold transition-colors"
              >
                Усі роботи →
              </Link>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((rp) => (
                <li key={rp.id}>
                  <Link
                    href={`/projects/${rp.slug}`}
                    className="block group bg-zinc-950 border border-zinc-800 hover:border-gold transition-colors"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                      <Image
                        src={rp.img}
                        alt={rp.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-4">
                      <span className="block text-xs text-zinc-500 tracking-widest uppercase mb-1">
                        {rp.category} · {rp.year}
                      </span>
                      <h3 className="font-display font-medium text-zinc-100 group-hover:text-gold transition-colors text-sm">
                        {rp.name}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-zinc-900 border-t border-zinc-800 py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl text-zinc-100">
              Хочете подібний об&apos;єкт?
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Обговоримо ваш проект протягом 2 робочих годин.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-gold text-zinc-950 font-display font-medium px-7 py-4 text-sm tracking-wide hover:bg-gold-dim transition-colors"
          >
            Розпочати проект
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", url: `${SITE_URL}/` },
          { name: "Каталог робіт", url: `${SITE_URL}/works` },
          { name: project.name, url: `${SITE_URL}/projects/${project.slug}` },
        ])}
      />
      <JsonLd data={fullProjectSchema(project)} />
    </div>
  );
}
