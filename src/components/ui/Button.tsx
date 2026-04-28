"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "text";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const moveX = useTransform(x, [-50, 50], [-5, 5]);
  const moveY = useTransform(y, [-50, 50], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { type: "spring", stiffness: 200, damping: 20 });
    animate(y, 0, { type: "spring", stiffness: 200, damping: 20 });
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 font-display font-medium text-sm tracking-wide transition-all duration-300 ease-expo select-none";

  const variants = {
    primary:
      "bg-gold text-zinc-950 px-7 py-3.5 hover:bg-gold-dim active:scale-[0.98]",
    ghost:
      "border border-gold/40 text-gold px-7 py-3.5 hover:border-gold hover:bg-gold/5 active:scale-[0.98]",
    text: "text-zinc-400 hover:text-zinc-100 px-2 py-1 underline-offset-4 hover:underline",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: moveX, y: moveY }}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </motion.button>
  );
}
