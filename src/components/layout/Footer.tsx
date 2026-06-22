import Link from "next/link";
import { Github, Twitter, Mail, Rss } from "lucide-react";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/kyle-sun",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://twitter.com/kyle_sun",
    label: "Twitter",
    icon: Twitter,
  },
  {
    href: "mailto:kyle@kspace.dev",
    label: "Email",
    icon: Mail,
  },
  {
    href: "/rss.xml",
    label: "RSS",
    icon: Rss,
  },
];

const FOOTER_LINKS = [
  { href: "/blog", label: "博客" },
  { href: "/projects", label: "项目" },
  { href: "/lab", label: "AI Lab" },
  { href: "/about", label: "关于" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))]">
      <div className="container-wide py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Left */}
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-[rgb(var(--color-accent))]"
            >
              KSpace
            </Link>
            <p className="text-sm text-[rgb(var(--color-text-tertiary))]">
              思考 · 构建 · 分享
            </p>
          </div>

          {/* Center Nav */}
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-accent))]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right - Social */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[rgb(var(--color-text-secondary))] transition-all hover:text-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-bg-tertiary))]"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-[rgb(var(--color-border))] pt-6 text-center">
          <p className="text-xs text-[rgb(var(--color-text-tertiary))]">
            &copy; {year} KSpace. Built with Next.js &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
