export type ChatRole = "bot" | "user" | "system" | "context";

export type ChatRecord = {
  role: ChatRole;
  content: string;
};

export interface AnswerParams {
  conversation: ChatRecord[];
  maxTokens?: number;
  signal?: AbortSignal;
}

export type VercelAIModel = "openai:gpt-3.5-turbo" | "openai:gpt-4";

export interface VercelAIPayload {
  frequencyPenalty?: number;
  maxTokens?: number;
  model: VercelAIModel;
  presencePenalty?: number;
  prompt: string;
  stopSequences?: string[];
  temperature?: number;
  topK?: number;
  topP?: number;
}
