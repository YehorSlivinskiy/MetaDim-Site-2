"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Buildings,
  Wrench,
  Quotes,
  ChartBar,
  Gear,
  Envelope,
  Scales,
  SignOut,
  List,
  X,
} from "@phosphor-icons/react";

const navItems = [
  { href: "/admin", label: "Дашборд", Icon: House, exact: true },
  { href: "/admin/projects", label: "Проекти", Icon: Buildings },
  { href: "/admin/services", label: "Послуги", Icon: Wrench },
  { href: "/admin/testimonials", label: "Відгуки", Icon: Quotes },
  { href: "/admin/stats", label: "Статистика", Icon: ChartBar },
  { href: "/admin/site", label: "Контент сайту", Icon: Gear },
  { href: "/admin/legal", label: "Юридичні", Icon: Scales },
  { href: "/admin/inbox", label: "Заявки", Icon: Envelope },
];

export default function Sidebar({
  email,
  signOutAction,
  inboxBadge,
}: {
  email: string | null;
  signOutAction: () => void;
  inboxBadge?: number;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock background scroll when drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Auto-close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const currentLabel =
    navItems.find((n) => isActive(n.href, n.exact))?.label ?? "Адмін";

  return (
    <>
      {/* Mobile top bar — full width above content (parent is flex-col on mobile) */}
      <div className="lg:hidden sticky top-0 z-40 w-full flex items-center gap-3 px-4 h-14 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <button
          onClick={() => setOpen(true)}
          aria-label="Відкрити меню"
          className="text-zinc-300 -ml-1 p-2 active:bg-zinc-800/60"
        >
          <List size={22} />
        </button>
        <Link
          href="/admin"
          className="font-display font-semibold text-zinc-100 tracking-tight truncate"
        >
          MetaDim <span className="text-gold">Admin</span>
        </Link>
        <span className="ml-auto text-xs uppercase tracking-widest text-zinc-500 truncate max-w-[40%]">
          {currentLabel}
        </span>
        {!!inboxBadge && (
          <Link
            href="/admin/inbox"
            className="text-[10px] font-medium bg-gold text-zinc-950 px-1.5 py-0.5 rounded"
            aria-label={`${inboxBadge} нових заявок`}
          >
            {inboxBadge}
          </Link>
        )}
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-[100dvh] w-[80vw] max-w-[300px] lg:w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-800">
          <Link
            href="/admin"
            className="font-display font-semibold text-zinc-100 tracking-tight text-lg"
            onClick={() => setOpen(false)}
          >
            MetaDim <span className="text-gold">Admin</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-zinc-400 p-1"
            aria-label="Закрити"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map(({ href, label, Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-5 py-3.5 lg:py-2.5 text-sm transition-colors border-l-2 ${
                  active
                    ? "border-gold bg-zinc-900 text-zinc-100"
                    : "border-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 active:bg-zinc-900"
                }`}
              >
                <Icon size={20} weight={active ? "fill" : "regular"} />
                <span className="flex-1">{label}</span>
                {href === "/admin/inbox" && inboxBadge ? (
                  <span className="text-[10px] font-medium bg-gold text-zinc-950 px-1.5 py-0.5 rounded">
                    {inboxBadge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-800 p-4 flex flex-col gap-2">
          {email && (
            <div className="text-xs text-zinc-500 truncate" title={email}>
              {email}
            </div>
          )}
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors py-1.5"
            >
              <SignOut size={16} />
              Вийти
            </button>
          </form>
        </div>
      </aside>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
}
