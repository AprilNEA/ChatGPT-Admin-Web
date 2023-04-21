import { z } from "zod";

const chatRole = z.enum(["assistant", "system", "user"]);
const gptModel = z.enum(["gpt-3.5-turbo", "gpt-4", "newbing"]);
const chatRecord = z.object({
  role: chatRole,
  content: z.string(),
});
export const postPayload = z.object({
  conversation: chatRecord.array().nonempty(),
  maxTokens: z.number().optional(),
  model: gptModel,
});
