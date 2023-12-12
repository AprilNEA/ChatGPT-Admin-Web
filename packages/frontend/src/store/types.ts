import { SubmitKey, Theme } from '@/store/shared';

import {
  BaseResponse,
  ChatMessage,
  ChatMessageRole,
  ChatSession,
} from 'shared';

export type LocalConfig = {
  theme: Theme;
  submitKey: SubmitKey;
  tightBorder: boolean;
};

export interface SharedSlice {
  modelId: number;
  updateModelId: (id: number) => void;

  // config
  config: LocalConfig;
  resetConfig: () => void;
  getConfig: () => LocalConfig;
  updateConfig: (updater: (config: LocalConfig) => void) => void;

  // chat related
  currentChatSessionId?: string; // index
  currentChatSession?: ChatSession;
  currentChatSessionMessages?: ChatMessage[];

  // auth
  sessionToken?: string;
  refreshToken?: string;
  setAuthToken: (sessionToken: string, refreshToken: string) => void;
  clearAuthToken: () => void;

  // layout
  latestAnnouncementId?: number;
  setLatestAnnouncementId: (id: number) => void;
  showSideBar: boolean;
  setShowSideBar: (open: boolean) => void;

  // utils
  clearData: () => void;
  fetcher: (url: string, options?: RequestInit) => Promise<Response>;
  jsonFetcher: <T = any>(
    url: string,
    options?: RequestInit,
  ) => Promise<BaseResponse<T>>;
}

export interface ChatSlice {
  // state
  sessionId?: string;
  chatStreamingController?: AbortController;

  // action
  addMessage: (
    message: { role: ChatMessageRole; content: string } & Partial<ChatMessage>,
  ) => void;
  isStreaming: () => boolean;
  stopStreaming: () => void;
  modifyLastMessage: (
    modifier: (lastMessage: ChatMessage) => Partial<ChatMessage>,
  ) => void;

  requestChat: (content: string, signal?: AbortSignal) => Promise<void>;
  updateSessionId: (sessionId: string, isNew?: boolean) => void;
  removeSession: (sid: string) => void;
}

export type StoreType = SharedSlice & ChatSlice;
