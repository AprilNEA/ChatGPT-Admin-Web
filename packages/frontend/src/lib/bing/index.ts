import {
  BingGeneratorEvent,
  EventIteratorHandlers,
  POSTBody,
  RecordedMessage,
} from "./types";
import { TextDecoderStreamPolyfill, TextLineStream } from "./utils";

export type { BingGeneratorEvent, POSTBody, RecordedMessage };

const API_ENDPOINT = "https://bing.p1xl.me/chat";

/**
 * (Backend Only)
 */
export function sendMessageAndGetStream(
  body: POSTBody
): Promise<ReadableStream<Uint8Array>> {
  return fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.body!);
}

/**
 * (Frontend and Backend)
 */
export async function* streamToEventGenerator(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<BingGeneratorEvent> {
  const lineStream = stream
    .pipeThrough(
      window.TextDecoderStream
        ? new TextDecoderStream()
        : new TextDecoderStreamPolyfill()
    )
    .pipeThrough(new TextLineStream());

  const reader = lineStream.getReader();

  while (true) {
    const { done, value: line } = await reader.read();
    if (done) break;

    if (line.startsWith("data:")) {
      yield JSON.parse(line.slice("data:".length));
    }
  }

  reader.releaseLock();
}

/**
 * (Frontend and Backend)
 */
export async function handleEventIterator(
  iterator: AsyncIterableIterator<BingGeneratorEvent>,
  {
    onQuery,
    onAnswer,
    onReset,
    onDone,
    onError,
  }: Partial<EventIteratorHandlers> = {}
) {
  for await (const event of iterator) {
    switch (event.type) {
      case "ANSWER":
        onAnswer?.(event.answer);
        break;
      case "QUERY":
        onQuery?.(event.query);
        break;
      case "RESET":
        onReset?.(event.text);
        break;
      case "DONE":
        onDone?.(event.text);
        break;
      case "ERROR":
        onError?.(event.error);
        break;
    }
  }
}
