import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "dash-user-store";

export interface UserStore {
  sessionToken: string | null;
  updateSessionToken: (sessionToken: string) => void;
  validateSessionToken: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      sessionToken: null,

      updateSessionToken(sessionToken: string) {
        set((state) => ({ sessionToken }));
      },

      /**
       * TODO 本地检验 Cookie 是否有效
       * 后端中间件会二次效验
       */
      validateSessionToken() {
        const sessionToken = get().sessionToken;
        return !!sessionToken;
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    }
  )
);
