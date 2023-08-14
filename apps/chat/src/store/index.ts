import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useRouter } from "next/navigation";
import {
  ChatSession,
  ChatMessage,
  loginByCodeDto,
  byPasswordDto,
  requestCodeDto,
  NewMessageDto,
  ChatMessageRole,
} from "@caw/types";
import { TextLineStream } from "@/utils/text_line_stream";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export enum SubmitKey {
  Enter = "Enter",
  CtrlEnter = "Ctrl + Enter",
  ShiftEnter = "Shift + Enter",
  AltEnter = "Alt + Enter",
  MetaEnter = "Meta + Enter",
}

export enum Theme {
  Auto = "auto",
  Dark = "dark",
  Light = "light",
}

type LocalConfig = {
  theme: Theme;
  submitKey: SubmitKey;
  tightBorder: boolean;
};

type StoreType = {
  modelId: number;
  updateModelId: (id: number) => void;

  // config
  config: LocalConfig;
  resetConfig: () => void;
  getConfig: () => LocalConfig;
  updateConfig: (updater: (config: LocalConfig) => void) => void;

  // chat related
  currentChatSessionId?: string; // index
  currentChatSession?: ChatSession;
  currentChatSessionMessages?: ChatMessage[];

  addMessage: (
    message: { role: ChatMessageRole; content: string } & Partial<ChatMessage>,
  ) => void;
  isStreaming: () => boolean;
  stopStreaming: () => void;
  modifyLastMessage: (
    modifier: (lastMessage: ChatMessage) => Partial<ChatMessage>,
  ) => void;

  requestChat: (content: string, signal?: AbortSignal) => Promise<void>;
  updateSessionId: (
    sid?: string,
    router?: ReturnType<typeof useRouter>,
  ) => void;
  newSession: (router: ReturnType<typeof useRouter>) => void;
  removeSession: (sid: string) => void;

  chatStreamingController?: AbortController;

  // auth
  sessionToken?: string;
  loginByCode: (data: loginByCodeDto) => void;
  loginByPassword: (
    router: ReturnType<typeof useRouter>,
    data: byPasswordDto,
  ) => void;
  loginByWeChat: (router: ReturnType<typeof useRouter>, code?: string) => void;
  requestCode: (data: requestCodeDto) => void;
  register: (code: string, data: byPasswordDto) => void;
  validateSession: () => Promise<boolean>;

  // layout
  showSideBar: boolean;
  setShowSideBar: (open: boolean) => void;

  // utils
  clearData: () => void;
  fetcher: (url: string, options?: RequestInit) => Promise<Response>;
};

const DEFAULT_CONFIG: LocalConfig = {
  theme: Theme.Auto as Theme,
  tightBorder: false,
  submitKey: SubmitKey.Enter as SubmitKey,
};

export const useStore = create<StoreType>()(
  persist(
    (set, get) => ({
      // Setting
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
      // Model
      modelId: 1,

      updateModelId(id: number) {
        set(() => ({ modelId: id }));
      },

      // Sidebar
      showSideBar: true,

      async setShowSideBar(open: boolean) {
        set({ showSideBar: open });
      },

      // chat related
      addMessage(message) {
        const { currentChatSessionMessages, modelId } = get();
        set({
          currentChatSessionMessages: [
            ...(currentChatSessionMessages ?? []),
            {
              modelId,
              createdAt: new Date(),
              updatedAt: new Date(),
              ...message,
            },
          ],
        });
      },

      isStreaming() {
        return get().currentChatSessionMessages?.at(-1)?.isStreaming ?? false;
      },

      stopStreaming() {
        get().chatStreamingController?.abort();
      },

      modifyLastMessage(modifier) {
        const lastMessage = get().currentChatSessionMessages?.at(-1);
        if (!lastMessage) return;

        const modifiedLastMessage = {
          ...lastMessage,
          ...modifier(lastMessage),
        };

        set({
          currentChatSessionMessages: get()
            .currentChatSessionMessages!.slice(0, -1)
            .concat(modifiedLastMessage),
        });
      },

      async newSession(router) {
        get().updateSessionId(crypto.randomUUID(), router);
      },

      async updateSessionId(sid, router) {
        if (router) router.push(`/chat/${sid}`);
        const { messages, ...session } = await get()
          .fetcher(`/chat/messages/${sid}`)
          .then((res) => res.json());
        console.log(messages, session);
        set({
          currentChatSessionId: sid,
          currentChatSession: session,
          currentChatSessionMessages: messages,
        });
      },

      // TODO
      removeSession(sid: string) {},

      async requestChat(content) {
        const {
          currentChatSessionId,
          fetcher,
          modelId,
          isStreaming,
          addMessage,
          modifyLastMessage,
        } = get();

        if (isStreaming()) {
          console.warn(
            "[request chat]",
            "unable to request chat while streaming",
          );
          return;
        }

        const chatStreamingController = new AbortController();
        set({ chatStreamingController });

        addMessage({ role: "user", content });
        addMessage({ role: "assistant", content: "", isStreaming: true });

        const body: NewMessageDto = {
          content,
          mid: modelId,
        };

        const res = await fetcher(`/chat/messages/${currentChatSessionId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: chatStreamingController.signal,
        });

        if (!res.ok) throw new Error(await res.text());

        const reader = res
          .body!.pipeThrough(new TextDecoderStream())
          .pipeThrough(new TextLineStream())
          .getReader();

        for (;;) {
          try {
            const { done, value: line } = await reader.read();

            if (done) {
              reader.releaseLock();
              break;
            }

            if (!line?.startsWith("data:")) continue;
            const data = line?.slice("data:".length).trim();
            if (!data) continue;
            console.log("[streaming]", data);

            const token: string = JSON.parse(data);
            modifyLastMessage(({ content }) => ({ content: content + token }));
          } catch (e) {
            reader.releaseLock();
            if (e instanceof DOMException && e.name === "AbortError") {
              console.log("[streaming]", "aborting...");
              break;
            } else throw e;
          }
        }

        modifyLastMessage(() => ({ isStreaming: false }));
        set({ chatStreamingController: undefined });

        console.log(
          "[request chat]",
          "streaming finished. current messages are",
          get().currentChatSessionMessages,
        );
      },

      // Auth
      async loginByCode(data: loginByCodeDto) {
        fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).then((res) => {});
      },

      async loginByPassword(
        router: ReturnType<typeof useRouter>,
        data: byPasswordDto,
      ) {
        fetch(`${BASE_URL}/auth/login/password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              set((state) => ({
                sessionToken: res.token,
              }));
              router.push("/");
            } else {
              router.refresh();
            }
          });
      },

      async loginByWeChat(router, code?: string) {
        if (!code) router.refresh();
        fetch(`${BASE_URL}/auth/login/wechat?code=${code}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              set((state) => ({
                sessionToken: res.token,
              }));
              router.push("/");
            } else {
              router.refresh();
            }
          });
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

      // utils
      fetcher(url: string, init?: RequestInit) {
        return fetch(`${BASE_URL}${url}`, {
          ...init,
          headers: {
            ...init?.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${get().sessionToken}`,
          },
        });
      },

      clearData() {
        set((state) => ({
          sessionToken: undefined,
          config: undefined,
        }));
      },
    }),
    {
      name: "caw",
      partialize: (state) => ({
        sessionToken: state.sessionToken,
        config: state.config,
      }),
      version: 1,
    },
  ),
);
