import { streamText } from "ai";
import { getOpenAIClient, AI_MODELS } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { messages, model = "fast", temperature = 0.7, maxOutputTokens = 2048 } =
      await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();
    const modelId = AI_MODELS[model as keyof typeof AI_MODELS] || AI_MODELS.fast;

    const result = streamText({
      model: openai(modelId),
      messages,
      temperature,
      maxOutputTokens,
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    console.error("AI Chat error:", message);

    if (message.includes("API key")) {
      return Response.json(
        { error: "AI service not configured. Set OPENAI_API_KEY." },
        { status: 503 }
      );
    }

    return Response.json({ error: message }, { status: 500 });
  }
}
