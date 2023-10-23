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

export interface byPasswordDto {
  identity: string;
  password: string;
}
