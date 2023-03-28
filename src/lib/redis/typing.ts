export interface User {
    username: string;
    password_hash: string;
    created_at: number;
    last_login: number;
    subscription_level: number;
    is_active_until: number;
    is_blocked: boolean;
  }
  