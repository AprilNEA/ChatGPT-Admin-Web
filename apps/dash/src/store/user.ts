import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "dash-user-store";

export interface UserStore {
  expiredTime: number;
  sessionToken: string | null;
  updateSessionToken: (sessionToken: string, expiredTime: number) => void;
  validateSessionToken: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      expiredTime: 0,
      sessionToken: null,

      updateSessionToken(sessionToken: string, expiredTime: number) {
        set(() => ({ sessionToken, expiredTime }));
      },

      /**
       * 效验是否存在 token 以及 token 是否过期。
       */
      validateSessionToken() {
        return !!(
          get().sessionToken &&
          get().expiredTime > Math.floor(Date.now() / 1000)
        );
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    }
  )
);
