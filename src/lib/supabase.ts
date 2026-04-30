import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export type ProjectRow = {
  id: number;
  slug: string;
  name: string;
  year: number;
  category: string;
  img: string;
  location: string | null;
  area: string | null;
  duration: string | null;
  description: string | null;
  facts: string[];
  tags: string[];
  col_class: string | null;
  row_class: string | null;
  min_h: string | null;
  sort_order: number;
  is_published: boolean;
  show_on_home: boolean;
};

export type ServiceRow = {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string | null;
  features: string[];
  intro: string | null;
  process: { step: string; label: string }[];
  result: string | null;
  flip: boolean;
  sort_order: number;
  is_published: boolean;
};

export type TestimonialRow = {
  id: number;
  author_name: string;
  author_role: string | null;
  company: string | null;
  avatar: string | null;
  quote: string;
  rating: number;
  sort_order: number;
  is_published: boolean;
};

export type StatRow = {
  id: number;
  label: string;
  value: number;
  suffix: string;
  decimals: number;
  sort_order: number;
  is_published: boolean;
};

export type LegalSection = {
  title?: string;
  paragraphs: string[];
};

export type LegalPageRow = {
  slug: string;
  title: string;
  description: string | null;
  sections: LegalSection[];
  sort_order: number;
  updated_at: string;
};

export type ContactRequestRow = {
  id: number;
  name: string;
  phone: string;
  message: string | null;
  source: string | null;
  status: "new" | "in_progress" | "done" | "spam";
  created_at: string;
};

// site_settings JSON shapes

export type HeroSettings = {
  eyebrow: string;
  title_line1: string;
  title_line2_gold: string;
  subtitle: string;
  primary_cta: { label: string; href: string };
  secondary_cta: { label: string; href: string };
  mini_stats: { value: string; label: string }[];
};

export type ContactSettings = {
  address: string;
  phone: string;
  email: string;
  hours: string;
};

export type WhyReason = { num: string; title: string; desc: string };
export type WhyMetaDimSettings = {
  eyebrow: string;
  heading: string;
  intro: string;
  reasons: WhyReason[];
  certs: string[];
};

export type NavLink = { label: string; href: string };
export type NavigationSettings = {
  items: NavLink[];
  cta: { label: string; href: string };
};

export type FooterSettings = {
  brand_tagline: string;
  social: { platform: string; href: string }[];
  company_links: NavLink[];
  service_links: NavLink[];
  copyright: string;
};

export type SiteSettingsMap = {
  hero: HeroSettings;
  contact: ContactSettings;
  why_metadim: WhyMetaDimSettings;
  navigation: NavigationSettings;
  footer: FooterSettings;
};
export type SiteSettingsKey = keyof SiteSettingsMap;
