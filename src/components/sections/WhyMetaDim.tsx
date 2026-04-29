import { getSiteSetting } from "@/lib/db";
import WhyMetaDimClient from "./WhyMetaDimClient";
import type { WhyMetaDimSettings } from "@/lib/supabase";

const fallback: WhyMetaDimSettings = {
  eyebrow: "Чому MetaDim",
  heading: "Перевага, яка вимірюється роками",
  intro:
    "За 27 років ми не змінили жодного з базових принципів. Якість матеріалів, прозорість ціноутворення і особиста відповідальність керівника на кожному об'єкті.",
  reasons: [
    { num: "01", title: "Власний парк техніки", desc: "Без субпідрядників, без затримок." },
    { num: "02", title: "Гарантія 10 років", desc: "Документально підтверджена відповідальність." },
    { num: "03", title: "BIM-проектування", desc: "Цифрова модель будівлі усуває помилки." },
    { num: "04", title: "Фіксована ціна", desc: "Жодних прихованих платежів." },
    { num: "05", title: "5 сегментів ринку", desc: "Житлове, комерційне, промислове." },
  ],
  certs: ["ISO 9001", "DSTU", "LEED", "BIM Level 2"],
};

export default async function WhyMetaDim() {
  const settings = (await getSiteSetting("why_metadim")) ?? fallback;
  return <WhyMetaDimClient settings={settings} />;
}
