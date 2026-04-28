import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.15em] uppercase text-gold",
        className
      )}
    >
      <span className="block w-5 h-px bg-gold flex-shrink-0" />
      {children}
    </span>
  );
}
