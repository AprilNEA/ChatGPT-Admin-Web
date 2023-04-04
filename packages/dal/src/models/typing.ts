export namespace Register {
  export type CodeType = 'email' | 'phone';

  export enum ReturnStatus {
    Success,
    AlreadyRegister,
    TooFast,
    UnknownError,
  }
}

export namespace Model {
  export type User = {
    name: string;
    passwordHash: string;
    createdAt: number;
    lastLoginAt: number;
    isBlocked: boolean;
    resetChances: number;
    invitedByCode?: string;
    phone?: string;
  };

  export type SessionToken = {
    createdAt: number;
    isRevoked: boolean;
    userEmail: string;
  };
}
