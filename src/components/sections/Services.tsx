"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, CheckCircle } from "@phosphor-icons/react";
import SectionLabel from "@/components/ui/SectionLabel";

type Service = {
  id: string;
  title: string;
  description: string;
  img: string;
  flip: boolean;
  full: {
    intro: string;
    features: string[];
    process: { step: string; label: string }[];
    result: string;
  };
};

const services: Service[] = [
  {
    id: "01",
    title: "Житлове будівництво",
    description:
      "Приватні будинки, котеджі та багатоквартирні комплекси преміум-класу. Від концепції до ключів.",
    img: "/images/image-5.webp",
    flip: false,
    full: {
      intro:
        "Ми будуємо житло, в якому хочеться жити. Від приватних вілл до великих житлових комплексів — кожен проект реалізується із власним авторським підходом, без шаблонів і компромісів у якості.",
      features: [
        "Приватні будинки та котеджі будь-якої складності",
        "Багатоквартирні комплекси преміум і бізнес-класу",
        "Таунхауси та блокована забудова",
        "Власний архітектурний відділ та дизайн-бюро",
        "Матеріали від перевірених постачальників з гарантією",
        "Фіксована ціна договором — жодних доплат у процесі",
      ],
      process: [
        { step: "01", label: "Концепція та ескізний проект" },
        { step: "02", label: "Робоча документація та дозволи" },
        { step: "03", label: "Зведення конструкцій" },
        { step: "04", label: "Інженерні системи" },
        { step: "05", label: "Оздоблення та здача" },
      ],
      result:
        "Здаємо об'єкти в термін з гарантією 5 років на конструктив і 2 роки на оздоблення.",
    },
  },
  {
    id: "02",
    title: "Комерційна нерухомість",
    description:
      "Бізнес-центри, готелі та торгові простори. Архітектурна виразність поєднана з функціональністю.",
    img: "/images/image-16.webp",
    flip: true,
    full: {
      intro:
        "Комерційна нерухомість від MetaDim — це об'єкти, що працюють на бізнес. Ми проектуємо та будуємо простори, де архітектурна виразність підсилює комерційну цінність будівлі.",
      features: [
        "Офісні та бізнес-центри класу A і B",
        "Готелі, апарт-комплекси та сервісні апартаменти",
        "Торгові центри та ритейл-парки",
        "Ресторани, лобі та представницькі простори",
        "BIM-проектування та clash detection",
        "Введення в експлуатацію під ключ",
      ],
      process: [
        { step: "01", label: "Аналіз локації та ТЕП" },
        { step: "02", label: "Архітектурна концепція" },
        { step: "03", label: "Проектна документація" },
        { step: "04", label: "Будівництво та монтаж" },
        { step: "05", label: "Здача та супровід" },
      ],
      result:
        "Реалізовано понад 80 комерційних об'єктів загальною площею 340 000 м².",
    },
  },
  {
    id: "03",
    title: "Промислові об'єкти",
    description:
      "Заводи, логістичні хаби та виробничі потужності. Металоконструкції та монолітне будівництво.",
    img: "/images/image-6.webp",
    flip: false,
    full: {
      intro:
        "Промислове будівництво потребує точності, швидкості та надійності. MetaDim має власний виробничий відділ металоконструкцій і досвід зведення об'єктів у стислі терміни без втрати якості.",
      features: [
        "Заводські та виробничі корпуси",
        "Логістичні термінали та склади класу A",
        "Власне виробництво металоконструкцій",
        "Монолітні та збірні залізобетонні конструкції",
        "Технологічні об'єкти підвищеної складності",
        "Проектування з урахуванням виробничих процесів",
      ],
      process: [
        { step: "01", label: "Технологічне завдання" },
        { step: "02", label: "Конструктивне рішення" },
        { step: "03", label: "Виготовлення конструкцій" },
        { step: "04", label: "Монтаж та зведення" },
        { step: "05", label: "Пусконалагодження" },
      ],
      result:
        "Зведення типового складського комплексу 10 000 м² — від фундаменту до здачі за 4 місяці.",
    },
  },
  {
    id: "04",
    title: "Інтер'єр та оздоблення",
    description:
      "Авторські інтер'єрні рішення від власного дизайн-бюро. Преміальні матеріали, точні терміни.",
    img: "/images/image-9.webp",
    flip: true,
    full: {
      intro:
        "Власне дизайн-бюро MetaDim розробляє інтер'єри, що відповідають стилю архітектури та потребам замовника. Від концепції до вибору фурнітури — повний авторський супровід.",
      features: [
        "Авторський дизайн-проект та 3D-візуалізація",
        "Преміальні оздоблювальні матеріали",
        "Меблі та кухні на замовлення",
        "Освітлення, акустика, розумний будинок",
        "Авторський нагляд на всіх етапах",
        "Фінішне оздоблення будь-якої складності",
      ],
      process: [
        { step: "01", label: "Дизайн-концепція" },
        { step: "02", label: "Робочі креслення" },
        { step: "03", label: "Закупівля матеріалів" },
        { step: "04", label: "Оздоблювальні роботи" },
        { step: "05", label: "Декор та здача" },
      ],
      result:
        "Понад 200 реалізованих інтер'єрів від студій до пентхаусів площею до 1200 м².",
    },
  },
  {
    id: "05",
    title: "Реконструкція та ремонт",
    description:
      "Капітальний ремонт, реставрація фасадів та технічна модернізація будівель будь-якого ступеня складності.",
    img: "/images/image-3.webp",
    flip: false,
    full: {
      intro:
        "Реконструкція — це складніше за нове будівництво. MetaDim має досвід роботи з будівлями різних епох і конструктивів: від відновлення пам'яток архітектури до повної технічної модернізації.",
      features: [
        "Капітальний ремонт будь-якого ступеня складності",
        "Реставрація та відновлення фасадів",
        "Підсилення та зміна конструктиву",
        "Надбудова поверхів та розширення",
        "Технічна модернізація інженерних систем",
        "Робота без зупинки діяльності об'єкта",
      ],
      process: [
        { step: "01", label: "Технічне обстеження" },
        { step: "02", label: "Проект реконструкції" },
        { step: "03", label: "Підготовчі роботи" },
        { step: "04", label: "Основні роботи" },
        { step: "05", label: "Введення в експлуатацію" },
      ],
      result:
        "Реконструйовано 60+ об'єктів, включно з пам'ятками архітектури під охороною держави.",
    },
  },
  {
    id: "06",
    title: "Управління проектами",
    description:
      "Технічний нагляд, BIM-координація та повний девелопмент. Ваш проект під контролем на кожному етапі.",
    img: "/images/image-10.webp",
    flip: true,
    full: {
      intro:
        "Ми беремо на себе повне управління будівельним проектом — від вибору ділянки до здачі в експлуатацію. Замовник отримує результат, не занурюючись у тисячі будівельних деталей.",
      features: [
        "Повний девелопмент та управління проектом",
        "BIM-координація та clash detection",
        "Технічний нагляд і авторський супровід",
        "Тендерна документація та вибір підрядників",
        "Контроль бюджету та звітність у реальному часі",
        "Юридичний супровід та дозвільна документація",
      ],
      process: [
        { step: "01", label: "Аудит та планування" },
        { step: "02", label: "Формування команди" },
        { step: "03", label: "Координація процесів" },
        { step: "04", label: "Контроль якості" },
        { step: "05", label: "Здача та звітність" },
      ],
      result:
        "98% проектів під нашим управлінням здано в строк та в межах затвердженого бюджету.",
    },
  },
];

const itemVariants = {
  hidden: (flip: boolean) => ({ opacity: 0, x: flip ? 40 : -40 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 60, damping: 18 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 280, damping: 28 } },
  exit: { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.18 } },
};

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-zinc-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800"
      >
        {/* Image header */}
        <div className="relative h-56 lg:h-72 overflow-hidden">
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
          <div className="absolute bottom-6 left-8 flex items-end gap-4">
            <span className="font-display text-5xl font-semibold text-gold/40 tracking-tighter leading-none">
              {service.id}
            </span>
            <h3 className="font-display font-semibold text-zinc-100 text-2xl lg:text-3xl tracking-tight leading-none mb-1">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10">
          <div className="flex flex-col gap-8">
            {/* Intro */}
            <p className="text-zinc-300 leading-relaxed text-base">{service.full.intro}</p>

            {/* Features */}
            <div>
              <h4 className="font-display text-xs tracking-[0.15em] uppercase text-zinc-500 mb-4">
                Що включає
              </h4>
              <ul className="flex flex-col gap-3">
                {service.full.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                    <CheckCircle size={16} weight="fill" className="text-gold/70 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Result */}
            <div className="border-l-2 border-gold/40 pl-5">
              <p className="text-zinc-300 text-sm leading-relaxed italic">{service.full.result}</p>
            </div>
          </div>

          {/* Process */}
          <div className="lg:w-56">
            <h4 className="font-display text-xs tracking-[0.15em] uppercase text-zinc-500 mb-6">
              Етапи роботи
            </h4>
            <div className="flex flex-col gap-0">
              {service.full.process.map((p, i) => (
                <div key={i} className="flex items-start gap-4 pb-5 relative">
                  {i < service.full.process.length - 1 && (
                    <div className="absolute left-[15px] top-7 bottom-0 w-px bg-zinc-800" />
                  )}
                  <div className="w-8 h-8 flex items-center justify-center border border-zinc-700 bg-zinc-900 flex-shrink-0 relative z-10">
                    <span className="font-display text-[10px] text-gold/60">{p.step}</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-snug pt-1.5">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-8 lg:px-12 pb-8 lg:pb-10 flex items-center gap-4 border-t border-zinc-800 pt-6">
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-gold text-zinc-950 font-display font-medium px-6 py-3 text-sm tracking-wide hover:bg-gold-dim transition-colors duration-200 active:scale-[0.98]"
          >
            Обговорити проект <ArrowRight size={14} weight="bold" />
          </a>
          <button
            onClick={onClose}
            className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
          >
            Закрити
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <>
      <section id="services" className="bg-zinc-950 py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-20">
            <SectionLabel>Послуги</SectionLabel>
            <h2
              className="font-display font-semibold tracking-tight text-zinc-100 mt-5 leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Повний цикл будівництва
            </h2>
          </div>

          {/* Zig-zag rows */}
          <div className="flex flex-col gap-0">
            {services.map((service) => (
              <motion.div
                key={service.id}
                custom={service.flip}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={`grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-0 border-b border-zinc-800 ${
                  service.flip ? "lg:grid-cols-[2fr_3fr]" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${service.flip ? "lg:order-2" : ""}`}>
                  <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] overflow-hidden group">
                    <img
                      src={service.img}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/10 transition-colors duration-500" />
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`flex flex-col justify-center gap-5 p-8 lg:p-12 xl:p-16 ${
                    service.flip ? "lg:order-1" : ""
                  }`}
                >
                  <span className="font-display text-4xl font-semibold text-gold/50 tracking-tighter leading-none">
                    {service.id}
                  </span>
                  <h3
                    className="font-display font-medium text-zinc-100 tracking-tight leading-tight -mt-2"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed max-w-[40ch]">
                    {service.description}
                  </p>
                  <button
                    onClick={() => setActive(service)}
                    className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all duration-200 w-fit"
                  >
                    Детальніше <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && <ServiceModal service={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
