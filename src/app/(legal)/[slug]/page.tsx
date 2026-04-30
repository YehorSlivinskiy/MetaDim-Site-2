import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import {
  getLegalPage,
  getLegalSlugs,
  getAllLegalPages,
} from "@/lib/db";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getLegalSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getLegalPage(params.slug);
  if (!page) return { title: "Сторінка не знайдена" };

  return {
    title: page.title,
    description: page.description ?? page.title,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/${page.slug}`,
      title: page.title,
      description: page.description ?? page.title,
    },
    robots: { index: true, follow: true },
  };
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function LegalPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getLegalPage(params.slug);
  if (!page) notFound();

  const allPages = await getAllLegalPages();
  const others = allPages.filter((p) => p.slug !== page.slug);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type":
      page.slug === "privacy"
        ? "PrivacyPolicyWebPage"
        : page.slug === "terms"
          ? "TermsOfServiceWebPage"
          : "WebPage",
    "@id": `${SITE_URL}/${page.slug}`,
    url: `${SITE_URL}/${page.slug}`,
    name: page.title,
    description: page.description ?? undefined,
    inLanguage: "uk-UA",
    dateModified: page.updated_at,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm"
          >
            <ArrowLeft size={16} weight="bold" />
            <span className="tracking-wide">На головну</span>
          </Link>
          <Link
            href="/"
            className="font-display font-semibold text-zinc-100 tracking-[0.15em] text-sm"
          >
            META<span className="text-gold font-light">DIM</span>
          </Link>
          <Link
            href="/#contact"
            className="hidden sm:inline-flex text-sm font-medium bg-gold text-zinc-950 px-5 py-2 hover:bg-gold-dim transition-colors tracking-wide"
          >
            Обговорити
          </Link>
        </div>
      </header>

      <nav
        aria-label="Хлібні крихти"
        className="max-w-[900px] mx-auto px-6 lg:px-12 pt-6 text-xs text-zinc-500"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              Головна
            </Link>
          </li>
          <li className="text-zinc-700">/</li>
          <li className="text-zinc-300">{page.title}</li>
        </ol>
      </nav>

      <article className="max-w-[900px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <header className="mb-10 lg:mb-14 pb-8 border-b border-zinc-800">
          <h1
            className="font-display font-semibold tracking-tight text-zinc-100 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {page.title}
          </h1>
          {page.description && (
            <p className="text-zinc-400 mt-4 leading-relaxed max-w-[60ch]">
              {page.description}
            </p>
          )}
          <p className="text-xs text-zinc-500 tracking-widest uppercase mt-6">
            Оновлено: {formatDate(page.updated_at)}
          </p>
        </header>

        <div className="flex flex-col gap-10 lg:gap-12">
          {page.sections.map((section, i) => (
            <section key={i}>
              {section.title && (
                <h2
                  className="font-display font-semibold text-zinc-100 tracking-tight mb-4"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                >
                  {section.title}
                </h2>
              )}
              <div className="flex flex-col gap-4 text-zinc-300 leading-relaxed">
                {section.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {others.length > 0 && (
          <aside className="mt-16 pt-10 border-t border-zinc-800">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
              Інші документи
            </h2>
            <ul className="flex flex-wrap gap-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    className="text-sm text-zinc-300 hover:text-gold border border-zinc-800 hover:border-gold transition-colors px-4 py-2"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="mt-12 pt-8 border-t border-zinc-800 text-sm text-zinc-500">
          Питання щодо цього документа:{" "}
          <a
            href="mailto:legal@metadim.ua"
            className="text-zinc-300 hover:text-gold transition-colors"
          >
            legal@metadim.ua
          </a>
        </div>
      </article>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", url: `${SITE_URL}/` },
          { name: page.title, url: `${SITE_URL}/${page.slug}` },
        ])}
      />
      <JsonLd data={webPageSchema} />
    </div>
  );
}
