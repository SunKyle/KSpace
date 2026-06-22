import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDate, readingTime } from "@/lib/utils";
import type { posts as PostsType } from "@/lib/velite";

type Post = (typeof PostsType)[number];

export function PostCard({ post }: { post: Post }) {
  const readTime = readingTime(post.code);

  return (
    <article className="card-hover group flex flex-col">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.slice(0, 3).map((tag: string) => (
          <Link
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className="text-xs font-medium px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-400 transition-colors hover:bg-brand-500/20"
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* Title */}
      <Link href={post.path}>
        <h2 className="text-lg font-bold leading-snug transition-colors group-hover:text-[rgb(var(--color-accent))]">
          {post.title}
        </h2>
      </Link>

      {/* Description */}
      <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))] line-clamp-2 flex-1">
        {post.description}
      </p>

      {/* Meta */}
      <div className="mt-4 flex items-center gap-4 text-xs text-[rgb(var(--color-text-tertiary))]">
        <span className="inline-flex items-center gap-1">
          <Calendar size={13} />
          {formatDate(post.date.toString())}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock size={13} />
          {readTime} 分钟阅读
        </span>
      </div>

      {/* Read more */}
      <Link
        href={post.path}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[rgb(var(--color-accent))] opacity-0 transition-opacity group-hover:opacity-100"
      >
        阅读全文
        <ArrowRight size={14} />
      </Link>
    </article>
  );
}
