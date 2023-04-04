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
  // key: user:${email}
  export type User = {
    name: string;
    passwordHash: string;
    createdAt: number;
    lastLoginAt: number;
    isBlocked: boolean;
    resetChances: number;
    inviterCode?: string;
    invitationCodes: string[];
    phone?: string;
  };

  // key: sessionToken:${token}
  export type SessionToken = {
    createdAt: number;
    isRevoked: boolean;
    userEmail: string;
  };

  // key: invitationCode:${code}
  export type InvitationCode = {
    type: string;
    inviterEmail: string;
    inviteeEmails: string[];
  };
}
