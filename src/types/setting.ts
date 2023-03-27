export enum SubmitKey {
  Enter = "Enter",
  CtrlEnter = "Ctrl + Enter",
  ShiftEnter = "Shift + Enter",
  AltEnter = "Alt + Enter",
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
    model: string;
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
