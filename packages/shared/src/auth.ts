/* 账号可能存在的状态
 * bind: 需要绑定账户，通常为 OAuth
 * password: 需要设置密码
 * block: 被禁用
 * ok: 正常 */
export type IAccountStatus = 'bind' | 'password' | 'block' | 'ok';

/* 认证 DTO */
export interface identityDto {
  identity: string;
}

/* 验证验证码 DTO */
export interface validateCodeDto {
  identity: string;
  code: string;
}

/* 忘记密码 DTO */
export interface forgetPasswordDto {
  identity: string;
  code: string;
  newPassword: string;
}
