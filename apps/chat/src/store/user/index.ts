import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "user-store";

export interface UserStore {
  sessionToken: string | null;
  email: string;
  plan: string;
  requestsNo: number[];
  inviteCode: string;
  versionId: string;
  clearData: () => void;
  updateRequestsNo: () => void;
  updateVersionId: (versionId: string) => void;
  updateEmail: (email: string) => void;
  updateSessionToken: (sessionToken: string) => void;
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
      plan: "free",
      versionId: "",
      requestsNo: [],
      inviteCode: "",

      updateRequestsNo() {
        fetch("/api/user/get-limit", {
          headers: { email: get().email },
        })
          .then((res) => res.json())
          .then((res) => {
            set((state) => ({ requestsNo: res.requestsNo }));
          });
      },

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

      updateSessionToken(sessionToken: string) {
        set((state) => ({ sessionToken }));
      },

      /**
       * 本地检验 Cookie 是否有效
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
