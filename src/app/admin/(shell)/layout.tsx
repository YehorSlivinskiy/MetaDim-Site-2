import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Sidebar from "../_components/Sidebar";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { signOutAction } from "../actions/auth";

export const metadata: Metadata = {
  title: "MetaDim Admin",
  robots: { index: false, follow: false },
};

export default async function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { count: newCount } = await supabase
    .from("contact_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  return (
    <div className="min-h-[100dvh] bg-zinc-900 text-zinc-100 flex flex-col lg:flex-row">
      <Sidebar
        email={user.email ?? null}
        signOutAction={signOutAction}
        inboxBadge={newCount ?? 0}
      />
      <div className="flex-1 min-w-0 w-full">{children}</div>
    </div>
  );
}
