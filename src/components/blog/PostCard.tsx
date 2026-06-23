import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDate, readingTime } from "@/lib/utils";
import type { posts as PostsType } from "@/lib/velite";

type Post = (typeof PostsType)[number];

export function PostCard({ post }: { post: Post }) {
  const readTime = readingTime(post.code);

  return (
    <article className="card-hover group flex flex-col">
      {/* Meta row: date + reading time */}
      <div className="flex items-center gap-3 text-xs text-[rgb(var(--color-text-tertiary))] font-mono mb-3">
        <span className="inline-flex items-center gap-1">
          <Calendar size={12} />
          {formatDate(post.date.toString())}
        </span>
        <span className="text-[rgb(var(--color-border))]">·</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} />
          {readTime} min
        </span>
      </div>

      {/* Title */}
      <Link href={post.path}>
        <h2 className="text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-[rgb(var(--color-accent))]">
          {post.title}
        </h2>
      </Link>

      {/* Description */}
      <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed line-clamp-2 flex-1">
        {post.description}
      </p>

      {/* Tags + Read more */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag: string) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-text-tertiary))] transition-colors hover:bg-[rgb(var(--color-accent))]/10 hover:text-[rgb(var(--color-accent))]"
            >
              {tag}
            </Link>
          ))}
        </div>
        <Link
          href={post.path}
          className="inline-flex items-center gap-1 text-sm font-medium text-[rgb(var(--color-accent))] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
        >
          阅读
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
