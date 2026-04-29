import Link from "next/link";

export default function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-10 py-5 sm:py-7 lg:py-8 border-b border-zinc-800">
      <div className="min-w-0">
        <h1 className="font-display font-semibold text-xl sm:text-2xl text-zinc-100 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-zinc-400 text-sm mt-1.5">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="self-start bg-gold text-zinc-950 font-display text-sm px-4 sm:px-5 py-2.5 hover:bg-gold-dim transition-colors whitespace-nowrap"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function FormShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 max-w-4xl">
      <div className="flex flex-col gap-5 sm:gap-6">{children}</div>
    </div>
  );
}

export function FormActions({
  cancelHref,
  submitLabel = "Зберегти",
  destructive,
}: {
  cancelHref: string;
  submitLabel?: string;
  destructive?: { action: () => void; label: string };
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-zinc-800">
      <button
        type="submit"
        className="bg-gold text-zinc-950 font-display text-sm px-5 sm:px-6 py-2.5 hover:bg-gold-dim transition-colors"
      >
        {submitLabel}
      </button>
      <Link
        href={cancelHref}
        className="text-zinc-400 hover:text-zinc-200 text-sm px-3 sm:px-4 py-2.5 transition-colors"
      >
        Скасувати
      </Link>
      {destructive && (
        <form action={destructive.action} className="ml-auto">
          <button
            type="submit"
            className="text-red-400 hover:text-red-300 text-sm px-3 sm:px-4 py-2.5 transition-colors"
          >
            {destructive.label}
          </button>
        </form>
      )}
    </div>
  );
}
