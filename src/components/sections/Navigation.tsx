import { getSiteSetting } from "@/lib/db";
import NavigationClient from "./NavigationClient";
import type { NavigationSettings } from "@/lib/supabase";

const fallback: NavigationSettings = {
  items: [
    { label: "Послуги", href: "#services" },
    { label: "Проекти", href: "#portfolio" },
    { label: "Каталог робіт", href: "/works" },
    { label: "Компанія", href: "#why" },
    { label: "Контакти", href: "#contact" },
  ],
  cta: { label: "Обговорити проект", href: "#contact" },
};

export default async function Navigation() {
  const settings = (await getSiteSetting("navigation")) ?? fallback;
  return <NavigationClient settings={settings} />;
}
