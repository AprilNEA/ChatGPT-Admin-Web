export type Role = 'system' | 'user' | 'assistant' | 'function';

export type Message = {
  role: Role;
  content: string;
};

export interface AIProviderParams {
  signal?: AbortSignal;
}

export interface AICompletionProviderParams extends AIProviderParams {
  messages: Message[];
}

export interface AIProviderFunction<P extends AIProviderParams> {
  (params: P): AsyncIterableIterator<string>;
}

export type OpenAIChatModel = 'gpt-3.5-turbo' | 'gpt-3.5-turbo-16k' | 'gpt-4';
