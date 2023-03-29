import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {UserStore} from "@/types/user";
import type {Cookie} from "@/lib/redis/typing";
import {cookies} from "next/headers";

const LOCAL_KEY = "user-store";

export const useUserStore = create<UserStore>()(
  persist((set, get) => ({
      cookie: null,
      email: '',

      updateEmail(email: string) {
        set((state) => ({email}));
      },

      updateCookie(cookie: Cookie) {
        set((state) => ({cookie}));
      },

      /**
       * 检验 Cookie 是否过期
       */
      validateCookie() {
        const cookie = get().cookie
        return !!(cookie && cookie.exp > Date.now());
      }
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    })
)
