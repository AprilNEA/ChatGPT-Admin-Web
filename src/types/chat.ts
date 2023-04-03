import { Message } from "@/store";
import { ChatConfig } from "@/types/setting";

export interface ChatStat {
  tokenCount: number;
  wordCount: number;
  charCount: number;
}

export interface ChatSession {
  id: number;
  topic: string;
  memoryPrompt: string;
  messages: Message[];
  stat: ChatStat;
  lastUpdate: string;
  lastSummarizeIndex: number;
}

export interface ChatStore {
  config: ChatConfig;
  sessions: ChatSession[];
  currentSessionIndex: number;
  removeSession: (index: number) => void;
  selectSession: (index: number) => void;
  newSession: () => void;
  currentSession: () => ChatSession;
  onNewMessage: (message: Message) => void;
  onUserInput: (content: string) => Promise<void>;
  summarizeSession: () => void;
  updateStat: (message: Message) => void;
  updateCurrentSession: (updater: (session: ChatSession) => void) => void;
  updateMessage: (
    sessionIndex: number,
    messageIndex: number,
    updater: (message?: Message) => void
  ) => void;
  getMessagesWithMemory: () => Message[];
  getMemoryPrompt: () => Message;

  getConfig: () => ChatConfig;
  resetConfig: () => void;
  updateConfig: (updater: (config: ChatConfig) => void) => void;
  clearAllData: () => void;
}
