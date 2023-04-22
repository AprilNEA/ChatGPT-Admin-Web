import { z } from "zod";

export enum RegisterReturnStatus {
  Success,
  AlreadyRegister,
  TooFast,
  UnknownError,
}
export const registerReturnStatus = z.nativeEnum(RegisterReturnStatus);

export const registerCodeType = z.enum(["email", "phone"]);
export type RegisterCodeType = z.infer<typeof registerCodeType>;
