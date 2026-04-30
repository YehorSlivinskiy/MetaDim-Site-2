import {
  supabase,
  type ProjectRow,
  type ServiceRow,
  type TestimonialRow,
  type StatRow,
  type SiteSettingsMap,
  type SiteSettingsKey,
  type LegalPageRow,
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

export async function getProjectBySlug(slug: string): Promise<ProjectRow | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw error;
  return (data as ProjectRow | null) ?? null;
}

export async function getRelatedProjects(
  excludeId: number,
  category: string,
  limit = 3,
): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .eq("category", category)
    .neq("id", excludeId)
    .order("sort_order", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function getProjectSlugs(): Promise<{ slug: string }[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("slug")
    .eq("is_published", true);
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

export async function getServiceBySlug(slug: string): Promise<ServiceRow | null> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw error;
  return (data as ServiceRow | null) ?? null;
}

export async function getServiceSlugs(): Promise<{ slug: string }[]> {
  const { data, error } = await supabase
    .from("services")
    .select("slug")
    .eq("is_published", true);
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

// Legal pages ----------------------------------------------------------------

export async function getLegalPage(slug: string): Promise<LegalPageRow | null> {
  const { data, error } = await supabase
    .from("legal_pages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as LegalPageRow | null) ?? null;
}

export async function getAllLegalPages(): Promise<LegalPageRow[]> {
  const { data, error } = await supabase
    .from("legal_pages")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as LegalPageRow[]) ?? [];
}

export async function getLegalSlugs(): Promise<{ slug: string }[]> {
  const { data, error } = await supabase.from("legal_pages").select("slug");
  if (error) throw error;
  return data ?? [];
}

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
