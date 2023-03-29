export interface Limit {
  requests: number[];
}

export interface Cookie {
  key: string;
  email: string;
  exp: number;
}

export interface User {
  email: string;
  password_hash: string;
  created_at: number;
  last_login: number;
  subscription_level: number;
  subscription_until: number;
  is_activated: boolean
  is_blocked: boolean;
}
