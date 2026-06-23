import { Github, Twitter, Mail, Rss } from "lucide-react";

const SOCIAL_LINKS = [
  { href: "https://github.com/kyle-sun", label: "GitHub", icon: Github },
  { href: "https://twitter.com/kyle_sun", label: "Twitter", icon: Twitter },
  { href: "mailto:kyle@kspace.dev", label: "Email", icon: Mail },
  { href: "/rss.xml", label: "RSS", icon: Rss },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))]">
      <div className="container-wide py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Left */}
          <div className="flex items-center gap-1.5 text-sm text-[rgb(var(--color-text-tertiary))]">
            <span className="font-mono text-[rgb(var(--color-accent))]">KSpace</span>
            <span className="text-[rgb(var(--color-border))]">·</span>
            <span>&copy; {year}</span>
          </div>

          {/* Right - Social */}
          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target rounded-lg text-[rgb(var(--color-text-tertiary))] transition-all hover:text-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-bg-tertiary))] cursor-pointer"
                aria-label={social.label}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
