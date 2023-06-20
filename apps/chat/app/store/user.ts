import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from "../constant";
import { apiUserLoginResume } from "@/app/api";
import { serverStatus } from "@caw/types";

export interface UserStore {
  // inviteCode: string;
  // updateInviteCode: (inviteCode: string) => void;

  sessionToken: string | null;
  tokenExpiredAt: number | null;
  validateSessionToken: () => Promise<boolean>;
  updateSessionToken: (sessionToken: string, expiredAt: number) => void;

  clearData: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // inviteCode: "",
      sessionToken: null,
      tokenExpiredAt: null,

      // updateInviteCode(inviteCode: string) {
      //   set((state) => ({inviteCode}));
      // },

      updateSessionToken(sessionToken: string, expiredAt: number) {
        set((state) => ({ sessionToken, tokenExpiredAt: expiredAt }));
      },

      /**
       * Local validation of existence and renewal based on expiration time
       * The middleware will validate the authenticity again
       */
      async validateSessionToken() {
        const sessionToken = get().sessionToken;
        const expiredAt = get().tokenExpiredAt;
        if (
          !expiredAt ||
          !sessionToken ||
          Date.now() < expiredAt + 4 * 24 * 3600 * 1000
        )
          return !!sessionToken;

        return apiUserLoginResume(sessionToken).then((res) => {
          if (res.status === serverStatus.success) {
            get().updateSessionToken(
              res.signedToken.token,
              res.signedToken.expiredAt,
            );
            return true;
          }
          return false;
        });
      },

      clearData() {
        set((state) => ({
          sessionToken: null,
          email: "",
        }));
      },
    }),
    {
      name: StoreKey.User,
      version: 1,
    },
  ),
);
