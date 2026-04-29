"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, EnvelopeSimple, Clock, CheckCircle } from "@phosphor-icons/react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import type { ContactSettings } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  phone: string;
  message: string;
  status: Status;
}

export default function ContactCTAClient({ contact }: { contact: ContactSettings }) {
  const contactItems = [
    { Icon: MapPin, label: "Адреса", value: contact.address },
    { Icon: Phone, label: "Телефон", value: contact.phone },
    { Icon: EnvelopeSimple, label: "Email", value: contact.email },
    { Icon: Clock, label: "Графік", value: contact.hours },
  ].filter((i) => i.value);

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    message: "",
    status: "idle",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForm((f) => ({ ...f, status: "submitting" }));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, message: form.message }),
      });

      if (!res.ok) throw new Error("Failed");
      setForm((f) => ({ ...f, status: "success" }));
    } catch {
      setForm((f) => ({ ...f, status: "error" }));
    }
  };

  return (
    <section id="contact" className="bg-zinc-900 py-28 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24">
          {/* Form */}
          <div>
            <SectionLabel>Контакти</SectionLabel>
            <h2
              className="font-display font-semibold tracking-tight text-zinc-100 mt-5 mb-10 leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Розпочніть проект
            </h2>

            <AnimatePresence mode="wait">
              {form.status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-start gap-4 py-12"
                >
                  <CheckCircle size={48} weight="thin" className="text-gold" />
                  <h3 className="font-display font-medium text-zinc-100 text-2xl tracking-tight">
                    Заявку отримано
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Наш менеджер зв&apos;яжеться з вами протягом 2 робочих годин.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-500 tracking-widest uppercase">
                      Ім&apos;я та прізвище
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      placeholder="Олена Коваленко"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="input-underline"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-500 tracking-widest uppercase">
                      Номер телефону
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+380 XX XXX XX XX"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="input-underline"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-500 tracking-widest uppercase">
                      Опис проекту
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Розкажіть про ваш об'єкт: тип, площа, терміни..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      className="input-underline"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-3">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={form.status === "submitting"}
                      className="w-full md:w-auto justify-center py-4"
                    >
                      {form.status === "submitting"
                        ? "Надсилання..."
                        : "Надіслати заявку"}
                    </Button>
                    {form.status === "error" && (
                      <p className="text-red-400 text-sm">
                        Помилка при відправці. Спробуйте ще раз або зателефонуйте нам.
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-10 lg:pt-28">
            <div className="flex flex-col gap-6">
              {contactItems.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <Icon
                    size={18}
                    weight="thin"
                    className="text-gold mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-0.5">
                      {label}
                    </p>
                    <p className="text-zinc-200 text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Building elevation sketch */}
            <div className="mt-4">
              <BuildingElevation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildingElevation() {
  return (
    <svg
      viewBox="0 0 320 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[280px] opacity-40"
      aria-hidden="true"
    >
      {/* Ground */}
      <line x1="0" y1="148" x2="320" y2="148" stroke="#3f3f46" strokeWidth="1" />
      {/* Building A — tallest */}
      <rect x="20" y="40" width="60" height="108" stroke="#52525b" strokeWidth="1" fill="none" />
      {[60, 80, 100, 120].map((y) => (
        <line key={y} x1="20" y1={y} x2="80" y2={y} stroke="#3f3f46" strokeWidth="0.5" />
      ))}
      {/* Building B */}
      <rect x="88" y="70" width="80" height="78" stroke="#52525b" strokeWidth="1" fill="none" />
      {[90, 108, 126].map((y) => (
        <line key={y} x1="88" y1={y} x2="168" y2={y} stroke="#3f3f46" strokeWidth="0.5" />
      ))}
      {/* Building C */}
      <rect x="176" y="20" width="50" height="128" stroke="#c9a84c" strokeWidth="1" fill="rgba(201,168,76,0.04)" />
      {[45, 65, 85, 105, 125].map((y) => (
        <line key={y} x1="176" y1={y} x2="226" y2={y} stroke="#c9a84c" strokeOpacity="0.2" strokeWidth="0.5" />
      ))}
      {/* Building D */}
      <rect x="234" y="80" width="66" height="68" stroke="#52525b" strokeWidth="1" fill="none" />
    </svg>
  );
}
