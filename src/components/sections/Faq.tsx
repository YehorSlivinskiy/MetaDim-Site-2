import SectionLabel from "@/components/ui/SectionLabel";
import JsonLd from "@/components/JsonLd";
import { faqSchema, type FaqItem } from "@/lib/seo";

const FAQ: FaqItem[] = [
  {
    question: "Скільки коштує побудувати приватний будинок?",
    answer:
      "Вартість залежить від площі, складності проекту і матеріалів. У середньому преміальне будівництво «під ключ» у Києві та області — від $1 200 за м². Після огляду ділянки та брифу ми надаємо фіксований кошторис, який не змінюється до здачі об'єкта.",
  },
  {
    question: "Який термін реалізації об'єкта?",
    answer:
      "Приватний будинок 200–400 м² — 6–10 місяців, котедж 500+ м² — від 12 місяців, бізнес-центр середнього класу — 14–20 місяців. Точні строки фіксуємо в договорі з планом-графіком на кожен етап.",
  },
  {
    question: "Що входить у послугу «під ключ»?",
    answer:
      "Повний цикл: проектування (BIM), узгодження документації, нульовий цикл, монолітні роботи, інженерні мережі, фасад і покрівля, чорнові та чистові оздоблювальні роботи, благоустрій. Ви отримуєте об'єкт, готовий до експлуатації.",
  },
  {
    question: "Чи є гарантія на роботи?",
    answer:
      "Так. Ми надаємо документально підтверджену гарантію 10 років на конструктив (фундамент, несучі стіни, перекриття) і 2 роки на оздоблювальні роботи та інженерні системи. Гарантія прописана в договорі.",
  },
  {
    question: "Чи можете побудувати об'єкт у регіоні поза Києвом?",
    answer:
      "Так, працюємо по всій Україні. Маємо досвід об'єктів від Карпат до узбережжя. Власний парк техніки (47 одиниць) дозволяє швидко мобілізувати ресурси на віддалені майданчики.",
  },
  {
    question: "Чим BIM-проектування краще за класичне?",
    answer:
      "BIM (Building Information Modeling) — це 3D-модель будівлі з усіма інженерними системами. Дозволяє виявити колізії та помилки до початку будівництва, точно планувати закупівлі і знизити кошторис на 5–15%. У MetaDim BIM застосовується на кожному об'єкті.",
  },
];

export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-zinc-950 py-20 lg:py-28 border-t border-zinc-800"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <SectionLabel>Часті запитання</SectionLabel>
            <h2
              id="faq-heading"
              className="font-display font-semibold tracking-tight text-zinc-100 leading-tight"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              Те, що клієнти запитують найчастіше
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Якщо вашого запитання немає — зателефонуйте, ми відповімо протягом
              робочого дня та запропонуємо безкоштовний прорахунок.
            </p>
          </div>

          <div className="flex flex-col">
            {FAQ.map((item, i) => (
              <details
                key={i}
                className="group border-b border-zinc-800 py-5 first:pt-0 last:border-b-0"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="font-display font-medium text-zinc-100 text-lg leading-snug group-hover:text-gold transition-colors">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl text-zinc-500 group-open:rotate-45 transition-transform duration-200 leading-none mt-0.5"
                  >
                    +
                  </span>
                </summary>
                <p className="text-zinc-400 leading-relaxed mt-3 max-w-[60ch]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <JsonLd data={faqSchema(FAQ)} />
    </section>
  );
}
