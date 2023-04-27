export type RecordedMessage = {
  author: "user" | "bot";
  text: string;
};

export type BingGeneratorEvent =
  | {
      type: "DONE";
      text: string;
    }
  | {
      type: "ANSWER";
      answer: string;
    }
  | {
      type: "ERROR";
      error: unknown;
    }
  | {
      type: "RESET";
      text: string;
    }
  | {
      type: "QUERY";
      query: string;
    };

export interface POSTBody {
  userMessage: string;
  cookie: string;
  history?: RecordedMessage[];
}

export interface EventIteratorHandlers {
  onQuery: (query: string) => void;
  onAnswer: (answer: string) => void;
  onReset: (text: string) => void;
  onDone: (text: string) => void;
  onError: (error: unknown) => void;
}
