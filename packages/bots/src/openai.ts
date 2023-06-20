import { AbstractBot } from './abstract-bot';
import { AnswerParams, GPTModel } from './types';
import { streamToLineIterator } from './utils';

const openAiBase = process.env.OPENAI_BASE ?? 'https://api.openai.com';
const openAiKey = process.env.OPENAI_KEY!;
const openAiProxy = process.env.OPENAI_PROXY ?? '';
const openAiEndpoint = `${openAiProxy}${openAiBase}/v1/chat/completions`;

export class OpenAIBot extends AbstractBot {
  constructor(
    private readonly apiKey: string,
    private readonly model: GPTModel = 'gpt-3.5-turbo'
  ) {
    super();
  }

  /**
   *
   * @param params
   * @protected
   */
  protected async *doAnswer(params: AnswerParams): AsyncIterable<string> {
    console.log(openAiEndpoint);
    const { conversation, maxTokens, signal } = params;

    const response = await fetch(openAiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey ?? openAiKey}`,
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
      if (!line.startsWith('data:')) continue;

      const data = line.slice('data:'.length).trim();

      if (!data || data === '[DONE]') continue;

      const {
        choices: [
          {
            delta: { content },
          },
        ],
      } = JSON.parse(data);

      if (!content) continue;
      yield content;
    }
  }
}
