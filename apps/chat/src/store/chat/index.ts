import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type ChatCompletionResponseMessage } from "openai";
import { ChatConfig, Model } from "@/store/setting/typing";
import type { ChatSession, ChatStore } from "./typing";

import {
  ControllerPool,
  requestChatStream,
  requestWithPrompt,
} from "@/utils/requests";
import { trimTopic } from "@/utils/utils";

import Locale from "@/locales";
import { useSettingStore } from "@/store/setting";

export type Message = ChatCompletionResponseMessage & {
  date: string;
  streaming?: boolean;
  model?: Model;
};

export type ModelConfig = ChatConfig["modelConfig"];

if (!Array.prototype.at) {
  require("array.prototype.at/auto");
}

export const ALL_MODELS = [
  {
    name: "gpt-4",
    available: true,
  },
  {
    name: "gpt-3.5-turbo",
    available: true,
  },
  {
    name: "newbing",
    available: true,
  },
];

export function isValidModel(name: string) {
  return ALL_MODELS.some((m) => m.name === name && m.available);
}

export function isValidNumber(x: number, min: number, max: number) {
  return typeof x === "number" && x <= max && x >= min;
}

export function filterConfig(config: ModelConfig): Partial<ModelConfig> {
  const validator: {
    [k in keyof ModelConfig]: (x: ModelConfig[keyof ModelConfig]) => boolean;
  } = {
    model(x) {
      return isValidModel(x as string);
    },
    max_tokens(x) {
      return isValidNumber(x as number, 100, 4000);
    },
    presence_penalty(x) {
      return isValidNumber(x as number, -2, 2);
    },
    temperature(x) {
      return isValidNumber(x as number, 0, 1);
    },
  };

  Object.keys(validator).forEach((k) => {
    const key = k as keyof ModelConfig;
    if (!validator[key](config[key])) {
      delete config[key];
    }
  });

  return config;
}

/**
 * 默认对话Topic, 创建空对话的配置
 */
const DEFAULT_TOPIC = Locale.Store.DefaultTopic;

function createEmptySession(): ChatSession {
  const createDate = new Date().toLocaleString();

  return {
    id: Date.now(),
    topic: DEFAULT_TOPIC,
    memoryPrompt: "",
    messages: [
      {
        role: "assistant",
        content: Locale.Store.BotHello,
        date: createDate,
      },
    ],
    stat: {
      tokenCount: 0,
      wordCount: 0,
      charCount: 0,
    },
    lastUpdate: createDate,
    lastSummarizeIndex: 0,
  };
}

const LOCAL_KEY = "chat-store";

const settingStore = useSettingStore.getState();

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [createEmptySession()],
      currentSessionIndex: 0,

      showSideBar: true,
      setShowSideBar(v: boolean) {
        set(() => ({ showSideBar: v }));
      },

      resetSessions() {
        set(() => ({
          sessions: [createEmptySession()],
          currentSessionIndex: 0,
        }));
      },

      selectSession(index: number) {
        set({
          currentSessionIndex: index,
        });
      },

      removeSession(index: number) {
        set((state) => {
          let nextIndex = state.currentSessionIndex;
          const sessions = state.sessions;

          if (sessions.length === 1) {
            return {
              currentSessionIndex: 0,
              sessions: [createEmptySession()],
            };
          }

          sessions.splice(index, 1);

          if (nextIndex === index) {
            nextIndex -= 1;
          }

          return {
            currentSessionIndex: nextIndex,
            sessions,
          };
        });
      },

      newSession() {
        set((state) => ({
          currentSessionIndex: 0,
          sessions: [createEmptySession()].concat(state.sessions),
        }));
      },

      currentSession() {
        let index = get().currentSessionIndex;
        const sessions = get().sessions;

        if (index < 0 || index >= sessions.length) {
          index = Math.min(sessions.length - 1, Math.max(0, index));
          set(() => ({ currentSessionIndex: index }));
        }

        const session = sessions[index];

        return session;
      },

      onNewMessage(message) {
        get().updateCurrentSession((session) => {
          session.lastUpdate = new Date().toLocaleString();
        });
        get().updateStat(message);
        get().summarizeSession();
      },

      async onUserInput(content) {
        const userMessage: Message = {
          role: "user",
          content,
          date: new Date().toLocaleString(),
        };

        const botMessage: Message = {
          content: "",
          role: "assistant",
          date: new Date().toLocaleString(),
          streaming: true,
          model: settingStore.config.modelConfig.model,
        };

        // get recent messages
        const recentMessages = get().getMessagesWithMemory();
        const sendMessages = recentMessages.concat(userMessage);
        const sessionIndex = get().currentSessionIndex;
        const messageIndex = get().currentSession().messages.length + 1;

        // save user's and bot's message
        get().updateCurrentSession((session) => {
          session.messages.push(userMessage);
          session.messages.push(botMessage);
        });

        // make request 请求对话
        console.log("[User Input] ", sendMessages);
        requestChatStream(sendMessages, {
          onMessage(content, done) {
            // stream response
            if (done) {
              botMessage.streaming = false;
              botMessage.content = content;
              get().onNewMessage(botMessage);
              ControllerPool.remove(sessionIndex, messageIndex);
            } else {
              botMessage.content = content;
              set(() => ({}));
            }
          },
          onBlock() {
            userMessage.content = "你好, 请问你可以帮我解决什么";
            set(() => ({}));
          },
          onError(error) {
            botMessage.content += "\n\n" + Locale.Store.Error;
            botMessage.streaming = false;
            set(() => ({}));
            ControllerPool.remove(sessionIndex, messageIndex);
          },
          onController(controller) {
            // collect controller for stop/retry
            ControllerPool.addController(
              sessionIndex,
              messageIndex,
              controller
            );
          },
          filterBot: !settingStore.config.sendBotMessages,
          modelConfig: settingStore.config.modelConfig,
        });
      },

      getMemoryPrompt() {
        const session = get().currentSession();

        return {
          role: "system",
          content: Locale.Store.Prompt.History(session.memoryPrompt),
          date: "",
        } as Message;
      },

      getMessagesWithMemory() {
        const session = get().currentSession();
        const config = settingStore.config;
        const n = session.messages.length;
        const recentMessages = session.messages.slice(
          n - config.historyMessageCount
        );

        const memoryPrompt = get().getMemoryPrompt();

        if (session.memoryPrompt) {
          recentMessages.unshift(memoryPrompt);
        }

        return recentMessages;
      },

      /**
       * 更新消息
       * @param sessionIndex 对话 ID
       * @param messageIndex 消息 ID
       * @param updater
       */
      updateMessage(
        sessionIndex: number,
        messageIndex: number,
        updater: (message?: Message) => void
      ) {
        const sessions = get().sessions;
        const session = sessions.at(sessionIndex);
        const messages = session?.messages;
        updater(messages?.at(messageIndex));
        set(() => ({ sessions }));
      },

      /**
       * 总结对话
       */
      summarizeSession() {
        const session = get().currentSession();

        if (session.topic === DEFAULT_TOPIC && session.messages.length >= 3) {
          // should summarize topic
          requestWithPrompt(session.messages, Locale.Store.Prompt.Topic).then(
            (res) => {
              get().updateCurrentSession(
                (session) => (session.topic = trimTopic(res))
              );
            }
          );
        }

        const config = settingStore.config;
        let toBeSummarizedMsgs = session.messages.slice(
          session.lastSummarizeIndex
        );
        const historyMsgLength = toBeSummarizedMsgs.reduce(
          (pre, cur) => pre + cur.content.length,
          0
        );

        if (historyMsgLength > 4000) {
          toBeSummarizedMsgs = toBeSummarizedMsgs.slice(
            -config.historyMessageCount
          );
        }

        // add memory prompt
        toBeSummarizedMsgs.unshift(get().getMemoryPrompt());

        const lastSummarizeIndex = session.messages.length;

        console.log(
          "[Chat History] ",
          toBeSummarizedMsgs,
          historyMsgLength,
          config.compressMessageLengthThreshold
        );

        if (historyMsgLength > config.compressMessageLengthThreshold) {
          requestChatStream(
            toBeSummarizedMsgs.concat({
              role: "system",
              content: Locale.Store.Prompt.Summarize,
              date: "",
            }),
            {
              filterBot: false,
              onMessage(message, done) {
                session.memoryPrompt = message;
                if (done) {
                  console.log("[Memory] ", session.memoryPrompt);
                  session.lastSummarizeIndex = lastSummarizeIndex;
                }
              },
              onBlock() {
                session.memoryPrompt = "你好, 请问你可以帮我解决什么";
              },
              onError(error) {
                console.error("[Summarize] ", error);
              },
            }
          );
        }
      },

      updateStat(message) {
        get().updateCurrentSession((session) => {
          session.stat.charCount += message.content.length;
          // TODO: should update chat count and word count
        });
      },

      updateCurrentSession(updater) {
        const sessions = get().sessions;
        const index = get().currentSessionIndex;
        updater(sessions[index]);
        set(() => ({ sessions }));
      },

      clearAllData() {
        if (confirm(Locale.Store.ConfirmClearAll)) {
          localStorage.clear();
          location.reload();
        }
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    }
  )
);
