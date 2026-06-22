"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTag?: string;
}

export function TagFilter({ tags, selectedTag }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleTagClick(tag: string) {
    if (tag === selectedTag) {
      // Deselect
      const params = new URLSearchParams(searchParams.toString());
      params.delete("tag");
      router.push(`/blog?${params.toString()}`);
    } else {
      router.push(`/blog?tag=${encodeURIComponent(tag)}`);
    }
  }

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {selectedTag && (
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("tag");
            router.push(`/blog?${params.toString()}`);
          }}
          className="text-xs font-medium px-3 py-1.5 rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700"
        >
          全部
        </button>
      )}
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={cn(
            "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
            selectedTag === tag
              ? "border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400"
              : "border-[rgb(var(--color-border))] text-[rgb(var(--color-text-secondary))] hover:border-brand-500/50 hover:text-[rgb(var(--color-accent))]"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
