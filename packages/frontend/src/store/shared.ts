import { StateCreator } from 'zustand';

import { LocalConfig, SharedSlice, StoreType } from '@/store/types';

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
  setAuthToken(sessionToken, refreshToken) {
    set({ sessionToken, refreshToken });
  },
  clearAuthToken() {
    if (get().sessionToken) {
      set({ sessionToken: undefined });
    }
    if (get().refreshToken) {
      set({ refreshToken: undefined });
    }
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
    return fetch(`/api${url}`, {
      ...init,
      headers: {
        ...init?.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${get().sessionToken}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        set({ sessionToken: undefined });
      }
      return res;
    });
  },
  jsonFetcher(url, init) {
    return get()
      .fetcher(url, init)
      .then((res) => res.json());
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
