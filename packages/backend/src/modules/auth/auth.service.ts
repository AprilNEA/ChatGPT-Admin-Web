import { compare, hashSync } from 'bcrypt';
import { Redis } from 'ioredis';
import * as Joi from 'joi';
import { CustomPrismaService } from 'nestjs-prisma';

import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

import { BizException } from '@/common/exceptions/biz.exception';
import { EmailService } from '@/libs/email/email.service';
import { JwtService } from '@/libs/jwt/jwt.service';
import { SmsService } from '@/libs/sms/sms.service';
import { ExtendedPrismaClient } from '@/processors/database/prisma.extension';

import { IAccountStatus } from 'shared';
import { ErrorCodeEnum } from 'shared';

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

function generateRandomSixDigitNumber() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
    private jwt: JwtService,
    private emailService: EmailService,
    private smsService: SmsService,
  ) {}

  /* 通常来说是最后一步：
   * 1. 检查是否绑定账户
   * 2. 检查是否设置密码
   */
  async #signWithCheck(user: any) {
    let status: IAccountStatus = 'ok';
    if (!user.email && !user.phone) {
      status = 'bind';
    } else if (!user.newPassword) {
      status = 'password';
    }
    return {
      sessionToken: await this.jwt.sign({ id: user.id, role: user.role }),
      refreshToken: await this.jwt.sign(
        { id: user.id, role: user.role },
        30 * 24 * 60 * 60,
      ),
      status,
    };
  }

  async #verifyCode(identity: string, code: string) {
    const isValid = (await this.redis.get(identity)) === code;

    if (!isValid) {
      throw new BizException(ErrorCodeEnum.CodeValidationError);
    } else {
      await this.redis.del(identity);
    }
  }

  async #register({
    identity,
    password,
  }: {
    identity: string;
    password?: string;
  }) {
    const { email, phone } = getPhoneOrEmail(identity);

    const existUser = await this.prisma.client.user.findMany({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    let user;
    if (existUser.length != 1) {
      // 注册用户
      user = await this.prisma.client.user.create({
        data: {
          email: email,
          phone: phone,
          role: Role.User,
          password: password ? hashSync(password, SALT_ROUNDS) : undefined,
        },
      });
    } else {
      user = existUser[0];
    }
    return this.#signWithCheck(user);
  }

  /* 添加验证码 */
  async newValidateCode(identity: string) {
    const { email, phone } = getPhoneOrEmail(identity);
    if (!email && !phone) {
      return {
        success: false,
      };
    }
    const ttl = await this.redis.ttl(identity);
    /* if key not exist, ttl will be -2 */
    if (600 - ttl < 60) {
      return {
        success: false,
        ttl,
      };
    } else {
      const newTtl = 10 * 60;
      const code = generateRandomSixDigitNumber();
      await this.redis.setex(identity, newTtl, code);

      if (email) {
        if (!this.emailService.status()) {
          throw new BizException(ErrorCodeEnum.EmailNotSetup);
        }
        await this.emailService.sendCode(identity, code);
      } else if (phone) {
        if (!this.smsService.status()) {
          throw new BizException(ErrorCodeEnum.SmsNotSetup);
        }
        await this.smsService.sendCode(identity, code);
      }

      return {
        success: true,
        ttl: newTtl,
      };
    }
  }

  /* Only used when email and sms service both disabled */
  registerPassword(data: ByPassword) {
    return this.#register(data);
  }

  /* 通过验证码登录/注册 */
  async withValidateCode(identity: string, code: string) {
    const { email, phone } = getPhoneOrEmail(identity);

    await this.#verifyCode(identity, code);

    return this.#register({ identity });
  }

  /* 通过密码登录 */
  async loginPassword({ identity, password }: ByPassword) {
    const { email, phone } = getPhoneOrEmail(identity);

    const user = await this.prisma.client.user.findMany({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    if (user.length != 1) {
      throw new BizException(ErrorCodeEnum.UserNotExist);
    }
    const isPasswordCorrect = await compare(password, user[0].password);
    if (!isPasswordCorrect) {
      throw new BizException(ErrorCodeEnum.PasswordError);
    }
    return this.#signWithCheck(user[0]);
  }

  /* 添加密码 */
  async initPassword(userId: number, password: string) {
    const user = await this.prisma.client.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    if (user.password) {
      throw new BizException(ErrorCodeEnum.BindPasswordExist);
    }
    return await this.prisma.client.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashSync(password, SALT_ROUNDS),
      },
    });
  }

  /* 用户名不可修改 */
  async initUsername(userId: number, name: string) {
    const user = await this.prisma.client.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    if (user.name) {
      throw new BizException(ErrorCodeEnum.NameDuplicated);
    } else {
      await this.prisma.client.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
        },
      });
    }
  }

  /* Utils to change user password
   * old password will be checked when old password is passed
   */
  async changePassword({
    userId,
    newPassword,
    oldPassword,
  }: {
    userId: number;
    newPassword: string;
    oldPassword?: string;
  }) {
    if (oldPassword) {
      const user = await this.prisma.client.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });
      const isPasswordCorrect = await compare(oldPassword, user.password);
      if (!isPasswordCorrect) {
        throw new BizException(ErrorCodeEnum.PasswordError);
      }
    }
    await this.prisma.client.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashSync(newPassword, SALT_ROUNDS),
      },
    });
  }

  /* 找回密码 */
  async forgetPassword(identity: string, code: string, password: string) {
    const { email, phone } = getPhoneOrEmail(identity);

    await this.#verifyCode(identity, code);

    const existUser = await this.prisma.client.user.findMany({
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
    await this.changePassword({ userId: user.id, newPassword: password });

    return this.#signWithCheck(user);
  }

  /* 绑定用户身份 */
  async bindIdentity(userId: number, identity: string, init = false) {
    const { email, phone } = getPhoneOrEmail(identity);

    const user = await this.prisma.client.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    if (email) {
      if (user.email) {
        throw new BizException(ErrorCodeEnum.BindEmailExist);
      }
      await this.prisma.client.user.update({
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
      await this.prisma.client.user.update({
        where: {
          id: userId,
        },
        data: {
          phone: phone,
        },
      });
    }
  }

  async initAdmin(identity: string, password: string) {
    if ((await this.prisma.client.user.count()) > 0) {
      throw new BizException(ErrorCodeEnum.AdminExists);
    }
    const { email, phone } = getPhoneOrEmail(identity);
    await this.prisma.client.user.create({
      data: {
        role: Role.Admin,
        email,
        phone,
        password: hashSync(password, SALT_ROUNDS),
      },
    });
  }

  async refresh(userId: number, userRole: string) {
    return this.#signWithCheck({ id: userId, role: userRole });
  }
}
