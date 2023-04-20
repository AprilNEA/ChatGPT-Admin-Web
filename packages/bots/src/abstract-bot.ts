import { AnswerParams } from "./types";

export abstract class AbstractBot {
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
}
