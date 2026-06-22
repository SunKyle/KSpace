import Link from "next/link";
import { ArrowRight, Code2, FileText, FlaskConical, Layers } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";

const QUICK_LINKS = [
  {
    href: "/blog",
    label: "博客",
    description: "分享技术思考与实践经验",
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
    description: "AI 实验与互动探索空间",
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
      <section className="container-wide pb-24 pt-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="card-hover group">
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${link.bgColor} ${link.color}`}
              >
                <link.icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold">{link.label}</h3>
              <p className="mt-1.5 text-sm text-[rgb(var(--color-text-secondary))]">
                {link.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[rgb(var(--color-accent))] opacity-0 transition-opacity group-hover:opacity-100">
                探索
                <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))] py-20">
        <div className="container-page text-center">
          <h2 className="section-title">技术栈</h2>
          <p className="section-subtitle mb-10">
            持续学习和使用中的技术
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card-bg))] px-4 py-2 text-sm font-medium text-[rgb(var(--color-text-secondary))] transition-all hover:border-[rgb(var(--color-accent))] hover:text-[rgb(var(--color-accent))]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
