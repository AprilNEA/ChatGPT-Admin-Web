import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreType } from "@caw/types";

const LOCAL_KEY = "setting-store";

/***
 * 默认设置, 用于初始化以及重置
 */
const DEFAULT_CONFIG: StoreType.ChatConfig = {
  historyMessageCount: 8,
  compressMessageLengthThreshold: 1000,
  sendBotMessages: true as boolean,
  submitKey: StoreType.SubmitKey.Enter as StoreType.SubmitKey,
  avatar: "1f603",
  theme: StoreType.Theme.Auto as StoreType.Theme,
  tightBorder: true,

  modelConfig: {
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 2000,
    presence_penalty: 0,
  },
};

export const useSettingStore = create<StoreType.SettingStore>()(
  persist(
    (set, get) => ({
      config: {
        ...DEFAULT_CONFIG,
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
        set(() => ({ config: { ...config } }));
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    }
  )
);
