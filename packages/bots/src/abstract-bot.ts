import { AnswerParams, ChatBot } from "./types";
import { readableStreamFromIterable } from "./lib/readable-stream-from-iterable";
import { TextEncoderStreamPonyfill } from "./lib/ponyfill";

export abstract class AbstractBot implements ChatBot {
  protected abstract doAnswer(params: AnswerParams): AsyncIterable<string>;

  async *answer(params: AnswerParams): AsyncIterable<string> {
    try {
      for await (const token of this.doAnswer(params)) yield token;
    } catch (error) {
      if (!params.signal?.aborted) {
        console.error("[BOT]", error);
        yield "[ERROR]";
      }
      // ignore user abort exception
    }
  }

  answerStream(params: AnswerParams): ReadableStream<Uint8Array> {
    return readableStreamFromIterable(this.answer(params))
      .pipeThrough(new TextEncoderStreamPonyfill());
  }
}
