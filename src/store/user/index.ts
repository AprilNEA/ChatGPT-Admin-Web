import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cookie } from "@/lib/redis/typing";

const LOCAL_KEY = "user-store";

export interface UserStore {
  cookie: Cookie | null;
  email: string;
  versionId: string;
  updateVersionId: (versionId: string) => void;
  updateEmail: (email: string) => void;
  updateCookie: (cookie: Cookie) => void;
  validateCookie: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      cookie: null,
      email: "",
      versionId: "",

      updateVersionId(versionId: string) {
        set((state) => ({ versionId }));
      },

      updateEmail(email: string) {
        set((state) => ({ email }));
      },

      updateCookie(cookie: Cookie) {
        set((state) => ({ cookie }));
      },

      /**
       * 检验 Cookie 是否过期
       */
      validateCookie() {
        const cookie = get().cookie;
        return !!(cookie && cookie.exp > Date.now());
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    }
  )
);
