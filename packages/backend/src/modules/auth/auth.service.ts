import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/processors/database/prisma.service';
import { Prisma, Role } from '@prisma/client';
import { compare, hashSync } from 'bcrypt';
import { JwtService } from '@libs/jwt';
import { RedisService } from '@libs/redis/redis.service';
import { EmailService } from '@libs/email/email.service';
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
    private prisma: PrismaService,
    private jwt: JwtService,
    private redisService: RedisService,
    private emailService: EmailService,
  ) {}

  async requestCode(identity: string) {
    const { email, phone } = getPhoneOrEmail(identity);
    const code = await this.redisService.authCode.new(identity);

    if (!email) {
      return {
        success: await this.emailService.sendCode(identity, code),
      };
    } else {
    }
  }

  async loginByCode(identity: string, code: string) {
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

  async loginByPassword({ identity, password }: ByPassword) {
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

  /**
   * 注册
   */
  async registerByPassword(code: string, { identity, password }: ByPassword) {
    const { email, phone } = getPhoneOrEmail(identity);

    const isValid = await this.redisService.authCode.valid(
      email || phone,
      code,
    );
    if (!isValid) {
      throw Error('Invalid code');
    }
    const existUser = await this.prisma.user.findMany({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    if (existUser.length > 0) {
      throw Error('User already exists');
    }
    const userInput: Prisma.UserCreateInput = {
      name: `user-${Math.random().toString(36).slice(2)}`,
      email: email,
      password: await hashSync(password, SALT_ROUNDS),
      role: Role.User,
    };
    const user = await this.prisma.user.create({ data: userInput });
    return this.jwt.sign({ id: user.id, role: user.role });
  }
}
