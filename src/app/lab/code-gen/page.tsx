import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CodeGenBox } from "@/components/lab/CodeGenBox";

export const metadata: Metadata = {
  title: "Code Generator",
  description: "用自然语言描述需求，AI 自动生成代码",
};

export default function CodeGenPage() {
  return (
    <div className="container-page py-12">
      <Link
        href="/lab"
        className="inline-flex items-center gap-1 text-sm text-[rgb(var(--color-text-tertiary))] transition-colors hover:text-[rgb(var(--color-accent))] mb-6"
      >
        <ArrowLeft size={14} />
        返回 AI Lab
      </Link>

      <div className="mx-auto max-w-2xl mb-8">
        <span className="section-label">generate</span>
        <h1 className="text-2xl font-bold tracking-tight">Code Generator</h1>
        <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
          用自然语言描述需求，AI 自动生成代码。选择语言并描述你想要的程序。
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <CodeGenBox />
      </div>
    </div>
  );
}
