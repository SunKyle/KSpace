import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/velite";
import { formatDate } from "@/lib/utils";
import { Calendar, Tag, ArrowLeft, Github, ExternalLink, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

const STATUS_MAP = {
  active: { label: "进行中", className: "text-emerald-500 bg-emerald-500/10" },
  completed: { label: "已完成", className: "text-sky-500 bg-sky-500/10" },
  archived: { label: "已归档", className: "text-[rgb(var(--color-text-tertiary))] bg-[rgb(var(--color-bg-tertiary))]" },
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "项目未找到" };

  return {
    title: project.title,
    description: project.description,
    keywords: project.tags,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      tags: project.tags,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const status = STATUS_MAP[project.status];

  return (
    <div className="container-page py-12">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-[rgb(var(--color-text-tertiary))] transition-colors hover:text-[rgb(var(--color-accent))] mb-8"
      >
        <ArrowLeft size={14} />
        返回项目列表
      </Link>

      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md",
                status.className
              )}
            >
              {status.label}
            </span>
            {project.featured && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl leading-tight">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-[rgb(var(--color-text-secondary))]">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[rgb(var(--color-text-tertiary))]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={15} />
              {formatDate(project.date.toString())}
            </span>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-text-secondary))]"
              >
                <Tag size={11} />
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                <Github size={16} />
                源代码
                <ExternalLink size={12} />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                在线演示
                <ExternalLink size={12} />
              </a>
            )}
            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                <BookOpen size={16} />
                文档
              </a>
            )}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose-custom [&_.heading-link]:no-underline"
          dangerouslySetInnerHTML={{ __html: project.code }}
        />
      </div>
    </div>
  );
}
