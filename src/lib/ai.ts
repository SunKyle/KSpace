import { createOpenAI } from "@ai-sdk/openai";

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  return createOpenAI({ apiKey });
}

export const AI_MODELS = {
  fast: "gpt-4o-mini",
  capable: "gpt-4o",
  reasoning: "o3-mini",
} as const;

export type AIModel = keyof typeof AI_MODELS;
