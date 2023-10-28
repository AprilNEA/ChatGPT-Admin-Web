export type ChatMessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: ChatMessageRole;
  content: string;

  modelId: number;

  createdAt: Date;
  updatedAt: Date;

  isStreaming?: boolean;
}

export interface ChatSession {
  id: string;
  topic: string;
  updatedAt: Date;
  messagesCount: number;
}

export interface ChatSessionWithMessage extends ChatSession {
  messages: ChatMessage[];
}

export interface NewMessageDto {
  /* Model Id */
  modelId: number;
  content: string;
  /* When no sid */
  memoryPrompt?: string;
}
