import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/lib/velite";
import { TOC } from "@/components/blog/TOC";
import { Comments } from "@/components/blog/Comments";
import { CodeHighlight } from "@/components/blog/CodeHighlight";
import { formatDate, readingTime } from "@/lib/utils";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "文章未找到" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date.toString(),
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const readTime = readingTime(post.code);

  return (
    <div className="container-page py-12">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-[rgb(var(--color-text-tertiary))] transition-colors hover:text-[rgb(var(--color-accent))] mb-8"
      >
        <ArrowLeft size={14} />
        返回博客列表
      </Link>

      <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-12">
        {/* Main Content */}
        <article className="min-w-0">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl leading-tight">
              {post.title}
            </h1>
            <p className="mt-3 text-lg text-[rgb(var(--color-text-secondary))]">
              {post.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[rgb(var(--color-text-tertiary))]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={15} />
                {formatDate(post.date.toString())}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} />
                {readTime} 分钟阅读
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-400 transition-colors hover:bg-brand-500/20"
                >
                  <Tag size={11} />
                  {tag}
                </Link>
              ))}
            </div>
          </header>

          {/* Content */}
          <div
            className="prose-custom [&_.heading-link]:no-underline"
            dangerouslySetInnerHTML={{ __html: post.code }}
          />
          <CodeHighlight />
        </article>

        {/* Sidebar - TOC */}
        <aside className="hidden lg:block">
          <TOC content={post.code} />
        </aside>
      </div>

      {/* Comments */}
      <div className="mt-8 mx-auto max-w-3xl">
        <Comments />
      </div>
    </div>
  );
}
