"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/projects", label: "项目" },
  { href: "/lab", label: "AI Lab" },
  { href: "/about", label: "关于" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))]/80 backdrop-blur-xl">
      <div className="container-wide flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[rgb(var(--color-accent))]"
        >
          KSpace
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-[rgb(var(--color-accent))] bg-brand-500/10"
                  : "text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-bg-tertiary))]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-secondary))]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] md:hidden">
          <nav className="container-wide flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-[rgb(var(--color-accent))] bg-brand-500/10"
                    : "text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-bg-tertiary))]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
