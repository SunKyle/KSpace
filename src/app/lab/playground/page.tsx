import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlaygroundBox } from "@/components/lab/PlaygroundBox";

export const metadata: Metadata = {
  title: "Prompt Playground",
  description: "调节模型参数，观察输出变化",
};

export default function PlaygroundPage() {
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
        <span className="section-label">playground</span>
        <h1 className="text-2xl font-bold tracking-tight">Prompt Playground</h1>
        <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
          调节温度和 Token 上限，观察模型输出如何变化。
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <PlaygroundBox />
      </div>
    </div>
  );
}
