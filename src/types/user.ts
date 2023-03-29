export interface UserStore {
  cookie: string;
  email: string;
  Login: (email: string, password: string) => string;
}
