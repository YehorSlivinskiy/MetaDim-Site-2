import { LinkedinLogo, InstagramLogo, FacebookLogo } from "@phosphor-icons/react/dist/ssr";

const companyLinks = [
  { label: "Про компанію", href: "#why" },
  { label: "Послуги", href: "#services" },
  { label: "Портфоліо", href: "#portfolio" },
  { label: "Контакти", href: "#contact" },
];

const serviceLinks = [
  { label: "Житлове будівництво", href: "#services" },
  { label: "Комерційна нерухомість", href: "#services" },
  { label: "Промислові об'єкти", href: "#services" },
  { label: "Реконструкція", href: "#services" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <span className="font-display font-semibold text-zinc-100 text-xl tracking-tight">
              MetaDim
            </span>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[32ch]">
              Преміальне будівництво з 1997 року. Від Карпат до узбережжя — ваш
              надійний партнер на десятиліття.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                <LinkedinLogo size={20} weight="thin" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                <InstagramLogo size={20} weight="thin" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                <FacebookLogo size={20} weight="thin" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-5">
              Компанія
            </p>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
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

          {/* Services */}
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-5">
              Послуги
            </p>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((l) => (
                <li key={l.label}>
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

          {/* Contacts */}
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-5">
              Контакти
            </p>
            <ul className="flex flex-col gap-3">
              <li className="text-zinc-400 text-sm">м. Київ, вул. Хрещатик, 22</li>
              <li>
                <a
                  href="tel:+380442471839"
                  className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors"
                >
                  +380 44 247 18 39
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@metadim.ua"
                  className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors"
                >
                  info@metadim.ua
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-zinc-600 text-xs">
            © 2024 MetaDim. Усі права захищені.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">
              Політика конфіденційності
            </a>
            <a href="#" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">
              Умови використання
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
