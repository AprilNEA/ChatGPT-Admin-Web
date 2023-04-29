export enum LimitReason {
  NoLimit,
  TooFast,
  TooMany,
  TextNotSafe,
}

export type SessionToken = {
  id: number;
  token: string;
  createdAt: Date | number;
  expiresAt: Date | number;
  isRevoked: boolean;
  userEmail: string;
};
