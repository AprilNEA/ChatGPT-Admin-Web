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

const BASE_URL = "https://sdk.vercel.ai";

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
    "Custom-Encoding": await getCustomEncoding(),
  };

  const response = await fetch(BASE_URL + "/api/generate", {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal,
  });

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

async function getCustomEncoding() {
  const response = await fetch(`${BASE_URL}/openai.jpeg`),
    text = await response.text(),
    json = fromBinary(text),
    { c, a, t } = JSON.parse(json),
    r = eval(`(globalThis)=>${c}`)({
      ...globalThis,
      marker: "mark",
      Deno: undefined,
      process: undefined,
    })(a);
  return toBinary(JSON.stringify({ r, t }));
}

function fromBinary(t: string) {
  const a = atob(t),
    o = new Uint8Array(a.length);
  for (let t = 0; t < o.length; t++) {
    o[t] = a.charCodeAt(t);
  }
  return String.fromCharCode(...new Uint16Array(o.buffer));
}

function toBinary(t: string) {
  const a = new Uint16Array(t.length);
  for (let o = 0; o < a.length; o++) {
    a[o] = t.charCodeAt(o);
  }
  return btoa(String.fromCharCode(...new Uint8Array(a.buffer)));
}
