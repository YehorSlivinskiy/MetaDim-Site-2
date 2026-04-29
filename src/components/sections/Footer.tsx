import {
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { getSiteSetting } from "@/lib/db";
import type { FooterSettings, ContactSettings } from "@/lib/supabase";

type SocialIcon = typeof LinkedinLogo;

const fallbackFooter: FooterSettings = {
  brand_tagline:
    "Преміальне будівництво з 1997 року. Від Карпат до узбережжя — ваш надійний партнер на десятиліття.",
  social: [
    { platform: "linkedin", href: "#" },
    { platform: "instagram", href: "#" },
    { platform: "facebook", href: "#" },
  ],
  company_links: [
    { label: "Про компанію", href: "#why" },
    { label: "Послуги", href: "#services" },
    { label: "Портфоліо", href: "#portfolio" },
    { label: "Контакти", href: "#contact" },
  ],
  service_links: [
    { label: "Житлове будівництво", href: "#services" },
    { label: "Комерційна нерухомість", href: "#services" },
    { label: "Промислові об'єкти", href: "#services" },
    { label: "Реконструкція", href: "#services" },
  ],
  copyright: "© 2024 MetaDim. Усі права захищені.",
};

const SOCIAL_ICONS: Record<string, SocialIcon> = {
  linkedin: LinkedinLogo,
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  youtube: YoutubeLogo,
  x: XLogo,
  twitter: XLogo,
};

export default async function Footer() {
  const [footerData, contactData] = await Promise.all([
    getSiteSetting("footer"),
    getSiteSetting("contact"),
  ]);
  const footer = footerData ?? fallbackFooter;
  const contact: ContactSettings | null = contactData;

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">
          <div className="flex flex-col gap-5">
            <span className="font-display font-semibold text-zinc-100 text-xl tracking-tight">
              MetaDim
            </span>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[32ch]">
              {footer.brand_tagline}
            </p>
            {(() => {
              // Hide socials whose href is empty or just "#" (placeholder)
              const realSocials = (footer.social ?? []).filter(
                (s) => s.href && s.href !== "#",
              );
              if (realSocials.length === 0) return null;
              return (
                <div className="flex gap-3">
                  {realSocials.map((s) => {
                    const Icon =
                      SOCIAL_ICONS[s.platform.toLowerCase()] ?? LinkedinLogo;
                    return (
                      <a
                        key={s.platform + s.href}
                        href={s.href}
                        aria-label={s.platform}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-600 hover:text-zinc-300 transition-colors"
                      >
                        <Icon size={20} weight="thin" />
                      </a>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {footer.company_links?.length > 0 && (
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-5">
                Компанія
              </p>
              <ul className="flex flex-col gap-3">
                {footer.company_links.map((l) => (
                  <li key={l.label + l.href}>
                    <a
                      href={l.href}
                      className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {footer.service_links?.length > 0 && (
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-5">
                Послуги
              </p>
              <ul className="flex flex-col gap-3">
                {footer.service_links.map((l) => (
                  <li key={l.label + l.href}>
                    <a
                      href={l.href}
                      className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-5">
              Контакти
            </p>
            <ul className="flex flex-col gap-3">
              {contact?.address && (
                <li className="text-zinc-400 text-sm">{contact.address}</li>
              )}
              {contact?.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact?.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-zinc-600 text-xs">{footer.copyright}</p>
          {/* Privacy / Terms hidden until real pages exist — placeholder links hurt SEO. */}
        </div>
      </div>
    </footer>
  );
}
