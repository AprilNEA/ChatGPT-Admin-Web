// key: user:${email}
export type User = {
  createdAt: number;
  name: string;
  passwordHash: string;
  lastLoginAt: number;
  isBlocked: boolean;
  resetChances: number;
  invitationCodes: string[];
  subscriptions: {
    plan: string;
    startsAt: number;
    endsAt: number;
    tradeOrderId: string;
  }[];
  role: "user" | "mod" | "admin";
  inviterCode?: string;
  phone?: string;
};

// key: order:${internalOrderId}
export type Order = {
  status: "pending" | "paid" | "failed" | "refunded";
  createdAt: number;
  totalCents: number;
  plan: string;
  count: number;
  email: string;
};

type Unit = "ms" | "s" | "m" | "h" | "d";

// key: plan:${planName}
export type Plan = {
  prices: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  limits: Record<string, {
    window: `${number} ${Unit}` | `${number}${Unit}`;
    limit: number;
  }>;
};

// key: invitationCode:${code}
export type InvitationCode = {
  type: string;
  limit: number;
  inviterEmail: string;
  inviteeEmails: string[];
  validOrders?: string[] | undefined;
};
