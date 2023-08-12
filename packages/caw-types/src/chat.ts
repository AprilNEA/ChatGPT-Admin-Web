export type ChatMessageRole = "system" | "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  model?: string;
  content: string;
  chatSessionId: string;

  isStreaming?: boolean;
  isPreview?: boolean;
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
  sid: string;
  mid: number;
  content: string;
}
