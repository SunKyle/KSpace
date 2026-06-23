import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ChatBox } from "@/components/lab/ChatBox";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "与大语言模型实时对话",
};

export default function ChatPage() {
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
        <span className="section-label">chat</span>
        <h1 className="text-2xl font-bold tracking-tight">AI Chat</h1>
        <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
          与大语言模型实时对话。系统提示词被预设为技术助手角色。
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <ChatBox placeholder="输入技术问题，比如：解释 React Server Components..." />
      </div>
    </div>
  );
}
