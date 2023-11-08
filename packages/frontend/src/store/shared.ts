import { StateCreator } from 'zustand';

import { LocalConfig, SharedSlice, StoreType } from '@/store/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export enum SubmitKey {
  Enter = 'Enter',
  CtrlEnter = 'Ctrl + Enter',
  ShiftEnter = 'Shift + Enter',
  AltEnter = 'Alt + Enter',
  MetaEnter = 'Meta + Enter',
}

export enum Theme {
  Auto = 'auto',
  Dark = 'dark',
  Light = 'light',
}

const DEFAULT_CONFIG: LocalConfig = {
  theme: Theme.Auto as Theme,
  tightBorder: false,
  submitKey: SubmitKey.Enter as SubmitKey,
};

export const createSharedStore: StateCreator<StoreType, [], [], SharedSlice> = (
  set,
  get,
) => ({
  // Auth
  setSessionToken(token: string) {
    set({ sessionToken: token });
  },

  // Model
  modelId: 1,

  updateModelId(id: number) {
    set(() => ({ modelId: id }));
  },

  // Sidebar
  showSideBar: false,

  async setShowSideBar(open: boolean) {
    set({ showSideBar: open });
  },

  setLatestAnnouncementId(id: number) {
    set({ latestAnnouncementId: id });
  },

  // utils
  fetcher(url: string, init?: RequestInit) {
    return fetch(`${BASE_URL}/api${url}`, {
      ...init,
      headers: {
        ...init?.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${get().sessionToken}`,
      },
    });
  },
  // Config
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
    set(() => ({ config }));
  },
  /* Reset persist storage */
  clearData() {
    set((state) => ({
      sessionToken: undefined,
      config: undefined,
    }));
  },
});
