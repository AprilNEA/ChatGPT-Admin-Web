import { BotType } from "./model";
import {ChatCompletionResponseMessage} from "openai";

export namespace StoreType {
  export type Model = "gpt-3.5-turbo" | "gpt-4" | "newbing"

  export enum SubmitKey {
    Enter = "Enter",
    CtrlEnter = "Ctrl + Enter",
    ShiftEnter = "Shift + Enter",
    AltEnter = "Alt + Enter",
    MetaEnter = "Meta + Enter",
  }

  export enum Theme {
    Auto = "auto",
    Dark = "dark",
    Light = "light",
  }

  export interface ChatConfig {
    maxToken?: number;
    historyMessageCount: number; // -1 means all
    compressMessageLengthThreshold: number;
    sendBotMessages: boolean; // send bots message or not
    submitKey: SubmitKey;
    avatar: string;
    theme: Theme;
    tightBorder: boolean;

    modelConfig: {
      model: BotType.Model;
      temperature: number;
      max_tokens: number;
      presence_penalty: number;
    };
  }

  export interface SettingStore {
    config: ChatConfig;
    getConfig: () => ChatConfig;
    resetConfig: () => void;
    updateConfig: (updater: (config: ChatConfig) => void) => void;
  }

  export type Message = ChatCompletionResponseMessage & {
    date: string;
    streaming?: boolean;
    model?: Model;
  };

  export type ModelConfig = ChatConfig["modelConfig"];

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

  /**
   * Store - For chat history
   */
  export interface ChatStore {
    showSideBar: boolean;
    setShowSideBar: (open: boolean) => void;

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

    clearAllData: () => void;
  }

}
