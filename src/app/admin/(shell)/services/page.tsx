import Link from "next/link";
import { Eye, EyeSlash, PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import PageHeader from "../../_components/PageHeader";
import { toggleServicePublished } from "../../actions/services";

export const dynamic = "force-dynamic";

async function togglePublishedAction(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const next = formData.get("next") === "true";
  await toggleServicePublished(id, next);
}

export default async function ServicesListPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: false });

  const services = data ?? [];

  return (
    <>
      <PageHeader
        title="Послуги"
        description="Послуги, що з'являються в секції на головній."
        action={{ label: "+ Додати послугу", href: "/admin/services/new" }}
      />
      <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
        {services.length === 0 ? (
          <p className="text-zinc-500 text-sm">Поки що немає послуг.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {services.map((s) => (
              <li
                key={s.id}
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors flex items-center gap-3 sm:gap-4 p-3 sm:p-4"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-900 flex-shrink-0 overflow-hidden">
                  {s.icon ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={s.icon} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">
                      —
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/admin/services/${s.id}`}
                    className="font-display text-zinc-100 hover:text-gold transition-colors text-sm block"
                  >
                    {s.title}
                  </Link>
                  <p className="text-xs text-zinc-500 truncate">{s.description}</p>
                  <div className="text-xs text-zinc-600 mt-1 flex flex-wrap gap-x-2">
                    <span>#{s.sort_order}</span>
                    <span>· {s.features?.length ?? 0} особл.</span>
                    {!s.is_published && (
                      <span className="text-zinc-500">· Чернетка</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center -mr-1">
                  <Link
                    href={`/admin/services/${s.id}`}
                    className="text-zinc-400 hover:text-gold transition-colors p-2"
                    aria-label="Редагувати"
                  >
                    <PencilSimple size={18} />
                  </Link>
                  <form action={togglePublishedAction}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="next" value={String(!s.is_published)} />
                    <button
                      type="submit"
                      className="text-zinc-400 hover:text-gold transition-colors p-2"
                      aria-label={s.is_published ? "Приховати" : "Опублікувати"}
                    >
                      {s.is_published ? <Eye size={18} /> : <EyeSlash size={18} />}
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
