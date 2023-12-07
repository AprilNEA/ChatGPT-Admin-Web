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
