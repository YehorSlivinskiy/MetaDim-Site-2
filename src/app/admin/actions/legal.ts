"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { LegalSection } from "@/lib/supabase";

function parseSections(raw: FormDataEntryValue | null): LegalSection[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(String(raw));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((s) => ({
        title:
          typeof s?.title === "string" && s.title.trim() ? s.title.trim() : undefined,
        paragraphs: Array.isArray(s?.paragraphs)
          ? s.paragraphs
              .map((p: unknown) => String(p ?? "").trim())
              .filter((p: string) => p.length > 0)
          : [],
      }))
      .filter((s) => s.paragraphs.length > 0);
  } catch {
    return [];
  }
}

function buildPayload(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    sections: parseSections(formData.get("sections")),
    sort_order: Number(formData.get("sort_order")) || 0,
  };
}

function revalidateAll(slug?: string) {
  revalidatePath("/");
  revalidatePath("/admin/legal");
  if (slug) revalidatePath(`/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function updateLegalPage(slug: string, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const payload = buildPayload(formData);
  const { error } = await supabase
    .from("legal_pages")
    .update(payload)
    .eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidateAll(slug);
  redirect("/admin/legal");
}
