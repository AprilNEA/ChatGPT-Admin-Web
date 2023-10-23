import { HttpException } from '@nestjs/common';
import { ErrorCodeEnum } from 'shared/dist/error-code';

export const ErrorCode = Object.freeze<
  Record<ErrorCodeEnum, [string, string, number]>
>({
  [ErrorCodeEnum.ValidationError]: ['validation failed', '验证失败', 400],
  [ErrorCodeEnum.PostNotFound]: ['post not found', '文章不存在', 404],
  [ErrorCodeEnum.PostExist]: ['post already exist', '文章已存在', 400],
  [ErrorCodeEnum.CategoryNotFound]: ['category not found', '分类不存在', 404],

  [ErrorCodeEnum.AuthFailUserNotExist]: [
    'auth failed, user not exist',
    '认证失败，用户不存在',
    400,
  ],
  [ErrorCodeEnum.UserNotFound]: ['user not found', '用户不存在', 404],
  [ErrorCodeEnum.UserExist]: ['user already exist', '用户已存在', 400],
});

export class BizException extends HttpException {
  constructor(code: ErrorCodeEnum) {
    const [message, chMessage, status] = ErrorCode[code];
    super(
      HttpException.createBody({ success: false, code, message, chMessage }),
      status,
    );
  }
}
