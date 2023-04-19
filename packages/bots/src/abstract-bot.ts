import { AnswerParams } from "./types";

export abstract class AbstractBot {
  protected abstract doAnswer(params: AnswerParams): AsyncIterable<string>;

  answer(params: AnswerParams): AsyncIterable<string> {
    return this.doAnswer(params);
  }
}
