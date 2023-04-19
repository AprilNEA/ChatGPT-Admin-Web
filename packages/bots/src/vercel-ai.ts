import { AbstractBot } from "./abstract-bot";
import { AnswerParams, VercelAIModel, VercelAIPayload } from "./types";
import {
  chatRecordsToString,
  GPT3_DEFAULT_SYSTEM_MESSAGE,
  GPT4_DEFAULT_SYSTEM_MESSAGE,
} from "./prompt";
import { streamToLineIterator } from "./utils";

const REQUEST_URL = "https://play.vercel.ai/api/generate";

const SYSTEM_MESSAGES: Record<VercelAIModel, string> = {
  "openai:gpt-3.5-turbo": GPT3_DEFAULT_SYSTEM_MESSAGE,
  "openai:gpt-4": GPT4_DEFAULT_SYSTEM_MESSAGE,
};

interface VercelAIGenerateParams extends AnswerParams {
  model: VercelAIModel;
}

async function* generate({
  model,
  conversation,
  maxTokens = 1000,
  signal,
}: VercelAIGenerateParams) {
  const payload: VercelAIPayload = {
    model,
    prompt: chatRecordsToString(conversation, SYSTEM_MESSAGES[model]),
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
    throw new Error(`Request failed: ${response.statusText}`);
  }

  for await (const line of streamToLineIterator(response.body!)) {
    if (line) yield JSON.parse(line);
  }
}

abstract class AbstractVercelBot extends AbstractBot {
  protected abstract model: VercelAIModel;

  protected override doAnswer = (params: AnswerParams) =>
    generate({ model: this.model, ...params });
}

export class VercelGPT3Bot extends AbstractVercelBot {
  protected override model: VercelAIModel = "openai:gpt-3.5-turbo";
}

export class VercelGPT4Bot extends AbstractVercelBot {
  protected override model: VercelAIModel = "openai:gpt-4";
}
