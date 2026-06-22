"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TOC({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    // Extract headings from HTML content
    const headingRegex = /<h([2-3])\s+id="([^"]+)"[^>]*>(.*?)<\/h[2-3]>/g;
    const extracted: TOCItem[] = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      extracted.push({
        level: parseInt(match[1]),
        id: match[2],
        text: match[3].replace(/<[^>]*>/g, ""),
      });
    }
    setItems(extracted);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0% -80% 0%" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <List size={16} className="text-[rgb(var(--color-text-tertiary))]" />
        <h4 className="text-sm font-semibold">目录</h4>
      </div>
      <ul className="space-y-1.5 border-l-2 border-[rgb(var(--color-border))] pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm transition-colors hover:text-[rgb(var(--color-accent))] ${
                item.level === 3 ? "pl-3" : ""
              } ${
                activeId === item.id
                  ? "text-[rgb(var(--color-accent))] font-medium"
                  : "text-[rgb(var(--color-text-tertiary))]"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
