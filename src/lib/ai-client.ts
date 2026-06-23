export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface StreamCallbacks {
  onToken: (token: string) => void;
  onDone: () => void;
  onError: (error: Error) => void;
}

export function streamChat(
  messages: ChatMessage[],
  callbacks: StreamCallbacks,
  body?: Record<string, unknown>
): AbortController {
  const controller = new AbortController();

  fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, ...body }),
    signal: controller.signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || `HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        callbacks.onToken(decoder.decode(value, { stream: true }));
      }
      callbacks.onToken(decoder.decode()); // flush remaining
      callbacks.onDone();
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        callbacks.onError(error);
      }
    });

  return controller;
}
