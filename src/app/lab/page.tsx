import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Sliders, Code, Sparkles, ArrowRight, FlaskConical } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "AI Lab",
  description: "AI 实验与互动探索空间",
};

const EXPERIMENTS = [
  {
    href: "/lab/chat",
    label: "AI Chat",
    description: "与大语言模型实时对话，测试 Prompt 和模型能力",
    icon: MessageCircle,
    color: "text-brand-500",
    bgColor: "bg-brand-500/10",
    status: "可用",
  },
  {
    href: "/lab/playground",
    label: "Prompt Playground",
    description: "调节温度、长度等参数，观察模型输出变化",
    icon: Sliders,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    status: "可用",
  },
  {
    href: "/lab/code-gen",
    label: "Code Generator",
    description: "用自然语言描述需求，AI 自动生成代码",
    icon: Code,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    status: "可用",
  },
];

export default function LabPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      {/* Header */}
      <div className="mx-auto max-w-2xl mb-12">
        <span className="section-label">experiments</span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">AI Lab</h1>
        <p className="mt-3 text-lg text-[rgb(var(--color-text-secondary))]">
          AI 实验与互动探索空间
        </p>
        <p className="mt-2 text-sm text-[rgb(var(--color-text-tertiary))]">
          需要配置 <code className="font-mono text-xs bg-[rgb(var(--color-bg-tertiary))] px-1.5 py-0.5 rounded">OPENAI_API_KEY</code> 环境变量
        </p>
      </div>

      {/* Experiment Cards */}
      <div className="mx-auto max-w-2xl grid gap-4 sm:grid-cols-3">
        {EXPERIMENTS.map((exp, i) => (
          <ScrollReveal key={exp.href} delay={i * 100}>
            <Link href={exp.href} className="card-hover group block h-full">
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${exp.bgColor} ${exp.color}`}
                >
                  <exp.icon size={20} />
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                  {exp.status}
                </span>
              </div>
              <h3 className="font-semibold">{exp.label}</h3>
              <p className="mt-1.5 text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed">
                {exp.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[rgb(var(--color-accent))] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5">
                打开
                <ArrowRight size={14} />
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* Coming soon */}
      <div className="mx-auto mt-16 max-w-2xl">
        <span className="section-label">coming soon</span>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="card opacity-60">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-violet-500" />
              <h3 className="text-sm font-semibold">RAG Demo</h3>
            </div>
            <p className="text-xs text-[rgb(var(--color-text-tertiary))]">
              文档检索增强生成——上传 PDF，提问获取答案
            </p>
          </div>
          <div className="card opacity-60">
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical size={14} className="text-rose-500" />
              <h3 className="text-sm font-semibold">Image Analysis</h3>
            </div>
            <p className="text-xs text-[rgb(var(--color-text-tertiary))]">
              图片分析——上传图片，AI 识别和描述内容
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
