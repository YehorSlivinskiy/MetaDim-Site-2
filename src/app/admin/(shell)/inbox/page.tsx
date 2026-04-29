import Link from "next/link";
import { Phone, Trash } from "@phosphor-icons/react/dist/ssr";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import PageHeader from "../../_components/PageHeader";
import { setRequestStatus, deleteRequest } from "../../actions/inbox";
import type { ContactRequestRow } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const STATUS_OPTIONS: { value: ContactRequestRow["status"]; label: string }[] = [
  { value: "new", label: "Нове" },
  { value: "in_progress", label: "В роботі" },
  { value: "done", label: "Виконано" },
  { value: "spam", label: "Спам" },
];

const STATUS_STYLE: Record<ContactRequestRow["status"], string> = {
  new: "text-gold border-gold",
  in_progress: "text-blue-300 border-blue-700",
  done: "text-emerald-300 border-emerald-800",
  spam: "text-zinc-500 border-zinc-700",
};

export default async function InboxPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const supabase = createSupabaseServerClient();
  const filter = searchParams?.status;

  let query = supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (filter && STATUS_OPTIONS.find((o) => o.value === filter)) {
    query = query.eq("status", filter);
  }
  const { data } = await query;
  const requests = (data ?? []) as ContactRequestRow[];

  return (
    <>
      <PageHeader
        title="Заявки"
        description="Звернення з контактної форми сайту."
      />
      <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 flex flex-col gap-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/inbox"
            className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors ${
              !filter
                ? "border-gold text-gold"
                : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
            }`}
          >
            Усі
          </Link>
          {STATUS_OPTIONS.map((o) => (
            <Link
              key={o.value}
              href={`/admin/inbox?status=${o.value}`}
              className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                filter === o.value
                  ? "border-gold text-gold"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {o.label}
            </Link>
          ))}
        </div>

        {requests.length === 0 ? (
          <p className="text-zinc-500 text-sm">Заявок немає.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {requests.map((r) => (
              <li
                key={r.id}
                className="bg-zinc-950 border border-zinc-800 p-4 sm:p-5 flex flex-col gap-3"
              >
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                  <span
                    className={`text-[10px] uppercase tracking-widest px-1.5 py-0.5 border ${STATUS_STYLE[r.status]}`}
                  >
                    {STATUS_OPTIONS.find((o) => o.value === r.status)?.label ?? r.status}
                  </span>
                  <h3 className="font-display text-zinc-100">{r.name}</h3>
                  <a
                    href={`tel:${r.phone}`}
                    className="flex items-center gap-1 text-zinc-300 hover:text-gold transition-colors text-sm"
                  >
                    <Phone size={14} />
                    {r.phone}
                  </a>
                  <span className="text-zinc-600 text-xs sm:ml-auto basis-full sm:basis-auto">
                    {new Date(r.created_at).toLocaleString("uk-UA")}
                  </span>
                </div>
                {r.message && (
                  <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed border-l-2 border-zinc-800 pl-4">
                    {r.message}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800">
                  {STATUS_OPTIONS.map((o) => (
                    <form key={o.value} action={setRequestStatus}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="status" value={o.value} />
                      <button
                        type="submit"
                        disabled={r.status === o.value}
                        className={`text-xs px-3 py-1.5 border transition-colors ${
                          r.status === o.value
                            ? "border-zinc-700 text-zinc-600 cursor-default"
                            : "border-zinc-800 text-zinc-400 hover:border-gold hover:text-gold"
                        }`}
                      >
                        {o.label}
                      </button>
                    </form>
                  ))}
                  <form action={deleteRequest} className="ml-auto">
                    <input type="hidden" name="id" value={r.id} />
                    <button
                      type="submit"
                      className="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-400 transition-colors px-2 py-1.5"
                    >
                      <Trash size={14} />
                      Видалити
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
