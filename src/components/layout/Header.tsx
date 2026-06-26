"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal } from "lucide-react";
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
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();

  // ── Track scroll position — transparent header when at top (over hero) ──
  useEffect(() => {
    const onScroll = () => setIsAtTop(window.scrollY < 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only apply hero transparency on the home page
  const isHome = pathname === "/";
  const heroTransparent = isHome && isAtTop;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        heroTransparent
          ? "border-b border-transparent bg-transparent backdrop-blur-none"
          : "border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))]/70 backdrop-blur-xl saturate-150"
      )}
    >
      <div className="container-wide flex h-14 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 font-bold tracking-tight text-[rgb(var(--color-accent))]"
        >
          <Terminal size={16} className="text-[rgb(var(--color-accent-glow))]" />
          <span className="text-base">KSpace</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:items-center md:gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all duration-500",
                heroTransparent
                  ? cn(
                      pathname === item.href
                        ? "text-white bg-white/10"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    )
                  : cn(
                      pathname === item.href
                        ? "text-[rgb(var(--color-accent))] bg-[rgb(var(--color-accent))]/8"
                        : "text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-bg-tertiary))]"
                    )
              )}
            >
              {item.label}
            </Link>
          ))}
          <div
            className={cn(
              "ml-2 pl-2 transition-all duration-500",
              heroTransparent
                ? "border-l border-white/15"
                : "border-l border-[rgb(var(--color-border))]"
            )}
          >
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "touch-target rounded-lg border cursor-pointer transition-all duration-500",
              heroTransparent
                ? "border-white/20 text-white/60"
                : "border-[rgb(var(--color-border))] text-[rgb(var(--color-text-secondary))]"
            )}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))]/95 backdrop-blur-xl md:hidden">
          <nav className="container-wide flex flex-col gap-0.5 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-[rgb(var(--color-accent))] bg-[rgb(var(--color-accent))]/8"
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
