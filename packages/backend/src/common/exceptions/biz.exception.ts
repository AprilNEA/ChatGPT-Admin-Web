import { HttpException } from '@nestjs/common';

import { ErrorCodeEnum } from 'shared/dist/error-code';

export const ErrorCode = Object.freeze<Record<ErrorCodeEnum, [string, string]>>(
  {
    /* 403 */
    [ErrorCodeEnum.AuthFail]: ['Auth failed', '认证失败'],
    [ErrorCodeEnum.PasswordError]: ['The password is incorrect', '密码错误'],
    [ErrorCodeEnum.CodeValidationError]: [
      'The validation code is incorrect',
      '验证码错误',
    ],
    [ErrorCodeEnum.UserNotExist]: [
      'Auth failed, the user not exist',
      '认证失败，用户不存在',
    ],
    [ErrorCodeEnum.PhoneDuplicated]: [
      'The phone already bind with another account',
      '手机号ban',
    ],
    [ErrorCodeEnum.EmailDuplicated]: [
      'This email already bind with another account',
      '邮箱已存在',
    ],
    [ErrorCodeEnum.BindEmailExist]: [
      'The account already bind with email',
      '邮箱已存在',
    ],
    [ErrorCodeEnum.BindPhoneExist]: [
      'The account already bind with phone',
      '手机已存在',
    ],
    /* 404 */
    [ErrorCodeEnum.NotFound]: ['Not found', '未找到'],
    [ErrorCodeEnum.SessionNotFound]: ['Session not found', '会话未找到'],

    /* 429 */
    [ErrorCodeEnum.TooManyRequests]: ['Too many requests', '请求过多'],

    /* 406 */
    [ErrorCodeEnum.ValidationError]: [
      'Request data validation error',
      '请求参数错误',
    ],

    /* 500 */
    [ErrorCodeEnum.ServerError]: ['Server error', '服务器错误'],
    [ErrorCodeEnum.DatabaseError]: ['Database error', '数据库错误'],
    [ErrorCodeEnum.RedisError]: ['Redis error', 'Redis错误'],
    [ErrorCodeEnum.EmailError]: ['Email error', '邮件错误'],
    [ErrorCodeEnum.SmsError]: ['Sms error', '短信错误'],
    [ErrorCodeEnum.WechatError]: ['Wechat error', '微信错误'],
  },
);

export class BizException extends HttpException {
  constructor(code: ErrorCodeEnum) {
    const [message, chMessage] = ErrorCode[code];
    super(
      HttpException.createBody({ success: false, code, message, chMessage }),
      200,
    );
  }
}
