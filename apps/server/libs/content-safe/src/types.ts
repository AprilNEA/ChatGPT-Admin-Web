export type FilterData = {
  words: string[];
  text: string;
};

export type MintWorkerInput =
  | {
      type: 'set-keys';
      keys: string[];
    }
  | {
      type: 'filter';
      text: string;
      replace?: boolean;
    }
  | {
      type: 'verify';
      text: string;
    };

export type MintWorkerOutput =
  | { type: 'set-keys' }
  | { type: 'filter'; data: FilterData }
  | { type: 'verify'; pass: boolean };
