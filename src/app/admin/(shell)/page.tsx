import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import {
  Buildings,
  Wrench,
  Quotes,
  ChartBar,
  Envelope,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import PageHeader from "../_components/PageHeader";

export const dynamic = "force-dynamic";

async function getCounts() {
  const supabase = createSupabaseServerClient();
  const [projects, services, testimonials, stats, inboxNew, inboxTotal] =
    await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
      supabase.from("stats").select("*", { count: "exact", head: true }),
      supabase
        .from("contact_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("contact_requests")
        .select("*", { count: "exact", head: true }),
    ]);
  return {
    projects: projects.count ?? 0,
    services: services.count ?? 0,
    testimonials: testimonials.count ?? 0,
    stats: stats.count ?? 0,
    inboxNew: inboxNew.count ?? 0,
    inboxTotal: inboxTotal.count ?? 0,
  };
}

async function getRecentInbox() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("contact_requests")
    .select("id, name, phone, message, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

export default async function AdminDashboardPage() {
  const [counts, recent] = await Promise.all([getCounts(), getRecentInbox()]);

  const cards = [
    { href: "/admin/projects", label: "Проекти", value: counts.projects, Icon: Buildings },
    { href: "/admin/services", label: "Послуги", value: counts.services, Icon: Wrench },
    { href: "/admin/testimonials", label: "Відгуки", value: counts.testimonials, Icon: Quotes },
    { href: "/admin/stats", label: "Статистика", value: counts.stats, Icon: ChartBar },
    {
      href: "/admin/inbox",
      label: "Заявки",
      value: counts.inboxTotal,
      sub: counts.inboxNew > 0 ? `${counts.inboxNew} нових` : "Усі прочитані",
      Icon: Envelope,
    },
  ];

  return (
    <>
      <PageHeader
        title="Дашборд"
        description="Швидкий огляд контенту і вхідних заявок."
      />
      <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 flex flex-col gap-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {cards.map(({ href, label, value, sub, Icon }) => (
            <Link
              key={href}
              href={href}
              className="bg-zinc-950 border border-zinc-800 hover:border-gold p-4 sm:p-5 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <Icon size={20} className="text-gold" />
                <ArrowRight
                  size={14}
                  className="text-zinc-600 group-hover:text-gold transition-colors"
                />
              </div>
              <div className="font-display text-2xl sm:text-3xl text-zinc-100 font-semibold tabular-nums">
                {value}
              </div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
                {label}
              </div>
              {sub && <div className="text-xs text-zinc-400 mt-1.5">{sub}</div>}
            </Link>
          ))}
        </div>

        <section className="bg-zinc-950 border border-zinc-800">
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
            <h2 className="font-display text-zinc-100 text-lg">Останні заявки</h2>
            <Link
              href="/admin/inbox"
              className="text-xs text-zinc-400 hover:text-gold transition-colors"
            >
              Усі заявки →
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-zinc-500 px-5 py-8 text-center">
              Заявок ще немає.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {recent.map((r) => (
                <li
                  key={r.id}
                  className="px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-1 sm:gap-3 text-sm"
                >
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                    {r.status === "new" && (
                      <span className="text-[10px] uppercase tracking-widest text-gold border border-gold px-1.5 py-0.5">
                        Нове
                      </span>
                    )}
                    <span className="text-zinc-100 font-medium">{r.name}</span>
                    <a
                      href={`tel:${r.phone}`}
                      className="text-zinc-400 hover:text-gold transition-colors"
                    >
                      {r.phone}
                    </a>
                  </div>
                  <span className="text-zinc-500 sm:truncate sm:flex-1 sm:min-w-[120px] text-xs sm:text-sm">
                    {r.message ?? "—"}
                  </span>
                  <span className="text-zinc-600 text-xs">
                    {new Date(r.created_at).toLocaleString("uk-UA")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
