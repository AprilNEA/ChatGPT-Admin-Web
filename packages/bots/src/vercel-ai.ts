import { AbstractBot } from "./abstract-bot";
import { AnswerParams, VercelAIModel, VercelAIPayload } from "./types";
import { chatRecordsToString, GPT_DEFAULT_SYSTEM_MESSAGE } from "./prompt";
import { streamToLineIterator } from "./utils";

const REQUEST_URL = "https://play.vercel.ai/api/generate";

async function* generate(model: VercelAIModel, {
  conversation,
  maxTokens = 1000,
  signal,
}: AnswerParams) {
  const payload: Required<VercelAIPayload> = {
    model,
    prompt: chatRecordsToString(conversation, GPT_DEFAULT_SYSTEM_MESSAGE),
    maxTokens,
    frequencyPenalty: 0,
    presencePenalty: 0,
    stopSequences: [],
    temperature: 0.7,
    topK: 1,
    topP: 1,
  };

  const response = await fetch(REQUEST_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  for await (const line of streamToLineIterator(response.body!)) {
    if (line) yield JSON.parse(line);
  }
}

export class VercelGPT3Bot extends AbstractBot {
  protected override doAnswer = (params: AnswerParams) =>
    generate("openai:gpt-3.5-turbo", params);
}

export class VercelGPT4Bot extends AbstractBot {
  protected override doAnswer = (params: AnswerParams) =>
    generate("openai:gpt-4", params);
}
