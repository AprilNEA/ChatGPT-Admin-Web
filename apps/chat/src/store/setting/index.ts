import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Theme,
  SubmitKey,
  ChatConfig,
  SettingStore,
} from "@/store/setting/typing";

const LOCAL_KEY = "setting-store";

/***
 * 默认设置, 用于初始化以及重置
 */
const DEFAULT_CONFIG: ChatConfig = {
  historyMessageCount: 8,
  compressMessageLengthThreshold: 1000,
  sendBotMessages: true as boolean,
  submitKey: SubmitKey.Enter as SubmitKey,
  avatar: "1f603",
  theme: Theme.Auto as Theme,
  tightBorder: false,

  modelConfig: {
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 2000,
    presence_penalty: 0,
  },
};

export const useSettingStore = create<SettingStore>()(
  persist(
    (set, get) => ({
      config: {
        ...DEFAULT_CONFIG,
      },

      tightBorder: true,

      changeTightBorder(v: boolean) {
        set(() => ({ tightBorder: v }));
      },

      resetConfig() {
        set(() => ({ config: { ...DEFAULT_CONFIG } }));
      },

      getConfig() {
        return get().config;
      },

      updateConfig(updater) {
        const config = get().config;
        updater(config);
        set(() => ({ config }));
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    }
  )
);
