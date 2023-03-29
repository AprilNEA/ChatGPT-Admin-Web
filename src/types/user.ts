import {Cookie} from "@/lib/redis/typing";

export interface UserStore {
  cookie: Cookie | null;
  email: string;
  updateEmail: (email: string) => void;
  updateCookie: (cookie: Cookie) => void;
  validateCookie: () => boolean;
}
