import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SessionToken } from "@/typing";

const LOCAL_KEY = "user-store";

export interface UserStore {
  sessionToken: SessionToken | null;
  email: string;
  versionId: string;
  clearData: () => void;
  updateVersionId: (versionId: string) => void;
  updateEmail: (email: string) => void;
  updateSessionToken: (sessionToken: SessionToken) => void;
  validateSessionToken: () => boolean;
}

// function convertDateToTimestamp(date: Date | number): number | undefined {
//   if (date && date instanceof Date) {
//     return date.getTime();
//   } else {
//     console.error("传入的参数不是一个有效的Date对象");
//     return undefined;
//   }
// }
//
// function convertDatesInObject<T>(object: T): T {
//   const convertedObject = { ...object };
//
//   for (const key in convertedObject) {
//     if (Object.prototype.hasOwnProperty.call(convertedObject, key)) {
//       const value = convertedObject[key as keyof T];
//
//       if (value instanceof Date) {
//         convertedObject[key as keyof T] = convertDateToTimestamp(value) as T[keyof T];
//       }
//     }
//   }
//
//   return convertedObject;
// }

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      sessionToken: null,
      email: "",
      versionId: "",

      clearData() {
        set((state) => ({
          sessionToken: null,
          email: "",
          versionId: "",
        }));
      },

      updateVersionId(versionId: string) {
        set((state) => ({ versionId }));
      },

      updateEmail(email: string) {
        set((state) => ({ email }));
      },

      updateSessionToken(sessionToken: SessionToken) {
        set((state) => ({ sessionToken: sessionToken }));
      },

      /**
       * 本地检验 Cookie 是否有效
       * 后端中间件会二次效验
       */
      validateSessionToken() {
        const sessionToken = get().sessionToken;
        return !!(sessionToken && new Date(sessionToken.expiresAt).getTime() > new Date().getTime());
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    }
  )
);
