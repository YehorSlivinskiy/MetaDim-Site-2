import {
  supabase,
  type ProjectRow,
  type ServiceRow,
  type TestimonialRow,
  type StatRow,
  type SiteSettingsMap,
  type SiteSettingsKey,
} from "./supabase";

export async function getProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/** Projects shown in the home-page Portfolio section (a curated subset). */
export async function getHomePortfolioProjects(limit = 6): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .eq("show_on_home", true)
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function getServices(): Promise<ServiceRow[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getTestimonials(): Promise<TestimonialRow[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getStats(): Promise<StatRow[]> {
  const { data, error } = await supabase
    .from("stats")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function saveContactRequest(input: {
  name: string;
  phone: string;
  message?: string;
}) {
  const { error } = await supabase.from("contact_requests").insert({
    name: input.name,
    phone: input.phone,
    message: input.message ?? null,
  });
  if (error) throw error;
}

// Site settings ---------------------------------------------------------------

export async function getSiteSetting<K extends SiteSettingsKey>(
  key: K,
): Promise<SiteSettingsMap[K] | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  return (data?.value as SiteSettingsMap[K]) ?? null;
}
