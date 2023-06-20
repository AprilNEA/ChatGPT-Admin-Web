import type { serverStatus } from "./server";

export namespace DALType {
  export type Price = {
    id: number;
    name: string;
    amount: number;
    duration: number;
  };

  export type Limit = {
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
    features: string[];
    prices: Price[];
    limits: Limit[];
  }

  export interface newPlan {
    name: string;
    prices: Price[];
    limits: Limit[];
  }
}
