"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export function SearchBar() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/blog?q=${encodeURIComponent(value.trim())}`);
    }
  }

  function clear() {
    setValue("");
    router.push("/blog");
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-tertiary))]"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="搜索文章..."
        className="w-full rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))] py-2.5 pl-10 pr-10 text-sm text-[rgb(var(--color-text-primary))] placeholder:text-[rgb(var(--color-text-tertiary))] outline-none transition-colors focus:border-brand-500 focus:bg-[rgb(var(--color-bg-primary))]"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-tertiary))] hover:text-[rgb(var(--color-text-primary))]"
        >
          <X size={14} />
        </button>
      )}
    </form>
  );
}
