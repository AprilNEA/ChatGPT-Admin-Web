export namespace Register {
  export type CodeType = 'email' | 'phone';

  export enum ReturnStatus {
    Success,
    AlreadyRegister,
    TooFast,
    UnknownError
  }
}
