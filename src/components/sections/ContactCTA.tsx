import { getSiteSetting } from "@/lib/db";
import ContactCTAClient from "./ContactCTAClient";
import type { ContactSettings } from "@/lib/supabase";

const fallback: ContactSettings = {
  address: "м. Київ, вул. Хрещатик, 22, оф. 14",
  phone: "+380 44 247 18 39",
  email: "info@metadim.ua",
  hours: "Пн–Пт 9:00–18:00",
};

export default async function ContactCTA() {
  const contact = (await getSiteSetting("contact")) ?? fallback;
  return <ContactCTAClient contact={contact} />;
}
