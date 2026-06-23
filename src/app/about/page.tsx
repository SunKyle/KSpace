import type { Metadata } from "next";
import { MapPin, Briefcase, GraduationCap, Github, Twitter, Mail, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "关于我",
  description: "了解我的技能、经历与技术背景",
};

const EXPERIENCE = [
  {
    period: "2024 — 至今",
    role: "全栈开发工程师",
    company: "某科技公司",
    description: "负责核心业务系统的全栈架构设计与开发，主导 AI 相关功能的落地。",
  },
  {
    period: "2022 — 2024",
    role: "前端开发工程师",
    company: "某互联网公司",
    description: "参与大型前端项目开发，专注于 React 生态与前端工程化。",
  },
];

const EDUCATION = [
  {
    period: "2018 — 2022",
    degree: "计算机科学与技术 本科",
    school: "某大学",
  },
];

const SKILLS_GROUPED = {
  "前端框架": ["React", "Next.js", "Vue", "Tailwind CSS"],
  "后端技术": ["Java Spring Boot", "Node.js", "Python FastAPI"],
  "数据库": ["PostgreSQL", "MySQL", "Redis"],
  "AI / LLM": ["LangChain", "Ollama", "RAG", "Prompt Engineering"],
  "DevOps": ["Docker", "Linux", "GitHub Actions", "Vercel"],
};

export default function AboutPage() {
  return (
    <div className="container-page py-16 sm:py-24">
      {/* Header */}
      <div className="mx-auto max-w-2xl">
        <span className="section-label">about</span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          你好，我是 Kyle
        </h1>
        <p className="mt-3 text-lg text-[rgb(var(--color-text-secondary))] leading-relaxed">
          全栈开发者，专注于 Web 全栈与 AI/LLM 应用。
        </p>
      </div>

      {/* Contact row */}
      <div className="mx-auto mt-8 flex flex-wrap items-center gap-4 text-sm text-[rgb(var(--color-text-secondary))]">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgb(var(--color-bg-tertiary))]">
          <MapPin size={14} />
          北京
        </span>
        <a
          href="https://github.com/kyle-sun"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgb(var(--color-bg-tertiary))] transition-colors hover:bg-[rgb(var(--color-accent))]/10 hover:text-[rgb(var(--color-accent))]"
        >
          <Github size={14} />
          GitHub
          <ArrowUpRight size={11} />
        </a>
        <a
          href="https://twitter.com/kyle_sun"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgb(var(--color-bg-tertiary))] transition-colors hover:bg-[rgb(var(--color-accent))]/10 hover:text-[rgb(var(--color-accent))]"
        >
          <Twitter size={14} />
          Twitter
          <ArrowUpRight size={11} />
        </a>
        <a
          href="mailto:kyle@kspace.dev"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgb(var(--color-bg-tertiary))] transition-colors hover:bg-[rgb(var(--color-accent))]/10 hover:text-[rgb(var(--color-accent))]"
        >
          <Mail size={14} />
          Email
        </a>
      </div>

      {/* Bio — with pull quote */}
      <div className="mx-auto mt-14 max-w-2xl">
        <div className="space-y-4 text-[rgb(var(--color-text-secondary))] leading-relaxed text-[15px]">
          <p>
            我相信技术的力量在于它能将创意变为现实——这也是我持续学习和构建的动力。
            目前专注于深耕前后端全栈技术栈，同时在 AI 应用开发和开源项目上投入时间。
          </p>
          <div className="border-l-2 border-[rgb(var(--color-accent))] pl-4 py-1 my-6">
            <p className="text-[rgb(var(--color-text-primary))] text-base font-medium">
              这个网站是我技术旅程的记录——分享思考、展示项目、探索实验。
            </p>
          </div>
          <p>
            工作之余，我喜欢研究新的技术趋势、写技术博客、参与开源社区，
            以及探索 AI 在各类场景中的应用可能性。如果你对技术有同样的热情，欢迎交流。
          </p>
        </div>
      </div>

      {/* Experience */}
      <section className="mx-auto mt-20 max-w-2xl">
        <span className="section-label">career</span>
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Briefcase size={18} className="text-[rgb(var(--color-accent))]" />
          工作经历
        </h2>
        <div className="mt-8 space-y-0">
          {EXPERIENCE.map((exp) => (
            <div
              key={exp.period}
              className="relative pl-8 pb-8 border-l-2 border-[rgb(var(--color-border))] last:border-transparent last:pb-0"
            >
              <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[rgb(var(--color-accent))] ring-4 ring-[rgb(var(--color-bg-primary))]" />
              <span className="text-xs font-medium text-[rgb(var(--color-accent))] font-mono tracking-wide">
                {exp.period}
              </span>
              <h3 className="mt-1 font-semibold text-[rgb(var(--color-text-primary))]">
                {exp.role}
              </h3>
              <p className="text-sm text-[rgb(var(--color-text-tertiary))]">
                {exp.company}
              </p>
              <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto mt-16 max-w-2xl">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <GraduationCap size={18} className="text-[rgb(var(--color-accent))]" />
          教育
        </h2>
        <div className="mt-6">
          {EDUCATION.map((edu) => (
            <div key={edu.period} className="card">
              <span className="text-xs font-medium text-[rgb(var(--color-accent))] font-mono tracking-wide">
                {edu.period}
              </span>
              <h3 className="mt-1 font-semibold">{edu.degree}</h3>
              <p className="text-sm text-[rgb(var(--color-text-tertiary))]">
                {edu.school}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto mt-16 max-w-2xl">
        <span className="section-label">stack</span>
        <h2 className="text-xl font-bold">技术栈</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {Object.entries(SKILLS_GROUPED).map(([category, skills]) => (
            <div key={category} className="card">
              <h3 className="text-xs font-semibold text-[rgb(var(--color-text-tertiary))] uppercase tracking-wider">
                {category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md bg-[rgb(var(--color-bg-tertiary))] px-2.5 py-1 text-xs font-medium text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-accent))]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
