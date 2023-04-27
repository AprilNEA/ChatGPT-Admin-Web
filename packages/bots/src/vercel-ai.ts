import { AbstractBot } from "./abstract-bot";
import { AnswerParams, VercelAIModel, VercelAIPayload } from "./types";
import {
  chatRecordsToString,
  GPT3_DEFAULT_SYSTEM_MESSAGE,
  GPT4_DEFAULT_SYSTEM_MESSAGE,
} from "./prompt";
import { streamToLineIterator } from "./utils";

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
  maxTokens = 511,
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

  const headers: Record<string, string> = {
    Accept: "*/*",
    "Content-Type": "application/json",
    "User-Agent": `Mozilla/5.0 ${Math.random()}`,
    Referer: "https://play.vercel.ai/",
    Origin: "https://play.vercel.ai",
  };

  headers["Custom-Encoding"] = await fetch(
    "https://play.vercel.ai/openai.jpeg",
    { signal },
  )
    .then((res) => res.text())
    .then(atob)
    .then(JSON.parse)
    .then(({ t, c, a }) => ({ t, r: eval(`(${c})`)(a) }))
    .then(JSON.stringify)
    .then(btoa);

  const response = await fetch(
    "https://play.vercel.ai/api/generate",
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers,
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(`${response.statusText}: ${await response.text()}`);
  }

  for await (const line of streamToLineIterator(response.body!)) {
    if (line) yield JSON.parse(line);
  }
}

export class VercelAIBot extends AbstractBot {
  constructor(private model: VercelAIModel) {
    super();
  }

  protected override doAnswer(params: AnswerParams) {
    return generate({ ...params, model: this.model });
  }
}
