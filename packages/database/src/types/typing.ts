export type Role = 'user' | 'mod' | 'admin';
export type Plan = 'free' | 'pro' | 'premium';

export namespace Register {
  export type CodeType = 'email' | 'phone';
  export type InvitationCodeType = 'club' | 'team';

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
    email?: string;
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
    role: Role;
  };

  // key: user:${email} .subscriptions
  export type Subscription = {
    startsAt: number;
    endsAt: number;
    plan: Plan;
    tradeOrderId: string;
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
    limit: number;
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
  export type PaymentAuditLog = AuditLog & {
    cents: number; // use integer to avoid inaccuracy of IEEE754
    appid: string;
    transactionId: string;
    openOrderId: string;
  };

  // key: order:${internalOrderId}
  export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded';

  // key: order:${internalOrderId}
  export type Order = {
    createdAt: number;
    totalCents: number; // 总金额
    plan: Plan;  // 订阅的套餐
    count: number; // 购买数量
    status: OrderStatus;
    email: string;
  };

  export type AnnouncementDate = `${number}-${number}-${number}`
  // key: announcement:{AnnouncementDate}
  export type Announcement = string
}
