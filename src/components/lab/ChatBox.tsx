"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Send, User, Bot, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { streamChat, type ChatMessage } from "@/lib/ai-client";

interface ChatBoxProps {
  initialPrompt?: string;
  placeholder?: string;
}

export function ChatBox({ initialPrompt, placeholder = "输入消息..." }: ChatBoxProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const showWelcome = messages.length === 0;

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

      controllerRef.current = streamChat(
        newMessages.filter((m) => m.content.length > 0 || m.role === "user").map((m) => ({
          role: m.role,
          content: m.role === "assistant" && m.content === "" ? "" : m.content,
        })),
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
        { temperature: 0.7, maxOutputTokens: 2048 }
      );
    },
    [messages, isLoading]
  );

  // Auto-submit initial prompt
  const promptSubmitted = useRef(false);
  useEffect(() => {
    if (initialPrompt && !promptSubmitted.current && messages.length === 0) {
      promptSubmitted.current = true;
      send(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

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
    <div className="flex flex-col h-[600px] max-h-[70vh] rounded-2xl border border-[rgb(var(--color-card-border))] bg-[rgb(var(--color-card-bg))] overflow-hidden">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {showWelcome && (
          <div className="text-center text-sm text-[rgb(var(--color-text-secondary))] py-8">
            <Bot size={28} className="mx-auto mb-3 text-brand-500" />
            <p>你好！我是 KSpace AI 助手。</p>
            <p className="text-[rgb(var(--color-text-tertiary))] mt-1">
              可以帮你解答技术问题、生成代码、或进行头脑风暴。
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-3",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === "assistant" && (
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500/10 flex items-center justify-center mt-1">
                <Bot size={14} className="text-brand-500" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-[rgb(var(--color-accent))] text-white"
                  : "bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-text-primary))]"
              )}
            >
              <p className="whitespace-pre-wrap">
                {msg.content || (msg.role === "assistant" && isLoading ? "..." : msg.content)}
              </p>
            </div>
            {msg.role === "user" && (
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[rgb(var(--color-accent))] flex items-center justify-center mt-1">
                <User size={14} className="text-white" />
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator (before first token) */}
        {isLoading && messages.length > 0 && messages[messages.length - 1].content === "" && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500/10 flex items-center justify-center mt-1">
              <Loader2 size={14} className="text-brand-500 animate-spin" />
            </div>
            <div className="bg-[rgb(var(--color-bg-tertiary))] rounded-2xl px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400/60 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400/60 animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400/60 animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 justify-center text-sm text-red-500 bg-red-500/5 rounded-xl p-3">
            <AlertCircle size={14} />
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-[rgb(var(--color-card-border))] p-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
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
  );
}
