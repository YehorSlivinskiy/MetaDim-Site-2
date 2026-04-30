import Link from "next/link";
import { PencilSimple, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { getAllLegalPages } from "@/lib/db";
import PageHeader from "../../_components/PageHeader";

export const dynamic = "force-dynamic";

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

export default async function LegalListPage() {
  const pages = await getAllLegalPages();

  return (
    <>
      <PageHeader
        title="Юридичні сторінки"
        description="Політика конфіденційності, Умови, Cookies, Публічна оферта. Тексти редагуються тут."
      />
      <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 max-w-4xl">
        {pages.length === 0 ? (
          <p className="text-zinc-500 text-sm">Поки що немає юридичних сторінок.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {pages.map((p) => (
              <li
                key={p.slug}
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
              >
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/admin/legal/${p.slug}`}
                    className="font-display text-zinc-100 hover:text-gold transition-colors"
                  >
                    {p.title}
                  </Link>
                  <div className="text-xs text-zinc-500 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <span>/{p.slug}</span>
                    <span>· {p.sections.length} секцій</span>
                    <span>· оновлено {formatDate(p.updated_at)}</span>
                  </div>
                  {p.description && (
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                      {p.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-gold transition-colors px-3 py-2"
                    aria-label="Відкрити публічну сторінку"
                  >
                    <ArrowSquareOut size={14} />
                    На сайті
                  </Link>
                  <Link
                    href={`/admin/legal/${p.slug}`}
                    className="flex items-center gap-1.5 text-xs text-zinc-200 border border-zinc-800 hover:border-gold hover:text-gold transition-colors px-3 py-2"
                  >
                    <PencilSimple size={14} />
                    Редагувати
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-8 text-xs text-zinc-500 leading-relaxed">
          У текстах позначення в квадратних дужках типу{" "}
          <code className="text-zinc-300">[ВКАЗАТИ ЄДРПОУ]</code> — це
          плейсхолдери, які треба замінити на реальні дані компанії. Знайдіть їх
          через Ctrl+F і відредагуйте відповідно до офіційних реквізитів.
        </p>
      </div>
    </>
  );
}
