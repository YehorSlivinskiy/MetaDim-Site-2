"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

function buildPayload(formData: FormData) {
  return {
    author_name: String(formData.get("author_name") ?? "").trim(),
    author_role: String(formData.get("author_role") ?? "").trim() || null,
    company: String(formData.get("company") ?? "").trim() || null,
    quote: String(formData.get("quote") ?? "").trim(),
    rating: Math.min(5, Math.max(1, Number(formData.get("rating")) || 5)),
    sort_order: Number(formData.get("sort_order")) || 0,
    is_published: formData.get("is_published") === "on",
  };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function createTestimonial(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("testimonials").insert(buildPayload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
}

export async function updateTestimonial(id: number, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("testimonials")
    .update(buildPayload(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}

export async function deleteTestimonial(formData: FormData) {
  const id = Number(formData.get("id"));
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
