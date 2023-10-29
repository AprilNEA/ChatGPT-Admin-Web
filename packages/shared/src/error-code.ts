export enum ErrorCodeEnum {
  /* 403 */
  AuthFail = 40300,
  PasswordError = 40301,
  CodeValidationError = 40302,
  UserNotExist = 40303,
  EmailDuplicated = 40304,
  PhoneDuplicated = 40305,
  BindEmailExist = 40306,
  BindPhoneExist = 40307,

  /* 404 */
  NotFound = 40400,
  SessionNotFound = 40401,

  /* 429 */
  TooManyRequests = 42900,

  /* 406 */
  ValidationError = 40600,

  /* 500 */
  ServerError = 50000,
  DatabaseError = 50001,
  RedisError = 50002,
  EmailError = 50003,
  SmsError = 50004,
  WechatError = 50005,
}
