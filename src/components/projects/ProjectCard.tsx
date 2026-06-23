import Link from "next/link";
import { ExternalLink, Github, Folder, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { projects as ProjectsType } from "@/lib/velite";

type Project = (typeof ProjectsType)[number];

const STATUS_MAP = {
  active: { label: "进行中", className: "text-emerald-500 bg-emerald-500/10" },
  completed: { label: "已完成", className: "text-sky-500 bg-sky-500/10" },
  archived: { label: "已归档", className: "text-[rgb(var(--color-text-tertiary))] bg-[rgb(var(--color-bg-tertiary))]" },
};

export function ProjectCard({ project }: { project: Project }) {
  const status = STATUS_MAP[project.status];

  return (
    <article className="card-hover group flex flex-col">
      {/* Status + Links row */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md",
            status.className
          )}
        >
          {status.label}
        </span>
        <div className="flex items-center gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--color-text-tertiary))] transition-colors hover:text-[rgb(var(--color-text-primary))]"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--color-text-tertiary))] transition-colors hover:text-[rgb(var(--color-text-primary))]"
              aria-label="Live Demo"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <Link href={project.path}>
        <h2 className="flex items-center gap-2 text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-[rgb(var(--color-accent))]">
          <Folder size={18} className="text-[rgb(var(--color-accent))] shrink-0" />
          {project.title}
        </h2>
      </Link>

      {/* Description */}
      <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed line-clamp-2 flex-1">
        {project.description}
      </p>

      {/* Tags + Read more */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag: string) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-text-tertiary))]"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={project.path}
          className="inline-flex items-center gap-1 text-sm font-medium text-[rgb(var(--color-accent))] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
        >
          详情
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
