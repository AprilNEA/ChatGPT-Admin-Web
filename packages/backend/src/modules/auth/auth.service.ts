import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/processors/database/database.service';
import { Prisma, Role } from '@prisma/client';
import { compare, hashSync } from 'bcrypt';
import { JwtService } from '@/libs/jwt/jwt.service';
import { RedisService } from '@/processors/redis/redis.service';
import { EmailService } from '@/libs/email/email.service';
import * as Joi from 'joi';

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
    return { email: identity, phone: undefined };
  } else if (!phoneValidation.error) {
    return { email: undefined, phone: identity };
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
  ) {}

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

  /* 通过验证码登录 */
  async WithValidateCode(identity: string, code: string) {
    const { email, phone } = getPhoneOrEmail(identity);

    const isValid = await this.redisService.authCode.valid(identity, code);
    if (!isValid) {
      throw Error('Invalid code');
    }
    const existUser = await this.prisma.user.findMany({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    let user;
    if (existUser.length != 1) {
      user = await this.prisma.user.create({
        data: {
          name: `user${Math.random().toString(36).slice(2)}`,
          email: email,
          phone: phone,
          role: Role.User,
        },
      });
    } else {
      user = existUser[0];
    }
    return this.jwt.sign({ id: user.id, role: user.role });
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
    return this.jwt.sign({ id: user[0].id, role: user[0].role });
  }

  /* 添加密码 */
  async bindPassword(userId: number, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user.password) {
      throw Error('Password already exists');
    }
    this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashSync(password, SALT_ROUNDS),
      },
    });
  }

  /* 绑定用户身份 */
  async bindIdentity(userId: number, identity: string) {}
}
