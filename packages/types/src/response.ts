import type {serverStatus} from "./server";
import {DALType} from "./dal";

export namespace ChatResponse {

  export interface TicketGet {
    status: serverStatus;
    ticket: string;
    expiredAt: string;
  }

  export interface UserLogin extends DALType.UserLogin {
    status: serverStatus;
  }

  export interface UserRegister extends DALType.UserRegister {
    status: serverStatus;
  }

  export interface UserRegisterCode {
    status: serverStatus;
    expiredAt: Date;
  }

  export interface PlanGet {
    status: serverStatus;
    plans: DALType.Plan[];
  }
}

export interface RegisterResponse {
  status: serverStatus;
  sessionToken?: any;
}
