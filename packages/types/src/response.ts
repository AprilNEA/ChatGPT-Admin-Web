import type { serverStatus } from "./server";
import { DALType } from "./dal";

export namespace ChatResponse {
  export interface UserRegister extends DALType.UserRegister {
    status: serverStatus;
  }
}

export interface RegisterResponse {
  status: serverStatus;
  sessionToken?: any;
}
