import Link from "next/link";
import {
  ArrowRight,
  Github,
  Twitter,
  Mail,
  Layers,
  Database,
  Globe,
  BrainCircuit,
  ChevronRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { posts, projects } from "@/lib/velite";
import { formatDate, readingTime } from "@/lib/utils";
import { SplineHero } from "@/components/home/SplineHero";

// ---- Data ---- //
const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

const latestPosts = posts
  .filter((p) => !p.draft)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

const STACK_LAYERS = [
  {
    label: "AI / LLM",
    icon: BrainCircuit,
    items: ["LangChain", "RAG", "Ollama", "Prompt Engineering"],
    color: "border-violet-500/40 bg-violet-500/5",
    iconColor: "text-violet-400",
    barColor: "bg-violet-500",
  },
  {
    label: "Frontend",
    icon: Globe,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    color: "border-sky-500/40 bg-sky-500/5",
    iconColor: "text-sky-400",
    barColor: "bg-sky-500",
  },
  {
    label: "Backend",
    icon: Layers,
    items: ["Java Spring Boot", "Node.js", "Python FastAPI", "PostgreSQL"],
    color: "border-emerald-500/40 bg-emerald-500/5",
    iconColor: "text-emerald-400",
    barColor: "bg-emerald-500",
  },
  {
    label: "Infrastructure",
    icon: Database,
    items: ["Docker", "Linux", "Redis", "GitHub Actions"],
    color: "border-amber-500/40 bg-amber-500/5",
    iconColor: "text-amber-400",
    barColor: "bg-amber-500",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          SECTION 1 — Hero (Spline 3D Scene)
          ═══════════════════════════════════════════ */}
      <SplineHero />

      {/* ═══════════════════════════════════════════
          SECTION 2 — About Blurb
          ═══════════════════════════════════════════ */}
      <section className="container-page py-20 sm:py-28">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">whoami</span>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[rgb(var(--color-text-secondary))]">
              我是 Kyle，一名全栈开发者。在 Web 工程与 AI 应用的交汇处工作，
              相信技术的力量在于将创意变为现实。这里记录了我的思考、项目与实验。
            </p>
            <div className="mt-8 flex items-center justify-center gap-2">
              <a
                href="https://github.com/kyle-sun"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target rounded-lg text-[rgb(var(--color-text-tertiary))] transition-colors hover:text-[rgb(var(--color-text-primary))]"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com/kyle_sun"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target rounded-lg text-[rgb(var(--color-text-tertiary))] transition-colors hover:text-[rgb(var(--color-text-primary))]"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:kyle@kspace.dev"
                className="touch-target rounded-lg text-[rgb(var(--color-text-tertiary))] transition-colors hover:text-[rgb(var(--color-text-primary))]"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — Featured Work
          ═══════════════════════════════════════════ */}
      <section className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))] py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <span className="section-label">featured</span>
              <h2 className="section-title mt-2">精选项目</h2>
            </ScrollReveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {featuredProjects.map((project, i) => {
                const isFirst = i === 0;
                return (
                  <ScrollReveal key={project.slug} delay={i * 100}>
                    <Link
                      href={project.path}
                      className={`card-hover group block h-full ${
                        isFirst ? "sm:col-span-2" : ""
                      }`}
                    >
                      {/* Status badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                            project.status === "active"
                              ? "text-emerald-500 bg-emerald-500/10"
                              : project.status === "completed"
                                ? "text-sky-500 bg-sky-500/10"
                                : "text-[rgb(var(--color-text-tertiary))] bg-[rgb(var(--color-bg-tertiary))]"
                          }`}
                        >
                          {project.status === "active"
                            ? "进行中"
                            : project.status === "completed"
                              ? "已完成"
                              : "已归档"}
                        </span>
                        {project.links.github && (
                          <span className="text-xs text-[rgb(var(--color-text-tertiary))]">
                            {project.tags.slice(0, 3).join(" · ")}
                          </span>
                        )}
                      </div>

                      {/* Title + Description */}
                      <h3 className="text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-[rgb(var(--color-accent))]">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Read more */}
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[rgb(var(--color-accent))] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5">
                        查看详情
                        <ArrowRight size={14} />
                      </span>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* View all link */}
            <ScrollReveal delay={300}>
              <div className="mt-8 text-center">
                <Link
                  href="/projects"
                  className="btn-ghost text-sm"
                >
                  查看全部项目
                  <ChevronRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — Latest Writing
          ═══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <span className="section-label">writing</span>
              <h2 className="section-title mt-2">最新文章</h2>
            </ScrollReveal>

            <div className="mt-10 divide-y divide-[rgb(var(--color-border))]">
              {latestPosts.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 80}>
                  <Link
                    href={post.path}
                    className="group flex items-start gap-6 py-5 -mx-2 px-2 rounded-xl transition-colors hover:bg-[rgb(var(--color-bg-secondary))]"
                  >
                    <div className="hidden sm:block font-mono text-xs text-[rgb(var(--color-text-tertiary))] mt-1 tabular-nums min-w-[4.5rem]">
                      {formatDate(post.date.toString())}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold leading-snug transition-colors group-hover:text-[rgb(var(--color-accent))]">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="sm:hidden text-xs text-[rgb(var(--color-text-tertiary))] font-mono">
                          {formatDate(post.date.toString())}
                        </span>
                        <span className="text-xs text-[rgb(var(--color-text-tertiary))]">
                          {readingTime(post.code)} min read
                        </span>
                        <span className="text-xs text-[rgb(var(--color-text-tertiary))]">
                          {post.tags.slice(0, 2).join(" · ")}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="shrink-0 mt-1.5 text-[rgb(var(--color-text-tertiary))] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
                    />
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={200}>
              <div className="mt-8 text-center">
                <Link href="/blog" className="btn-primary text-sm">
                  浏览全部文章
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — Skills Architecture
          ═══════════════════════════════════════════ */}
      <section className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))] py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <span className="section-label">stack</span>
              <h2 className="section-title mt-2">技术栈架构</h2>
              <p className="section-subtitle">
                从基础设施到 AI 应用层的全栈能力
              </p>
            </ScrollReveal>

            <div className="mt-12 space-y-4">
              {STACK_LAYERS.map((layer, i) => (
                <ScrollReveal key={layer.label} delay={i * 100}>
                  <div
                    className={`rounded-2xl border ${layer.color} p-5`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${layer.color.replace("border-", "bg-").replace("/40", "/20")}`}
                      >
                        <layer.icon size={16} className={layer.iconColor} />
                      </div>
                      <h3 className="text-sm font-semibold">{layer.label}</h3>
                      <div className={`flex-1 h-0.5 rounded-full ${layer.barColor} opacity-20`} />
                    </div>
                    <div className="flex flex-wrap gap-1.5 ml-11">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-secondary))]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — CTA
          ═══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="container-page text-center">
          <ScrollReveal>
            <span className="section-label">contact</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
              有项目或想法？
            </h2>
            <p className="mt-3 text-[rgb(var(--color-text-secondary))] max-w-md mx-auto">
              欢迎交流技术、合作项目，或只是打个招呼。
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <a href="mailto:kyle@kspace.dev" className="btn-primary">
                <Mail size={16} />
                联系我
              </a>
              <Link href="/about" className="btn-ghost">
                了解更多
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
