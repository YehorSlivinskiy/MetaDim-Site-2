import { createSupabaseServerClient } from "@/lib/supabase-server";
import PageHeader from "../../_components/PageHeader";
import {
  HeroForm,
  ContactForm,
  WhyMetaDimForm,
  NavigationForm,
  FooterForm,
} from "../../_components/SiteSettingsForms";
import { updateSiteSetting } from "../../actions/siteSettings";
import type {
  ContactSettings,
  FooterSettings,
  HeroSettings,
  NavigationSettings,
  WhyMetaDimSettings,
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "contact", label: "Контакти" },
  { id: "why_metadim", label: "Чому MetaDim" },
  { id: "navigation", label: "Навігація" },
  { id: "footer", label: "Футер" },
];

async function fetchAll() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  const map: Record<string, unknown> = {};
  for (const row of data ?? []) {
    map[row.key] = row.value;
  }
  return map;
}

export default async function SiteSettingsPage() {
  const data = await fetchAll();

  const heroAction = updateSiteSetting.bind(null, "hero");
  const contactAction = updateSiteSetting.bind(null, "contact");
  const whyAction = updateSiteSetting.bind(null, "why_metadim");
  const navAction = updateSiteSetting.bind(null, "navigation");
  const footerAction = updateSiteSetting.bind(null, "footer");

  return (
    <>
      <PageHeader
        title="Контент сайту"
        description="Текстові блоки, що відображаються на сайті поза CMS-таблицями."
      />
      <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 flex flex-col gap-10 sm:gap-12 max-w-4xl">
        <nav className="flex gap-2 overflow-x-auto sticky top-14 lg:top-0 z-10 bg-zinc-900/95 backdrop-blur -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 py-3 border-y border-zinc-800 scrollbar-hide">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-gold border border-zinc-800 hover:border-gold px-3 py-1.5 transition-colors whitespace-nowrap"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <section id="hero" className="scroll-mt-20">
          <HeroForm initial={(data.hero ?? defaultHero) as HeroSettings} action={heroAction} />
        </section>

        <section id="contact" className="scroll-mt-20">
          <ContactForm
            initial={(data.contact ?? defaultContact) as ContactSettings}
            action={contactAction}
          />
        </section>

        <section id="why_metadim" className="scroll-mt-20">
          <WhyMetaDimForm
            initial={(data.why_metadim ?? defaultWhy) as WhyMetaDimSettings}
            action={whyAction}
          />
        </section>

        <section id="navigation" className="scroll-mt-20">
          <NavigationForm
            initial={(data.navigation ?? defaultNav) as NavigationSettings}
            action={navAction}
          />
        </section>

        <section id="footer" className="scroll-mt-20">
          <FooterForm
            initial={(data.footer ?? defaultFooter) as FooterSettings}
            action={footerAction}
          />
        </section>
      </div>
    </>
  );
}

const defaultHero: HeroSettings = {
  eyebrow: "",
  title_line1: "",
  title_line2_gold: "",
  subtitle: "",
  primary_cta: { label: "", href: "" },
  secondary_cta: { label: "", href: "" },
  mini_stats: [],
};
const defaultContact: ContactSettings = { address: "", phone: "", email: "", hours: "" };
const defaultWhy: WhyMetaDimSettings = {
  eyebrow: "",
  heading: "",
  intro: "",
  reasons: [],
  certs: [],
};
const defaultNav: NavigationSettings = { items: [], cta: { label: "", href: "" } };
const defaultFooter: FooterSettings = {
  brand_tagline: "",
  social: [],
  company_links: [],
  service_links: [],
  copyright: "",
};
