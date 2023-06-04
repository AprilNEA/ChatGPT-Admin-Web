import type { serverStatus } from "./server";

export namespace DALType {
  export interface UserRegister {
    signedToken: {
      token: string;
      expiredAt: number;
    };
    invitation?: {
      status: serverStatus;
      inviter?: string;
    };
  }
}
