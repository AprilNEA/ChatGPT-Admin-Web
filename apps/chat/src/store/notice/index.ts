import { create } from "zustand";
import { persist } from "zustand/middleware";
import md5 from "spark-md5";

const LOCAL_KEY = "notice-store";

interface NoticeStore {
  notice: string | undefined;
  noticeHash: string | undefined;
  updateNotice: (notice: string) => boolean;
}

export const useNoticeStore = create<NoticeStore>()(
  persist(
    (set, get) => ({
      notice: undefined,
      noticeHash: undefined,

      updateNotice(notice: string) {
        const hashNow = get().noticeHash;
        const hashNew = md5.hash(notice);
        if (hashNew == hashNow) return false;
        set((state) => ({ notice, noticeHash: hashNew }));
        return true;
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    }
  )
);
