import { Injectable } from '@nestjs/common';
import {
  openaiChatComplete,
  OpenAIChatCompletionParams,
} from '@libs/openai/openai';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@caw/types';

@Injectable()
export class OpenaiService {
  private endpoint: string;

  constructor(private config: ConfigService) {
    const { baseUrl, endpoint } = config.get<ConfigType['openai']>('openai');
    this.endpoint =
      endpoint || `${baseUrl || 'https://api.openai.com/v1/chat'}/completions`;
  }

  async request(
    params: Omit<OpenAIChatCompletionParams, 'apiUrl'>,
  ): Promise<string> {
    const tokens: string[] = [];
    for await (const token of openaiChatComplete({
      ...params,
      apiUrl: this.endpoint,
    })) {
      tokens.push(token);
    }
    return tokens.join('');
  }

  async *requestStream(
    params: Omit<OpenAIChatCompletionParams, 'apiUrl'>,
    onFinish?: (generated: string) => void | Promise<void>,
  ): AsyncIterableIterator<string> {
    const tokenStream = openaiChatComplete({
      ...params,
      apiUrl: this.endpoint,
    });

    if (!onFinish) {
      yield* tokenStream;
      return;
    }

    const tokens: string[] = [];
    for await (const token of tokenStream) {
      tokens.push(token);
      yield token;
    }
    const generated = tokens.join('');
    await onFinish(generated);
  }
}
