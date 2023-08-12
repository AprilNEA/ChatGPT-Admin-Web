import { AbstractBot } from "./abstract-bot";
import {
  chatRecordsToString,
  GPT3_DEFAULT_SYSTEM_MESSAGE,
  GPT4_DEFAULT_SYSTEM_MESSAGE,
} from "./prompt";
import { AnswerParams, GPTModel, LexPayload } from "./types";
import { streamToLineIterator } from "./utils";

const REQUEST_URL = "https://lex.page/ai/stream";

const SYSTEM_MESSAGES: Record<GPTModel, string> = {
  "gpt-3.5-turbo": GPT3_DEFAULT_SYSTEM_MESSAGE,
  "gpt-4": GPT4_DEFAULT_SYSTEM_MESSAGE,
};

interface LexGenerateParams extends AnswerParams {
  gpt_model: GPTModel;
  cookie: string;
  authenticity_token: string;
}

async function* generate({
  gpt_model,
  cookie,
  authenticity_token,
  conversation,
  maxTokens = 1000,
  signal,
}: LexGenerateParams) {
  const text = chatRecordsToString(conversation, SYSTEM_MESSAGES[gpt_model]);

  const payload: LexPayload = {
    gpt_model,
    text,
    max_tokens: maxTokens,
    temperature: 0.7,
    authenticity_token,
  };

  const response = await fetch(REQUEST_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
      cookie,
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`);
  }

  for await (const line of streamToLineIterator(response.body!)) {
    if (line.startsWith("data:")) {
      const data = JSON.parse(line.slice(5));
      const token = data.text ?? "";
      if (token) yield token;
    }
  }
}

interface LexBotOptions {
  cookie: string;
  token: string;
  model: GPTModel;
}

export class LexBot extends AbstractBot {
  private cookie: string;
  private authenticity_token: string;
  private gpt_model: GPTModel;

  constructor({ cookie, token, model }: LexBotOptions) {
    super();
    this.cookie = cookie;
    this.authenticity_token = token;
    this.gpt_model = model;
  }

  protected override doAnswer(params: AnswerParams) {
    return generate({
      ...params,
      gpt_model: this.gpt_model,
      cookie: this.cookie,
      authenticity_token: this.authenticity_token,
    });
  }
}
