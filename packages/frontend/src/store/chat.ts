import { StateCreator } from 'zustand';

import Locales from '@/locales';
import { ChatSlice, StoreType } from '@/store/types';
import { TextLineStream } from '@/utils/text_line_stream';

import { NewMessageDto } from 'shared';

export const createChatStore: StateCreator<StoreType, [], [], ChatSlice> = (
  set,
  get,
) => ({
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

  /* isNew won't fetch server */
  async updateSessionId(sessionId, isNew = false) {
    if (isNew) {
      set({
        currentChatSessionId: sessionId,
        currentChatSession: {
          id: sessionId,
          topic: undefined,
          updatedAt: new Date(),
          messagesCount: 1,
        },
        currentChatSessionMessages: [
          {
            role: 'system',
            content: Locales.Chat.Onboarding,
            modelId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      });
      return;
    }
    const { messages, ...session } = await get()
      .fetcher(`/chat/messages/${sessionId}`)
      .then((res) => res.json());
    console.log(messages, session);
    set({
      currentChatSessionId: sessionId,
      currentChatSession: session,
      currentChatSessionMessages: messages,
    });
  },

  // TODO
  removeSession(sid: string) {},

  async requestChat(content) {
    const {
      currentChatSessionId,
      currentChatSession,
      fetcher,
      modelId,
      isStreaming,
      addMessage,
      modifyLastMessage,
    } = get();

    if (isStreaming()) {
      console.warn('[request chat]', 'unable to request chat while streaming');
      return;
    }

    const chatStreamingController = new AbortController();
    set({ chatStreamingController });

    addMessage({ role: 'user', content });
    addMessage({ role: 'assistant', content: '', isStreaming: true });

    const body: NewMessageDto = {
      content,
      modelId,
    };

    const res = await fetcher(`/chat/messages/${currentChatSessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: chatStreamingController.signal,
    });

    if (!res.ok) {
      const jsonData = await res.json();
      modifyLastMessage(() => ({
        content: jsonData.message ?? '对话出错',
      }));
      throw new Error(
        `[request chat] code:${jsonData.code} message:${jsonData.message}`,
      );
    }

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

        if (!line?.startsWith('data:')) continue;
        const data = line?.slice('data:'.length);
        if (!data) continue;

        const token: string = JSON.parse(data);

        modifyLastMessage(({ content }) => ({ content: content + token }));
      } catch (e) {
        reader.releaseLock();
        if (e instanceof DOMException && e.name === 'AbortError') {
          console.log('[streaming]', 'aborting...');
          break;
        } else {
          modifyLastMessage(({ content }) => ({
            content: content + '对话中断',
          }));
          throw e;
        }
      } finally {
        if (currentChatSession?.topic) {
          const topic = await fetcher(`/chat/summary/${currentChatSessionId}`, {
            method: 'POST',
          })
            .then((res) => res.json())
            .then((res) => res.topic);
          if (topic !== currentChatSession.topic) {
            set({ currentChatSession: { ...currentChatSession, topic } });
          }
        }
      }
    }

    modifyLastMessage(() => ({ isStreaming: false }));
    set({ chatStreamingController: undefined });

    console.log(
      '[request chat]',
      'streaming finished. current messages are',
      get().currentChatSessionMessages,
    );
  },
});
