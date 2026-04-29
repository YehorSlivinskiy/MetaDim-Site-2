import Link from "next/link";
import { Eye, EyeSlash, PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import PageHeader from "../../_components/PageHeader";
import { toggleProjectPublished } from "../../actions/projects";

export const dynamic = "force-dynamic";

async function togglePublishedAction(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const next = formData.get("next") === "true";
  await toggleProjectPublished(id, next);
}

export default async function ProjectsListPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: false });

  const projects = data ?? [];

  return (
    <>
      <PageHeader
        title="Проекти"
        description="Об'єкти, що відображаються на головній і в каталозі."
        action={{ label: "+ Додати проект", href: "/admin/projects/new" }}
      />
      <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
        {projects.length === 0 ? (
          <p className="text-zinc-500 text-sm">
            Поки що немає проектів.{" "}
            <Link href="/admin/projects/new" className="text-gold underline">
              Додати перший
            </Link>
            .
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {projects.map((p) => (
              <li
                key={p.id}
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col"
              >
                <Link href={`/admin/projects/${p.id}`} className="block aspect-[4/3] overflow-hidden">
                  {p.img ? (
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700 text-xs">
                      Без зображення
                    </div>
                  )}
                </Link>
                <div className="p-4 flex-1 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="font-display text-zinc-100 hover:text-gold transition-colors text-sm leading-tight"
                    >
                      {p.name}
                    </Link>
                    {!p.is_published && (
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-700 px-1.5 py-0.5 whitespace-nowrap">
                        Чернетка
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-500 flex flex-wrap gap-x-3 gap-y-1">
                    <span>{p.category}</span>
                    <span>{p.year}</span>
                    <span>#{p.sort_order}</span>
                    {p.show_on_home ? (
                      <span className="text-gold/80" title="Показується в Портфоліо на головній">
                        ★ На головній
                      </span>
                    ) : (
                      <span className="text-zinc-600" title="Тільки в каталозі /works">
                        Тільки в каталозі
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-auto pt-2">
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="flex items-center gap-1 text-xs text-zinc-400 hover:text-gold transition-colors"
                    >
                      <PencilSimple size={14} />
                      Редагувати
                    </Link>
                    <form action={togglePublishedAction} className="ml-auto">
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="next" value={String(!p.is_published)} />
                      <button
                        type="submit"
                        className="flex items-center gap-1 text-xs text-zinc-400 hover:text-gold transition-colors"
                        title={p.is_published ? "Приховати з сайту" : "Опублікувати"}
                      >
                        {p.is_published ? <Eye size={14} /> : <EyeSlash size={14} />}
                        {p.is_published ? "Приховати" : "Показати"}
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
