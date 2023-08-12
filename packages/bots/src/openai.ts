import { AbstractBot } from "./abstract-bot";
import { AnswerParams, GPTModel } from "./types";
import { streamToLineIterator } from "./utils";

const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

export class OpenAIBot extends AbstractBot {
  constructor(
    private readonly apiKey: string,
    private readonly model: GPTModel = "gpt-3.5-turbo",
  ) {
    super();
  }

  protected async *doAnswer(params: AnswerParams): AsyncIterable<string> {
    const { conversation, maxTokens, signal } = params;

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: conversation,
        max_tokens: maxTokens,
        stream: true,
      }),
      signal,
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const lines = streamToLineIterator(response.body!);

    for await (const line of lines) {
      if (!line.startsWith("data:")) continue;

      const data = line.slice("data:".length).trim();

      if (!data || data === "[DONE]") continue;

      const { choices: [{ delta: { content } }] } = JSON.parse(data);

      if (!content) continue;
      yield content;
    }
  }
}
