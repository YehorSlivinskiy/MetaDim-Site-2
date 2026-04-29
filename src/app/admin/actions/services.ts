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

function parseProcess(raw: FormDataEntryValue | null) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(String(raw));
    if (Array.isArray(parsed)) {
      return parsed
        .map((p) => ({
          step: String(p?.step ?? "").trim(),
          label: String(p?.label ?? "").trim(),
        }))
        .filter((p) => p.step !== "" || p.label !== "");
    }
  } catch {}
  return [];
}

function buildPayload(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug =
    String(formData.get("slug") ?? "").trim() ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9Ѐ-ӿ\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  return {
    slug,
    title,
    description: String(formData.get("description") ?? "").trim(),
    icon: String(formData.get("icon") ?? "").trim() || null,
    features: parseStringArray(formData.get("features")),
    intro: String(formData.get("intro") ?? "").trim() || null,
    process: parseProcess(formData.get("process")),
    result: String(formData.get("result") ?? "").trim() || null,
    flip: formData.get("flip") === "on",
    sort_order: Number(formData.get("sort_order")) || 0,
    is_published: formData.get("is_published") === "on",
  };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function createService(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("services").insert(buildPayload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/services");
}

export async function updateService(id: number, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("services")
    .update(buildPayload(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/services");
}

export async function deleteService(id: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/services");
}

export async function toggleServicePublished(id: number, next: boolean) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("services")
    .update({ is_published: next })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
