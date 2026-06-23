"use client";

import { useState, useRef, useCallback } from "react";
import { Code, Copy, Check, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { streamChat, type ChatMessage } from "@/lib/ai-client";

const LANGUAGES = [
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "sql", label: "SQL" },
];

const EXAMPLES: Record<string, string> = {
  typescript: "写一个异步并发控制函数，限制最大并发数为 5",
  python: "写一个 FastAPI 路由，实现文件上传并返回文件哈希",
  java: "写一个线程安全的 LRU 缓存实现",
  rust: "写一个读取 JSON 文件并解析为 struct 的函数",
  go: "写一个 HTTP 中间件，记录请求耗时和状态码",
  sql: "写一个查询，找出每个部门工资最高的前 3 名员工",
};

export function CodeGenBox() {
  const [language, setLanguage] = useState("typescript");
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const systemPrompt = `你是一个精通${LANGUAGES.find((l) => l.value === language)?.label}的编程专家。用户会描述需求，你只输出代码和简要注释，不要解释。代码要完整、可运行、遵循最佳实践。`;

  const generate = useCallback(
    (userInput: string) => {
      if (!userInput.trim() || isLoading) return;

      const messages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput.trim() },
      ];
      setCode("");
      setError(null);
      setIsLoading(true);

      streamChat(
        messages,
        {
          onToken(token) {
            setCode((prev) => prev + token);
          },
          onDone() {
            setIsLoading(false);
            setTimeout(() => {
              resultRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          },
          onError(err) {
            setError(err.message);
            setIsLoading(false);
          },
        },
        { temperature: 0.3, maxOutputTokens: 2048, model: "fast" }
      );
    },
    [systemPrompt, isLoading]
  );

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    generate(input);
  }

  function handleCopy() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function useExample() {
    const example = EXAMPLES[language];
    if (example) {
      setInput(example);
    }
  }

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="card">
        <label className="text-xs font-semibold text-[rgb(var(--color-text-secondary))] uppercase tracking-wider flex items-center gap-1.5 mb-3">
          <Code size={13} />
          语言
        </label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={cn(
                "text-sm font-medium px-3 py-1.5 rounded-lg border transition-all",
                language === lang.value
                  ? "border-[rgb(var(--color-accent))] bg-[rgb(var(--color-accent))]/10 text-[rgb(var(--color-accent))]"
                  : "border-[rgb(var(--color-border))] text-[rgb(var(--color-text-secondary))] hover:border-[rgb(var(--color-accent))]/30"
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <button
          onClick={useExample}
          className="mt-3 text-xs text-[rgb(var(--color-text-tertiary))] transition-colors hover:text-[rgb(var(--color-accent))]"
        >
          使用示例 →
        </button>
      </div>

      {/* Input */}
      <form onSubmit={handleGenerate} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`描述你想要的 ${LANGUAGES.find((l) => l.value === language)?.label} 代码...`}
          disabled={isLoading}
          className="flex-1 rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))] px-4 py-2.5 text-sm placeholder:text-[rgb(var(--color-text-tertiary))] outline-none transition-colors focus:border-[rgb(var(--color-accent))]"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex items-center gap-1.5 rounded-xl bg-[rgb(var(--color-accent))] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[rgb(var(--color-accent-hover))] disabled:opacity-40 active:scale-95"
        >
          <Sparkles size={14} />
          生成
        </button>
      </form>

      {/* Loading */}
      {isLoading && (
        <div className="card flex items-center gap-3 text-sm text-[rgb(var(--color-text-secondary))]">
          <Loader2 size={16} className="text-brand-500 animate-spin" />
          正在生成 {LANGUAGES.find((l) => l.value === language)?.label} 代码...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/5 rounded-xl p-4">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {/* Generated Code */}
      {code && !isLoading && (
        <div className="card overflow-hidden p-0" ref={resultRef}>
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--color-card-border))] bg-[rgb(var(--color-bg-secondary))]">
            <span className="text-xs font-medium text-[rgb(var(--color-text-tertiary))]">
              生成的 {LANGUAGES.find((l) => l.value === language)?.label} 代码
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-[rgb(var(--color-text-tertiary))] transition-colors hover:text-[rgb(var(--color-accent))]"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-500" />
                  已复制
                </>
              ) : (
                <>
                  <Copy size={13} />
                  复制
                </>
              )}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono text-[rgb(var(--color-text-primary))] max-h-[500px] overflow-y-auto">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
