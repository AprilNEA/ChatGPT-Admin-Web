export interface requestCodeDto {
  identity: string;
}

export interface loginByCodeDto extends requestCodeDto {
  code: string;
}

export interface byPasswordDto extends requestCodeDto {
  password: string;
}
