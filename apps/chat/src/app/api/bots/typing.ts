import { z } from "zod";

import type {
  ChatCompletionResponseMessage,
  CreateChatCompletionResponse,
} from "openai";
import { Model } from "@/store/setting/typing";

export type ChatRequest = {
  model?: Model;
  conversation: ChatCompletionResponseMessage[];
  stream?: boolean;
};

export type ChatReponse = CreateChatCompletionResponse;

const chatRole = z.enum(["assistant", "system", "user"]);
const gptModel = z.enum(["gpt-3.5-turbo", "gpt-4"]);
const otherModel = z.enum(["new-bing"]);
const chatRecord = z.object({
  role: chatRole,
  content: z.string(),
});
export const postPayload = z.object({
  conversation: chatRecord.array().nonempty(),
  maxTokens: z.number().optional(),
  model: gptModel || otherModel,
});
