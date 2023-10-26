export type IAccountStatus = "bind" | "password" | "block" | "ok";

export interface identityDto {
  identity: string;
}

export interface requestCodeDto {
  identity: string;
}

export interface validateCodeDto {
  identity: string;
  code: string;
}

export interface forgetPasswordDto {
  identity: string;
  code: string;
  newPassword: string;
}

export interface byPasswordDto {
  identity: string;
  password: string;
}

export interface bindIdentityDto {
  identity: string;
  password?: string;
}
