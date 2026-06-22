import type { Metadata } from "next";
import { MapPin, Briefcase, GraduationCap, Github, Twitter, Mail } from "lucide-react";

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
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="section-title">关于我</h1>
        <p className="section-subtitle">
          一个热爱技术、持续探索的全栈开发者
        </p>
      </div>

      {/* Bio */}
      <div className="mx-auto mt-12 max-w-2xl space-y-4 text-[rgb(var(--color-text-secondary))] leading-relaxed">
        <p>
          你好，我是 Kyle，一名全栈开发者，专注于 Web 全栈开发和 AI/LLM 应用。
          我相信技术的力量在于它能将创意变为现实，这也是我持续学习和构建的动力。
        </p>
        <p>
          目前我专注于深耕前后端全栈技术栈，同时在 AI 应用开发和开源项目上投入时间。
          这个网站是我技术旅程的记录——分享思考、展示项目、探索实验。
        </p>
        <p>
          工作之余，我喜欢研究新的技术趋势、写技术博客、参与开源社区，
          以及探索 AI 在各类场景中的应用可能性。
        </p>
      </div>

      {/* Info Links */}
      <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-[rgb(var(--color-text-secondary))]">
        <span className="inline-flex items-center gap-1">
          <MapPin size={16} /> 北京 / 中国
        </span>
        <a
          href="https://github.com/kyle-sun"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-[rgb(var(--color-accent))]"
        >
          <Github size={16} /> GitHub
        </a>
        <a
          href="https://twitter.com/kyle_sun"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-[rgb(var(--color-accent))]"
        >
          <Twitter size={16} /> Twitter
        </a>
        <a
          href="mailto:kyle@kspace.dev"
          className="inline-flex items-center gap-1 transition-colors hover:text-[rgb(var(--color-accent))]"
        >
          <Mail size={16} /> Email
        </a>
      </div>

      {/* Experience */}
      <section className="mx-auto mt-20 max-w-2xl">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Briefcase size={22} className="text-[rgb(var(--color-accent))]" />
          工作经历
        </h2>
        <div className="mt-8 space-y-8">
          {EXPERIENCE.map((exp) => (
            <div
              key={exp.period}
              className="relative border-l-2 border-[rgb(var(--color-border))] pl-6"
            >
              <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[rgb(var(--color-accent))]" />
              <span className="text-sm font-medium text-[rgb(var(--color-accent))]">
                {exp.period}
              </span>
              <h3 className="mt-1 font-semibold">{exp.role}</h3>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                {exp.company}
              </p>
              <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto mt-16 max-w-2xl">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <GraduationCap size={22} className="text-[rgb(var(--color-accent))]" />
          教育
        </h2>
        <div className="mt-8 space-y-6">
          {EDUCATION.map((edu) => (
            <div key={edu.period} className="card">
              <span className="text-sm font-medium text-[rgb(var(--color-accent))]">
                {edu.period}
              </span>
              <h3 className="mt-1 font-semibold">{edu.degree}</h3>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                {edu.school}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto mt-16 max-w-2xl">
        <h2 className="text-2xl font-bold">技能</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {Object.entries(SKILLS_GROUPED).map(([category, skills]) => (
            <div key={category} className="card">
              <h3 className="text-sm font-semibold text-[rgb(var(--color-accent))]">
                {category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md bg-[rgb(var(--color-bg-tertiary))] px-3 py-1 text-xs font-medium text-[rgb(var(--color-text-secondary))]"
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
