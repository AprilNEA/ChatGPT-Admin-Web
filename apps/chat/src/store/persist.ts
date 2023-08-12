import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useRouter } from "next/navigation";
import { loginByCodeDto, byPasswordDto, requestCodeDto } from "@caw/types";
import { Message } from "@/store/chat";
import { CreateChatCompletionResponse as ChatResponse } from "openai/dist/api";
import { ChatRequest } from "@/utils/requests";
import { TextLineStream } from "@/utils/text_line_stream";
import useSWR from "swr";

const BASE_URL = "http://localhost:3001";

type Value = {
  sessionToken?: string;
  chatSessionId?: string;
  streamingText?: string;

  // layout state
  showSideBar: boolean;
};

type Action = {
  fetcher: (url: string, options?: RequestInit) => Promise<Response>;
  selectSession: (sid: string) => void;
  loginByCode: (data: loginByCodeDto) => void;
  loginByPassword: (data: byPasswordDto) => void;
  loginByWeChat: (router: ReturnType<typeof useRouter>, code?: string) => void;
  requestCode: (data: requestCodeDto) => void;
  register: (code: string, data: byPasswordDto) => void;
  validateSession: () => Promise<boolean>;

  // layout actions
  setShowSideBar: (open: boolean) => void;
  clearData: () => void;
};

export const useStore = create<Value & Action>()(
  persist(
    (set, get) => ({
      showSideBar: true,
      async setShowSideBar(open: boolean) {
        set({ showSideBar: open });
      },

      async fetcher(url: string, init?: RequestInit) {
        return fetch(`${BASE_URL}url`, {
          ...init,
          headers: {
            ...init?.headers,
            Authorization: `Bearer ${get().sessionToken}`,
          },
        });
      },

      selectSession(sid: string) {
        set({ chatSessionId: sid });
        const router = useRouter();
        router.push(`/chat/${sid}`);
      },

      async *requestChat(
        body: { content: string; sid: string; uid: number },
        signal: AbortSignal,
      ) {
        const res = await get().fetcher("/chat/message/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal,
        });

        if (!res.ok) throw new Error(await res.text());

        const reader = res
          .body!.pipeThrough(new TextDecoderStream())
          .pipeThrough(new TextLineStream())
          .getReader();

        for (;;) {
          const { done, value: line } = await reader.read();
          if (done) {
            reader.releaseLock();
            break;
          }
          if (!line?.startsWith("data:")) continue;
          const token = line?.slice("data:".length);
          if (token) yield token;
        }
      },

      async loginByCode(data: loginByCodeDto) {
        fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(data),
        }).then((res) => {});
      },

      async loginByPassword(data: byPasswordDto) {
        fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(data),
        }).then((res) => {});
      },

      async loginByWeChat(router, code?: string) {
        if (!code) router.refresh();
        fetch(`${BASE_URL}/auth/login/wechat?code=${code}`).then((res) =>
          res.json(),
        );
      },

      async requestCode(data: requestCodeDto) {
        fetch(`${BASE_URL}/auth/request-code`, {
          method: "POST",
          body: JSON.stringify(data),
        }).then((res) => {});
      },

      async register(code: string, data: byPasswordDto) {
        fetch(`${BASE_URL}/auth/register?code=${code}`, {
          method: "POST",
          body: JSON.stringify(data),
        }).then((res) => {});
      },

      async validateSession() {
        const session = get().sessionToken;
        if (!session) return false;
        try {
          // await verify(session);
          return true;
        } catch (e) {
          return false;
        }
      },

      clearData() {
        set((state) => ({
          sessionToken: undefined,
        }));
      },
    }),
    {
      name: "caw",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ["session"].includes(key)),
        ),
      version: 1,
    },
  ),
);
