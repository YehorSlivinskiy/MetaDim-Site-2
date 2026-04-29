"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

function parseStringArray(raw: FormDataEntryValue | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(String(raw));
    if (Array.isArray(parsed)) return parsed.map(String).filter((s) => s.trim() !== "");
  } catch {}
  return [];
}

function buildPayload(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug =
    String(formData.get("slug") ?? "").trim() ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9Ѐ-ӿ\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  return {
    slug,
    name,
    year: Number(formData.get("year")) || new Date().getFullYear(),
    category: String(formData.get("category") ?? "").trim(),
    img: String(formData.get("img") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim() || null,
    area: String(formData.get("area") ?? "").trim() || null,
    duration: String(formData.get("duration") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    facts: parseStringArray(formData.get("facts")),
    tags: parseStringArray(formData.get("tags")),
    col_class: String(formData.get("col_class") ?? "").trim() || null,
    row_class: String(formData.get("row_class") ?? "").trim() || null,
    min_h: String(formData.get("min_h") ?? "").trim() || null,
    sort_order: Number(formData.get("sort_order")) || 0,
    is_published: formData.get("is_published") === "on",
    show_on_home: formData.get("show_on_home") === "on",
  };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/works");
  revalidatePath("/admin/projects");
}

export async function createProject(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const payload = buildPayload(formData);
  const { error } = await supabase.from("projects").insert(payload);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/projects");
}

export async function updateProject(id: number, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const payload = buildPayload(formData);
  const { error } = await supabase.from("projects").update(payload).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/projects");
}

export async function deleteProject(id: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/projects");
}

export async function toggleProjectPublished(id: number, next: boolean) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("projects")
    .update({ is_published: next })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
