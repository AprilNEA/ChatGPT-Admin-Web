import type { ChatRequest, ChatReponse } from "@/app/api/bots/typing";
import { filterConfig, Message, ModelConfig, useUserStore } from "@/store";
import Locale from "@/locales";
import { LimitReason } from "@/typing.d";
import fetcher from "@/utils/fetcher";

/* 请求的超时时间 */
const TIME_OUT_MS = 30000;

if (!Array.prototype.at) {
  require("array.prototype.at/auto");
}

const makeRequestParam = (
  messages: Message[],
  options?: {
    filterBot?: boolean;
    stream?: boolean;
  }
): ChatRequest => {
  let sendMessages = messages.map((v) => ({
    role: v.role,
    content: v.content,
  }));

  if (options?.filterBot) {
    sendMessages = sendMessages.filter((m) => m.role !== "assistant");
  }

  return {
    model: "gpt-3.5-turbo",
    conversation: sendMessages,
    stream: options?.stream,
  };
};

/**
 * 直接返回的请求
 * @param messages
 */
export async function requestChat(messages: Message[]) {
  const req: ChatRequest = makeRequestParam(messages, { filterBot: true });

  const res = await fetcher("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  return (await res.json()) as ChatReponse;
}

/**
 * 流式传输的请求
 */
export async function requestChatStream(
  messages: Message[],
  options?: {
    filterBot?: boolean;
    modelConfig?: ModelConfig;
    onMessage: (message: string, done: boolean) => void;
    onBlock: () => void;
    onError: (error: Error) => void;
    onController?: (controller: AbortController) => void;
  }
) {
  const userStore = useUserStore.getState();

  const req = makeRequestParam(messages, {
    stream: true,
    filterBot: options?.filterBot,
  });

  // valid and assign model config
  if (options?.modelConfig) {
    Object.assign(req, filterConfig(options.modelConfig));
  }

  console.log("[Request] ", req);

  const controller = new AbortController();
  const reqTimeoutId = setTimeout(() => controller.abort(), TIME_OUT_MS);

  try {
    const res = await fetcher(
      options?.modelConfig?.model === "newbing"
        ? "/api/bots/newbing"
        : "/api/bots/openai",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
        signal: controller.signal,
      }
    );
    clearTimeout(reqTimeoutId);

    let responseText = "";

    const finish = () => {
      options?.onMessage(responseText, true);
      controller.abort();
    };

    if (res.ok) {
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      options?.onController?.(controller);

      while (true) {
        // handle time out, will stop if no response in 10 secs
        const resTimeoutId = setTimeout(() => finish(), TIME_OUT_MS);
        const content = await reader?.read();
        clearTimeout(resTimeoutId);
        const text = decoder.decode(content?.value);
        responseText += text;

        const done = !content || content.done;
        options?.onMessage(responseText, false);

        if (done) {
          break;
        }
      }

      finish();
    } else {
      switch (res.status) {
        case 401:
          console.error("Anauthorized");
          responseText = Locale.Error.Unauthorized;
          userStore.updateSessionToken("");
          return finish();

        case 402:
          console.error("Block");
          responseText = Locale.Error.ContentBlock;
          options?.onBlock();
          return finish();

        case 429:
          const data = await res.json();
          switch (data.code) {
            case LimitReason.TooMany:
              responseText = Locale.Error.TooManyRequests;
              break;
            case LimitReason.TooFast:
              responseText = Locale.Error.TooFastRequests;
              break;
            default:
              break;
          }
          return finish();

        default:
          console.error("Stream Error");
          options?.onError(new Error("Stream Error"));
      }
    }
  } catch (err) {
    console.error("NetWork Error", err);
    options?.onError(err as Error);
  }
}

export async function requestWithPrompt(messages: Message[], prompt: string) {
  messages = messages.concat([
    {
      role: "user",
      content: prompt,
      date: new Date().toLocaleString(),
    },
  ]);

  const res = await requestChat(messages);
  // FIXME: 有时候会返回空的内容
  return res.choices.at(0)?.message?.content ?? "";
}

// To store message streaming controller
export const ControllerPool = {
  controllers: {} as Record<string, AbortController>,

  addController(
    sessionIndex: number,
    messageIndex: number,
    controller: AbortController
  ) {
    const key = this.key(sessionIndex, messageIndex);
    this.controllers[key] = controller;
    return key;
  },

  stop(sessionIndex: number, messageIndex: number) {
    const key = this.key(sessionIndex, messageIndex);
    const controller = this.controllers[key];
    console.log(controller);
    controller?.abort();
  },

  remove(sessionIndex: number, messageIndex: number) {
    const key = this.key(sessionIndex, messageIndex);
    delete this.controllers[key];
  },

  key(sessionIndex: number, messageIndex: number) {
    return `${sessionIndex},${messageIndex}`;
  },
};
