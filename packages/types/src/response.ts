import { serverStatus } from "./server";

export interface RegisterResponse {
  status: serverStatus;
  sessionToken?: any;
}
