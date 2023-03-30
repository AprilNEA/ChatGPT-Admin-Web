export interface Limit {
  last_request: number;
  requests: number[];
}

export interface Cookie {
  key: string;
  email: string;
  exp: number;
  activated?: boolean;
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
