export type Model = "gpt-3.5-turbo" | "gpt-4" | "newbing";

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
  sendBotMessages: boolean; // send bot's message or not
  submitKey: SubmitKey;
  avatar: string;
  theme: Theme;
  tightBorder: boolean;

  modelConfig: {
    model: Model;
    temperature: number;
    max_tokens: number;
    presence_penalty: number;
  };
}

export interface SettingStore {
  config: ChatConfig;
  tightBorder: boolean;
  changeTightBorder: (v: boolean) => void;
  getConfig: () => ChatConfig;
  resetConfig: () => void;
  updateConfig: (updater: (config: ChatConfig) => void) => void;
}
