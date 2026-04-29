"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

function buildPayload(formData: FormData) {
  return {
    label: String(formData.get("label") ?? "").trim(),
    value: Number(formData.get("value")) || 0,
    suffix: String(formData.get("suffix") ?? "").trim(),
    decimals: Math.max(0, Number(formData.get("decimals")) || 0),
    sort_order: Number(formData.get("sort_order")) || 0,
    is_published: formData.get("is_published") === "on",
  };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin/stats");
}

export async function createStat(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("stats").insert(buildPayload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
}

export async function updateStat(id: number, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("stats").update(buildPayload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}

export async function deleteStat(formData: FormData) {
  const id = Number(formData.get("id"));
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("stats").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
