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
    subscriptions: Subscription[];
  };

  // key: user:${email} .subscriptions
  export type Subscription = {
    startsAt: number;
    endsAt: number;
    level: SubscriptionLevel;
    tradeOrderId: string;
  };

  export enum SubscriptionLevel {
    // use 10 and 20 to leave room for feature
    PRO = 10,
    PRO_PLUS = 20,
  }

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

  // key: auditLog:${type}
  export type AuditLog = {
    timestamp: number;
    ip: string;
    userEmail: string;
  };

  // key: auditLog:payment:${tradeOrderId}
  export type PaymentAudioLog = AuditLog & {
    cents: number; // use integer to avoid inaccuracy of IEEE754
    appid: string;
    transactionId: string;
    openOrderId: string;
  };
}
