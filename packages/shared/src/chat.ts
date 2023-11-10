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
  topic?: string;
  updatedAt: Date;
  messagesCount: number;
}

export interface DashboardChatSession extends ChatSession {
  user: {
    id: string;
    name: string;
  };
  _count: {
    messages: number;
  };
}

export interface ChatSessionWithMessage extends ChatSession {
  messages: ChatMessage[];
}

export interface NewMessageDto {
  /* Model Id */
  modelId: number;
  /* Main Content */
  content: string;
  /* Prompt */
  memoryPrompt?: string;
}
