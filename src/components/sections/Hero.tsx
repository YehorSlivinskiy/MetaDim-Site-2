import { getSiteSetting } from "@/lib/db";
import HeroClient from "./HeroClient";
import type { HeroSettings } from "@/lib/supabase";

const fallback: HeroSettings = {
  eyebrow: "Преміальне будівництво",
  title_line1: "Будуємо",
  title_line2_gold: "на десятиліття",
  subtitle:
    "MetaDim зводить об'єкти, що стоять вічно. Від фундаменту до оздоблення — власні технології, власна техніка, фіксована ціна.",
  primary_cta: { label: "Розпочати проект", href: "#contact" },
  secondary_cta: { label: "Наші проекти", href: "#portfolio" },
  mini_stats: [
    { value: "27", label: "Років" },
    { value: "340+", label: "Об'єктів" },
    { value: "1.2M", label: "м²" },
  ],
};

export default async function Hero() {
  const settings = (await getSiteSetting("hero")) ?? fallback;
  return <HeroClient settings={settings} />;
}
