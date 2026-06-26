"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  /** Use light-tinted styling — for when the toggle sits on a dark background */
  variant?: "default" | "overlay";
}

export function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  if (!mounted) {
    return <div className="touch-target" />;
  }

  const isOverlay = variant === "overlay";

  return (
    <button
      onClick={toggle}
      className={cn(
        "touch-target rounded-lg border transition-all cursor-pointer",
        isOverlay
          ? "border-white/15 text-white/50 hover:border-white/30 hover:text-white"
          : "border-[rgb(var(--color-border))] text-[rgb(var(--color-text-secondary))] hover:border-[rgb(var(--color-accent))] hover:text-[rgb(var(--color-accent))]"
      )}
      aria-label={dark ? "切换到亮色模式" : "切换到暗色模式"}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
