export type ChatRole = "assistant" | "user" | "system" | "context";

export type ChatRecord = {
  role: ChatRole;
  content: string;
};

export interface AnswerParams {
  conversation: ChatRecord[];
  maxTokens?: number;
  signal?: AbortSignal;
}

export type VercelAIModel = `openai:${GPTModel}`;

export type VercelAIPayload = {
  frequencyPenalty: number;
  maxTokens: number;
  model: VercelAIModel;
  presencePenalty: number;
  prompt: string;
  stopSequences: string[];
  temperature: number;
  topK: number;
  topP: number;
};

export type GPTModel = "gpt-3.5-turbo" | "gpt-4";

export type LexPayload = {
  text: string;
  max_tokens: number;
  gpt_model: GPTModel;
  temperature: number;
  authenticity_token: string;
};

export interface ChatBot {
  answer(params: AnswerParams): AsyncIterable<string>;
  answerStream(params: AnswerParams): ReadableStream<Uint8Array>;
}

export interface BingHistoryItem {
  author: "user" | "system" | "bot" | "context";
  text: string;
}

export interface BingPayload {
  userMessage: string;
  cookie: string;
  history?: BingHistoryItem[];
}

export type BingEvent = {
  type: BingEventType.DONE;
  text: string;
} | {
  type: BingEventType.ANSWER;
  answer: string;
} | {
  type: BingEventType.ERROR;
  error: string;
} | {
  type: BingEventType.RESET;
  text: string;
} | {
  type: BingEventType.QUERY;
  query: string;
};

export enum BingEventType {
  DONE = "DONE",
  ANSWER = "ANSWER",
  ERROR = "ERROR",
  RESET = "RESET",
  QUERY = "QUERY",
}
