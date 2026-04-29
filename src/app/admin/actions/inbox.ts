"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const VALID_STATUSES = ["new", "in_progress", "done", "spam"] as const;
type Status = (typeof VALID_STATUSES)[number];

export async function setRequestStatus(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = String(formData.get("status")) as Status;
  if (!VALID_STATUSES.includes(status)) return;
  const supabase = createSupabaseServerClient();
  await supabase.from("contact_requests").update({ status }).eq("id", id);
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}

export async function deleteRequest(formData: FormData) {
  const id = Number(formData.get("id"));
  const supabase = createSupabaseServerClient();
  await supabase.from("contact_requests").delete().eq("id", id);
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}
