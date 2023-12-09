import { HttpException } from '@nestjs/common';

import { ErrorCodeEnum } from 'shared';

export const ErrorCode = Object.freeze<
  Record<ErrorCodeEnum, [string, string, number]>
>({
  /* Service Error */
  [ErrorCodeEnum.OutOfQuota]: [
    'You have exceeded your current planned usage',
    '您已超出当前计划的用量',
    429,
  ],

  /* 400 */
  [ErrorCodeEnum.AdminExists]: ['Admin already exists', '管理员已存在', 400],
  [ErrorCodeEnum.ConfigExists]: ['Config already exists', '配置已存在', 400],

  /* 403 */
  [ErrorCodeEnum.AuthFail]: ['Auth failed', '认证失败', 401],
  [ErrorCodeEnum.PasswordError]: ['The password is incorrect', '密码错误', 400],
  [ErrorCodeEnum.CodeValidationError]: [
    'The validation code is incorrect',
    '验证码错误',
    400,
  ],
  [ErrorCodeEnum.UserNotExist]: [
    'Auth failed, the user not exist',
    '认证失败，用户不存在',
    400,
  ],
  [ErrorCodeEnum.PhoneDuplicated]: [
    'The phone already bind with another account',
    '该手机号已与另一个账户绑定',
    400,
  ],
  [ErrorCodeEnum.EmailDuplicated]: [
    'This email already bind with another account',
    '该邮箱已与另一个账户绑定',
    400,
  ],
  [ErrorCodeEnum.NameDuplicated]: [
    'This name is already taken',
    '此名称已被占用',
    400,
  ],
  [ErrorCodeEnum.BindEmailExist]: [
    'The account already bind with email',
    '邮箱已存在',
    400,
  ],
  [ErrorCodeEnum.BindPhoneExist]: [
    'The account already bind with phone',
    '手机已存在',
    400,
  ],
  [ErrorCodeEnum.BindNameExist]: [
    'The account already had name',
    '此账户已有名称',
    400,
  ],
  [ErrorCodeEnum.BindPasswordExist]: [
    'The account already had password',
    '此账户已有密码',
    400,
  ],

  /* 404 */
  [ErrorCodeEnum.NotFound]: ['Not found', '未找到', 400],
  [ErrorCodeEnum.SessionNotFound]: ['Session not found', '会话未找到', 400],

  /* 429 */
  [ErrorCodeEnum.TooManyRequests]: ['Too many requests', '请求过多', 400],

  /* 406 */
  [ErrorCodeEnum.ValidationError]: [
    'Request data validation error',
    '请求参数错误',
    400,
  ],

  /* 500 */
  [ErrorCodeEnum.ServerError]: ['Server error', '服务器错误', 500],
  [ErrorCodeEnum.DatabaseError]: ['Database error', '数据库错误', 500],
  [ErrorCodeEnum.RedisError]: ['Redis error', 'Redis错误', 500],
  [ErrorCodeEnum.EmailError]: ['Email error', '邮件错误', 500],
  [ErrorCodeEnum.EmailNotSetup]: ['Email not setup', '邮件未设置', 500],
  [ErrorCodeEnum.SmsError]: ['Sms error', '短信错误', 500],
  [ErrorCodeEnum.SmsNotSetup]: ['Sms not setup', '短信未设置', 500],
  [ErrorCodeEnum.WechatError]: ['Wechat error', '微信错误', 500],
  [ErrorCodeEnum.UnknownError]: ['Unknown error', '未知错误', 500],
});

export class BizException extends HttpException {
  code: ErrorCodeEnum;

  constructor(code: ErrorCodeEnum) {
    const [message, chMessage, statusCode] = ErrorCode[code];
    super(
      HttpException.createBody({ success: false, code, message, chMessage }),
      statusCode,
    );

    this.code = code;
  }
}
