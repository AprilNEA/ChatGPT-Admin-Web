import { compare, hashSync } from 'bcrypt';
import * as Joi from 'joi';

import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

import { BizException } from '@/common/exceptions/biz.exception';
import { EmailService } from '@/libs/email/email.service';
import { JwtService } from '@/libs/jwt/jwt.service';
import { SmsService } from '@/libs/sms/sms.service';
import { DatabaseService } from '@/processors/database/database.service';
import { RedisService } from '@/processors/redis/redis.service';

import { IAccountStatus } from 'shared';
import { ErrorCodeEnum } from 'shared/dist/error-code';

type ByPassword = {
  identity: string;
  password: string;
};

const SALT_ROUNDS = 10;

const emailSchema = Joi.string().email().required();
const phoneSchema = Joi.string()
  .pattern(/^[0-9]{11}$/)
  .required();

const getPhoneOrEmail = (identity: string) => {
  const emailValidation = emailSchema.validate(identity);
  const phoneValidation = phoneSchema.validate(identity);

  if (!emailValidation.error) {
    return { email: identity.trim().toLowerCase(), phone: undefined };
  } else if (!phoneValidation.error) {
    return { email: undefined, phone: identity.trim() };
  } else {
    throw Error('Invalid identity');
  }
};

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: DatabaseService,
    private redisService: RedisService,
    private emailService: EmailService,
    private smsService: SmsService,
  ) {}

  /* 通常来说是最后一步：
   * 1. 检查是否绑定账户
   * 2. 检查是否设置密码
   */
  async _signWithCheck(user: any): Promise<{
    token: string;
    status: IAccountStatus;
  }> {
    let status: IAccountStatus = 'ok';
    if (!user.email && !user.phone) {
      status = 'bind';
    } else if (!user.password) {
      status = 'password';
    }
    return {
      token: await this.jwt.sign({ id: user.id, role: user.role }),
      status,
    };
  }

  /* 添加验证码 */
  async newValidateCode(identity: string) {
    const { email, phone } = getPhoneOrEmail(identity);
    if (!email && !phone) {
      return {
        success: false,
      };
    }

    /* 10分钟内仅可发送一次 */
    const code = await this.redisService.authCode.new(identity);

    if (code.success) {
      if (email) {
        await this.emailService.sendCode(identity, code.code);
      } else if (phone) {
        await this.smsService.sendCode(identity, code.code);
      }
      return {
        success: true,
        ttl: code.ttl,
      };
    } else {
      return {
        success: false,
        ttl: code.ttl,
      };
    }
  }

  /* 通过验证码登录/注册 */
  async WithValidateCode(identity: string, code: string) {
    const { email, phone } = getPhoneOrEmail(identity);

    const isValid = await this.redisService.authCode.valid(identity, code);

    if (!isValid) {
      throw new BizException(ErrorCodeEnum.CodeValidationError);
    }

    const existUser = await this.prisma.user.findMany({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    let user;
    if (existUser.length != 1) {
      // 注册用户
      user = await this.prisma.user.create({
        data: {
          email: email,
          phone: phone,
          role: Role.User,
        },
      });
    } else {
      user = existUser[0];
    }
    return this._signWithCheck(user);
  }

  /* 通过密码登录 */
  async loginPassword({ identity, password }: ByPassword) {
    const { email, phone } = getPhoneOrEmail(identity);

    const user = await this.prisma.user.findMany({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    if (user.length != 1) {
      throw Error('User does not exist');
    }
    const isPasswordCorrect = await compare(password, user[0].password);
    if (!isPasswordCorrect) {
      throw Error('Password is incorrect');
    }
    return this._signWithCheck(user[0]);
  }

  /* 添加密码 */
  async bindPassword(userId: number, password: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    if (user.password) {
      throw Error('Password already exists');
    }
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashSync(password, SALT_ROUNDS),
      },
    });
  }

  /* 修改密码 */
  async changePassword(userId: number, password: string) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashSync(password, SALT_ROUNDS),
      },
    });
  }

  /* 找回密码 */
  async forgetPassword(identity: string, code: string, password: string) {
    const { email, phone } = getPhoneOrEmail(identity);

    const isValid = await this.redisService.authCode.valid(identity, code);

    if (!isValid) {
      throw new BizException(ErrorCodeEnum.CodeValidationError);
    }

    const existUser = await this.prisma.user.findMany({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    let user;
    if (existUser.length != 1) {
      throw new BizException(ErrorCodeEnum.UserNotExist);
    } else {
      user = existUser[0];
    }
    await this.changePassword(user.id, password);

    return this._signWithCheck(user);
  }

  /* 绑定用户身份 */
  async bindIdentity(userId: number, identity: string, password?: string) {
    const { email, phone } = getPhoneOrEmail(identity);

    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    if (email) {
      if (user.email) {
        throw new BizException(ErrorCodeEnum.BindEmailExist);
      }
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email: email,
        },
      });
    }

    if (phone) {
      if (user.phone) {
        throw new BizException(ErrorCodeEnum.BindPhoneExist);
      }
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          phone: phone,
        },
      });
    }

    if (password) {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashSync(password, SALT_ROUNDS),
        },
      });
    }
  }
}
