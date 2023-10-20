import {
  AICompletionProviderParams,
  AIProviderFunction,
  AIProviderParams,
  OpenAIChatModel,
} from './typing';
import { TextLineStream } from './text_line_stream';
import { AIProviderError } from './error';

export interface OpenAIAuthParams {
  apiKey: string;
  apiUrl: string;
}

type OpenAIChatCompleteBasicParams = AICompletionProviderParams &
  OpenAIAuthParams;

export interface OpenAIChatCompletionParams
  extends OpenAIChatCompleteBasicParams {
  model: OpenAIChatModel;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
}

export const openaiChatComplete: AIProviderFunction<OpenAIChatCompletionParams> =
  async function* ({ apiKey, apiUrl, signal, ...chatRequest }) {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ ...chatRequest, stream: true }),
      signal,
    });

    if (!response.ok) {
      throw new AIProviderError(`OpenAI API error: ${await response.text()}`);
    }

    const lineStream = response
      .body!.pipeThrough(new TextDecoderStream())
      .pipeThrough(new TextLineStream());

    const lineStreamReader = lineStream.getReader();

    for (;;) {
      const { value: line, done } = await lineStreamReader.read();
      if (done) {
        lineStreamReader.releaseLock();
        break;
      }

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
  };

export type OpenAIAudioTranscribeBasicParams = AIProviderParams &
  OpenAIAuthParams;

export interface OpenAIAudioTranscribeParams
  extends OpenAIAudioTranscribeBasicParams {
  file: Blob;
}

export async function openaiAudioTranscribe({
  apiUrl,
  apiKey,
  signal,
  file,
}: OpenAIAudioTranscribeParams) {
  const form = new FormData();
  form.append('file', file);
  form.append('model', 'whisper-1');

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: form,
    signal,
  });

  if (!response.ok) {
    throw new AIProviderError(`OpenAI API error: ${await response.text()}`);
  }

  const { text } = await response.json();
  return text;
}
