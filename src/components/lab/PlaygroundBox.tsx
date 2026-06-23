"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, Loader2, Sliders, Sparkles, AlertCircle } from "lucide-react";
import { streamChat, type ChatMessage } from "@/lib/ai-client";

export function PlaygroundBox() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(
    (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: ChatMessage = { role: "user", content: text.trim() };
      const assistantMsg: ChatMessage = { role: "assistant", content: "" };
      const newMessages = [...messages, userMsg, assistantMsg];
      setMessages(newMessages);
      setInput("");
      setError(null);
      setIsLoading(true);

      streamChat(
        newMessages.filter((m) => m.content !== "" || m.role === "user"),
        {
          onToken(token) {
            setMessages((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              if (last && last.role === "assistant") {
                next[next.length - 1] = { ...last, content: last.content + token };
              }
              return next;
            });
          },
          onDone() {
            setIsLoading(false);
          },
          onError(err) {
            setError(err.message);
            setIsLoading(false);
          },
        },
        { temperature, maxOutputTokens: maxTokens, model: "fast" }
      );
    },
    [messages, isLoading, temperature, maxTokens]
  );

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="space-y-6">
      {/* Parameters */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card space-y-2">
          <label className="text-xs font-semibold text-[rgb(var(--color-text-secondary))] uppercase tracking-wider flex items-center gap-1.5">
            <Sliders size={13} />
            Temperature: {temperature.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-[rgb(var(--color-accent))]"
          />
          <div className="flex justify-between text-[10px] text-[rgb(var(--color-text-tertiary))]">
            <span>精确 (0)</span>
            <span>平衡 (1)</span>
            <span>创造 (2)</span>
          </div>
        </div>

        <div className="card space-y-2">
          <label className="text-xs font-semibold text-[rgb(var(--color-text-secondary))] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={13} />
            Max Tokens: {maxTokens}
          </label>
          <input
            type="range"
            min="256"
            max="4096"
            step="128"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            className="w-full accent-[rgb(var(--color-accent))]"
          />
          <div className="flex justify-between text-[10px] text-[rgb(var(--color-text-tertiary))]">
            <span>简短 (256)</span>
            <span>中等</span>
            <span>长篇 (4096)</span>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="card overflow-hidden p-0">
        <div ref={scrollRef} className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-sm text-[rgb(var(--color-text-tertiary))]">
              输入提示词开始实验...
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 text-sm ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center mt-0.5">
                  <Bot size={12} className="text-brand-500" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[rgb(var(--color-accent))] text-white"
                    : "bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-text-primary))]"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content || "..."}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2">
              <Loader2 size={14} className="text-brand-500 animate-spin mt-1" />
              <span className="text-sm text-[rgb(var(--color-text-tertiary))]">生成中...</span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 justify-center text-sm text-red-500 bg-red-500/5 rounded-xl p-3">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-[rgb(var(--color-card-border))] p-3 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入提示词..."
            disabled={isLoading}
            className="flex-1 rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))] px-4 py-2.5 text-sm placeholder:text-[rgb(var(--color-text-tertiary))] outline-none transition-colors focus:border-[rgb(var(--color-accent))] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-[rgb(var(--color-accent))] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[rgb(var(--color-accent-hover))] disabled:opacity-40 active:scale-95"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
