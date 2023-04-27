import { Role, Plan } from "database";

export enum ResponseStatus {
  Success,
  Failed,
  TOO_FAST,
  invalidCode,
  notExist,
  alreadyExisted,
  CONTENT_BLOCK,
  wrongPassword,
}

export enum ReturnStatus {
  SUCCESS,
  FAILED,
  TOO_FAST,
  WRONG_CODE,
}

export enum MiddlewareStatus {
  AuthSuccess,
  AuthFailed,
  RateLimit,
}

export interface RegisterResponse {
  status: ResponseStatus;
  sessionToken?: any;
}

export interface InfoResponse {
  status: ResponseStatus;
  email: string;
  role: Role;
  plan: Plan;
  inviteCode: string;
  requestNos: number[];
  resetChances: number;
}
