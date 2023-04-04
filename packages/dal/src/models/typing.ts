export namespace Register {
  export type CodeType = "email" | "phone";

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
    phone: string | null;
    createdAt: number;
    lastLoginAt: number;
    isBlocked: boolean;
  };

  export type SessionToken = {
    createdAt: number;
    isRevoked: boolean;
    userEmail: string;
  };
}
