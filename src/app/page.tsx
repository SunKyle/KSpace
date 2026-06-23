import Link from "next/link";
import { ArrowRight, Code2, FileText, FlaskConical, Layers, Terminal } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const QUICK_LINKS = [
  {
    href: "/blog",
    label: "博客",
    description: "技术思考与实践分享",
    icon: FileText,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    href: "/projects",
    label: "项目",
    description: "开源项目与深度案例展示",
    icon: Layers,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    href: "/lab",
    label: "AI Lab",
    description: "AI 实验与互动探索",
    icon: FlaskConical,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    href: "/about",
    label: "关于",
    description: "了解我的技能与经历",
    icon: Code2,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
];

const SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Java",
  "Python",
  "PostgreSQL",
  "AI/LLM",
  "Docker",
];

export default function HomePage() {
  return (
    <>
      {/* Hero with Gooey Pixel Trail */}
      <HeroSection />

      {/* Quick Entry Cards */}
      <section className="container-wide pb-20 pt-16">
        <div className="text-center mb-10">
          <span className="section-label">explore</span>
          <h2 className="text-xl font-bold tracking-tight">探索 KSpace</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((link, i) => (
            <ScrollReveal key={link.href} delay={i * 80}>
              <Link href={link.href} className="card-hover group block h-full">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${link.bgColor} ${link.color}`}
                >
                  <link.icon size={20} />
                </div>
                <h3 className="mt-4 font-semibold text-[rgb(var(--color-text-primary))]">
                  {link.label}
                </h3>
                <p className="mt-1.5 text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed">
                  {link.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[rgb(var(--color-accent))] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5">
                  进入
                  <ArrowRight size={14} />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))] py-20">
        <div className="container-page text-center">
          <span className="section-label">stack</span>
          <h2 className="section-title">技术栈</h2>
          <p className="section-subtitle mb-10">
            持续学习和使用中的技术
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card-bg))] px-3.5 py-2 text-sm font-medium text-[rgb(var(--color-text-secondary))] transition-all hover:border-[rgb(var(--color-accent))]/30 hover:text-[rgb(var(--color-accent))] hover:shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Recent posts teaser */}
      <section className="container-page py-20 text-center">
        <span className="section-label">latest</span>
        <h2 className="section-title">最新文章</h2>
        <p className="section-subtitle mb-8">
          技术思考与实践记录
        </p>
        <Link href="/blog" className="btn-primary">
          <Terminal size={16} />
          浏览博客
          <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
