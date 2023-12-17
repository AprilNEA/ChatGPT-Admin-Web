/* Data Transfer Object */
export { AuthDTO, OrderDTO } from './dto';
/* Types */
export * from './types';
export * from './config';
export * from './chat';
export * from './order';
export * from './product';
export * from './types/database';
export * from './user';

export type BaseResponse<T> = BaseResponseSuccess<T> | BaseResponseFailure;

interface BaseResponseSuccess<T> {
  success: true;
  data: T;
}

interface BaseResponseFailure {
  success: false;
  code: ErrorCodeEnum;
  message: string;
}

export enum ErrorCodeEnum {
  /* 200 */
  OutOfQuota = 20001,

  /* 400 */
  // BadRequest = 40000,
  AdminExists = 40001,
  ConfigExists,

  /* 403 */
  AuthFail = 40300,
  PasswordError,
  CodeValidationError,
  UserNotExist,
  NameDuplicated,
  EmailDuplicated,
  PhoneDuplicated,
  BindNameExist,
  BindEmailExist,
  BindPhoneExist,
  BindPasswordExist,

  /* 404 */
  NotFound = 40400,
  SessionNotFound,

  /* 429 */
  TooManyRequests = 42900,

  /* 406 */
  ValidationError = 40600,

  /* 500 */
  ServerError = 50000,
  DatabaseError,
  RedisError,
  EmailError,
  EmailNotSetup,
  SmsError,
  SmsNotSetup,
  WechatError,

  UnknownError = 99999,
}
