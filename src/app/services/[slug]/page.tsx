import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import {
  getServiceBySlug,
  getServiceSlugs,
  getServices,
} from "@/lib/db";
import { SITE_URL, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import SectionLabel from "@/components/ui/SectionLabel";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: "Послугу не знайдено" };

  const description =
    (service.intro ?? service.description).slice(0, 220) ||
    `Послуга ${service.title} від MetaDim — з гарантією 10 років.`;

  return {
    title: `${service.title} — послуги MetaDim`,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/services/${service.slug}`,
      title: `${service.title} — MetaDim`,
      description,
      ...(service.icon
        ? {
            images: [
              {
                url: service.icon.startsWith("http")
                  ? service.icon
                  : `${SITE_URL}${service.icon}`,
                width: 1200,
                height: 1200,
                alt: service.title,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const all = await getServices();
  const others = all.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link
            href="/#services"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm"
          >
            <ArrowLeft size={16} weight="bold" />
            <span className="tracking-wide">Усі послуги</span>
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
            <Link href="/#services" className="hover:text-zinc-300 transition-colors">
              Послуги
            </Link>
          </li>
          <li className="text-zinc-700">/</li>
          <li className="text-zinc-300">{service.title}</li>
        </ol>
      </nav>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-8 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <SectionLabel>Послуга</SectionLabel>
            <h1
              className="font-display font-semibold tracking-tight text-zinc-100 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {service.title}
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed">
              {service.description}
            </p>
            {service.intro && (
              <p className="text-zinc-400 text-base leading-relaxed">
                {service.intro}
              </p>
            )}
          </div>
          {service.icon && (
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 border border-zinc-800">
              <Image
                src={service.icon}
                alt={service.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {service.features?.length > 0 && (
        <section className="bg-zinc-900/50 border-y border-zinc-800 py-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h2 className="font-display text-2xl text-zinc-100 mb-6">
              Що входить
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 px-5 py-4"
                >
                  <CheckCircle
                    size={20}
                    weight="thin"
                    className="text-gold mt-0.5 flex-shrink-0"
                  />
                  <span className="text-zinc-200 text-sm leading-relaxed">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.process?.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <h2 className="font-display text-2xl text-zinc-100 mb-10">
            Як ми працюємо
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.process.map((step, i) => (
              <li
                key={i}
                className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col gap-3"
              >
                <span className="font-display text-3xl text-gold/60 tabular-nums">
                  {step.step}
                </span>
                <h3 className="font-display text-zinc-100 text-lg">
                  {step.label}
                </h3>
              </li>
            ))}
          </ol>
        </section>
      )}

      {service.result && (
        <section className="bg-gold/[0.04] border-y border-gold/20 py-12">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h2 className="text-xs uppercase tracking-widest text-gold mb-3">
              Результат
            </h2>
            <p className="text-zinc-200 text-lg leading-relaxed max-w-3xl">
              {service.result}
            </p>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="bg-zinc-950 border-t border-zinc-800 py-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h2 className="font-display text-2xl text-zinc-100 mb-8">
              Інші послуги
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="block group bg-zinc-950 border border-zinc-800 hover:border-gold transition-colors p-6"
                  >
                    <h3 className="font-display text-zinc-100 group-hover:text-gold transition-colors text-lg">
                      {s.title}
                    </h3>
                    <p className="text-zinc-500 text-sm mt-2 line-clamp-2">
                      {s.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-zinc-900 border-t border-zinc-800 py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl text-zinc-100">
              Готові обговорити проект?
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Безкоштовний прорахунок протягом 2 робочих годин.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-gold text-zinc-950 font-display font-medium px-7 py-4 text-sm tracking-wide hover:bg-gold-dim transition-colors"
          >
            Замовити прорахунок
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", url: `${SITE_URL}/` },
          { name: "Послуги", url: `${SITE_URL}/#services` },
          { name: service.title, url: `${SITE_URL}/services/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceSchema(service)} />
    </div>
  );
}
