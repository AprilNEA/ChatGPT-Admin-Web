import { StateCreator } from 'zustand';

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
          topic: '',
          updatedAt: new Date(),
          messagesCount: 1,
        },
        currentChatSessionMessages: [
          {
            role: 'system',
            content: '你好，请问有什么可以帮助您？',
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
        if (!line?.startsWith('data:')) continue;
        const data = line?.slice('data:'.length).trim();
        if (!data) continue;
        console.log('[streaming]', data);

        // const token: string = JSON.parse(data);
        const token = data;
        modifyLastMessage(({ content }) => ({ content: content + token }));
      } catch (e) {
        reader.releaseLock();
        if (e instanceof DOMException && e.name === 'AbortError') {
          console.log('[streaming]', 'aborting...');
          break;
        } else throw e;
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