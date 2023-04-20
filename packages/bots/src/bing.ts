import { AbstractBot } from "./abstract-bot";
import { AnswerParams, BingEvent, BingEventType, BingPayload } from "./types";
import { streamToLineIterator } from "./utils";

const REQUEST_URL = "https://lmo.deno.dev/chat";

export class BingBot extends AbstractBot {
  constructor(private cookie: string) {
    super();
  }

  protected override async *doAnswer(
    { conversation, signal }: AnswerParams,
  ): AsyncIterable<string> {
    const userMessage = conversation.at(-1);
    if (!userMessage) {
      throw new Error("User message not found");
    }

    const payload: BingPayload = {
      userMessage: userMessage.content,
      history: conversation.slice(0, -1)
        .map(({ role, content }) => ({
          author: role === "assistant" ? "bot" : role,
          text: content,
        })),
      cookie: this.cookie,
    };

    const response = await fetch(REQUEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}: ${await response.text()}`);
    }

    for await (const line of streamToLineIterator(response.body!)) {
      if (line.startsWith("data:")) {
        const event: BingEvent = JSON.parse(line.slice("data:".length));
        switch (event.type) {
          case BingEventType.ANSWER: {
            yield event.answer;
            break;
          }
          case BingEventType.QUERY: {
            yield event.query;
            break;
          }
          case BingEventType.RESET: {
            return;
          }
          case BingEventType.DONE: {
            return;
          }
          case BingEventType.ERROR: {
            throw new Error(`Bing: ${event.error}`);
          }
        }
      }
    }
  }
}
