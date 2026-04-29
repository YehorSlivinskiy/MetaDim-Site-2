"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { SiteSettingsKey, SiteSettingsMap } from "@/lib/supabase";

function parseJSON<T>(raw: FormDataEntryValue | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(String(raw)) as T;
  } catch {
    return fallback;
  }
}

function buildHero(formData: FormData): SiteSettingsMap["hero"] {
  return {
    eyebrow: String(formData.get("eyebrow") ?? "").trim(),
    title_line1: String(formData.get("title_line1") ?? "").trim(),
    title_line2_gold: String(formData.get("title_line2_gold") ?? "").trim(),
    subtitle: String(formData.get("subtitle") ?? "").trim(),
    primary_cta: {
      label: String(formData.get("primary_cta_label") ?? "").trim(),
      href: String(formData.get("primary_cta_href") ?? "").trim(),
    },
    secondary_cta: {
      label: String(formData.get("secondary_cta_label") ?? "").trim(),
      href: String(formData.get("secondary_cta_href") ?? "").trim(),
    },
    mini_stats: parseJSON(formData.get("mini_stats"), []),
  };
}

function buildContact(formData: FormData): SiteSettingsMap["contact"] {
  return {
    address: String(formData.get("address") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    hours: String(formData.get("hours") ?? "").trim(),
  };
}

function buildWhy(formData: FormData): SiteSettingsMap["why_metadim"] {
  return {
    eyebrow: String(formData.get("eyebrow") ?? "").trim(),
    heading: String(formData.get("heading") ?? "").trim(),
    intro: String(formData.get("intro") ?? "").trim(),
    reasons: parseJSON(formData.get("reasons"), []),
    certs: parseJSON(formData.get("certs"), []),
  };
}

function buildNavigation(formData: FormData): SiteSettingsMap["navigation"] {
  return {
    items: parseJSON(formData.get("items"), []),
    cta: {
      label: String(formData.get("cta_label") ?? "").trim(),
      href: String(formData.get("cta_href") ?? "").trim(),
    },
  };
}

function buildFooter(formData: FormData): SiteSettingsMap["footer"] {
  return {
    brand_tagline: String(formData.get("brand_tagline") ?? "").trim(),
    social: parseJSON(formData.get("social"), []),
    company_links: parseJSON(formData.get("company_links"), []),
    service_links: parseJSON(formData.get("service_links"), []),
    copyright: String(formData.get("copyright") ?? "").trim(),
  };
}

const BUILDERS: Record<SiteSettingsKey, (fd: FormData) => unknown> = {
  hero: buildHero,
  contact: buildContact,
  why_metadim: buildWhy,
  navigation: buildNavigation,
  footer: buildFooter,
};

export async function updateSiteSetting(key: SiteSettingsKey, formData: FormData) {
  const value = BUILDERS[key](formData);
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/site");
}
