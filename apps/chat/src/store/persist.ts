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

const BASE_URL = "http://localhost:3001";

type Value = {
  modelId: number;
  updateModelId: (id: number) => void;

  chatSessionId?: string; // index

  chatSession?: ChatSession;
  chatSessionMessages?: ChatMessage[];

  sessionToken?: string;

  // layout state
  showSideBar: boolean;

  chatStreamingController?: AbortController;
};

type Action = {
  fetcher: (url: string, options?: RequestInit) => Promise<Response>;

  // chat related
  addMessage: (
    message: { role: ChatMessageRole; content: string } & Partial<ChatMessage>,
  ) => void;
  isStreaming: () => boolean;
  modifyLastMessage: (
    modifier: (lastMessage: ChatMessage) => Partial<ChatMessage>,
  ) => void;
  stopStreaming: () => void;

  requestChat: (content: string, signal?: AbortSignal) => Promise<void>;
  selectSession: (sid: string, router?: ReturnType<typeof useRouter>) => void;
  // newSession: (sid: string, router?: ReturnType<typeof useRouter>) => void;

  // auth
  loginByCode: (data: loginByCodeDto) => void;
  loginByPassword: (
    router: ReturnType<typeof useRouter>,
    data: byPasswordDto,
  ) => void;
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
      modelId: 1,
      updateModelId(id: number) {
        set({ modelId: id });
      },

      showSideBar: true,
      async setShowSideBar(open: boolean) {
        set({ showSideBar: open });
      },

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

      addMessage(message) {
        const { chatSessionMessages, modelId } = get();
        set({
          chatSessionMessages: [
            ...(chatSessionMessages ?? []),
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
        return get().chatSessionMessages?.at(-1)?.isStreaming ?? false;
      },

      stopStreaming() {
        get().chatStreamingController?.abort();
      },

      modifyLastMessage(modifier) {
        const lastMessage = get().chatSessionMessages?.at(-1);
        if (!lastMessage) return;

        const modifiedLastMessage = {
          ...lastMessage,
          ...modifier(lastMessage),
        };

        set({
          chatSessionMessages: get()
            .chatSessionMessages!.slice(0, -1)
            .concat(modifiedLastMessage),
        });
      },

      async selectSession(sid: string, router?: ReturnType<typeof useRouter>) {
        if (router) router.push(`/chat/${sid}`);
        const { messages, ...session } = await get()
          .fetcher(`/chat/messages/${sid}`)
          .then((res) => res.json());
        console.log(messages, session);
        set({
          chatSessionId: sid,
          chatSession: session,
          chatSessionMessages: messages,
        });
      },

      async newSession(router: ReturnType<typeof useRouter>) {
        const sid = crypto.randomUUID();
        set({
          chatSessionId: sid,
          chatSession: undefined,
          chatSessionMessages: [],
        });
        router.push(`/chat/${sid}`);
      },

      async requestChat(content) {
        const {
          chatSessionId,
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

        const res = await fetcher(`/chat/messages/${chatSessionId}`, {
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
          get().chatSessionMessages,
        );
      },

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

      clearData() {
        set((state) => ({
          sessionToken: undefined,
        }));
      },
    }),
    {
      name: "caw",
      partialize: (state) => ({
        sessionToken: state.sessionToken,
      }),
      version: 1,
    },
  ),
);
