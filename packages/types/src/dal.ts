import type { serverStatus } from "./server";

export namespace DALType {
  type Price = {
    name: string;
    amount: number;
    duration: number;
  };

  type Limit = {
    modelName: string;
    times: number;
    duration: number;
  };

  export interface UserLogin {
    signedToken: {
      token: string;
      expiredAt: number;
    };
  }

  export interface UserRegister extends UserLogin {
    invitation?: {
      status: serverStatus;
      inviter?: string;
    };
  }

  export interface Plan {
    planId: number;
    name: string;
    prices: Price[];
    limits: Limit[];
  }

  export interface newPlan {
    name: string;
    prices: Price[];
    limits: Limit[];
  }
}
