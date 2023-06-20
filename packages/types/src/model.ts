import { z } from "zod";

import type {
  ChatCompletionResponseMessage,
  CreateChatCompletionResponse,
} from "openai";

export namespace BotType {
  export type Model = "gpt-3.5-turbo" | "gpt-4" | "newbing";
  export const gptModel = z.enum(["gpt-3.5-turbo", "gpt-4"]);
  export const otherModel = z.enum(["new-bing"]);

  export type ChatRequest = {
    model?: Model;
    conversation: ChatCompletionResponseMessage[];
    stream?: boolean;
  };

  export type ChatResponse = CreateChatCompletionResponse;

  const chatRole = z.enum(["assistant", "system", "user"]);

  const chatRecord = z.object({
    role: chatRole,
    content: z.string(),
  });
  export const postPayload = z.object({
    messages: chatRecord.array().nonempty(),
    // maxTokens: z.number().optional(),
    stream: z.boolean(),
    model: gptModel.or(otherModel),
    temperature: z.number().optional(),
    presence_penalty: z.number().optional(),
    frequency_penalty: z.number().optional(),
  });
}
