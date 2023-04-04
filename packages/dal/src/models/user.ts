import { prisma } from '../prisma/client';
import { redis } from '../redis/client';
import md5 from 'spark-md5';
import { generateRandomSixDigitNumber, isObjNonEmpty } from './utils';
import { Prisma, User } from '@prisma/client';
import { AccessControlDAL } from './access_control';
import { Register } from './typing';

export class UserDAL {
  email: string;

  constructor(email: string) {
    this.email = email.trim();
  }

  get accessControl(): AccessControlDAL {
    return new AccessControlDAL(this.email);
  }

  private async getCache(): Promise<Partial<User>> {
    return (await redis.hgetall(`user:${this.email}`)) ?? ({} as Partial<User>);
  }

  private async setCache(cache: Partial<User>): Promise<boolean> {
    return (await redis.hmset(`user:${this.email}`, cache)) === 'OK';
  }

  static async fromCache(cache: Partial<User> & { email: string }) {
    const dal = new UserDAL(cache.email);
    await dal.setCache(cache);
    return dal;
  }

  static async fromRegistration(
    email: string,
    password: string,
    name: string | undefined = undefined
  ): Promise<UserDAL | null> {
    try {
      const cache = await prisma.user.create({
        data: {
          email,
          passwordHash: md5.hash(password.trim()),
          name,
        },
      });

      return await UserDAL.fromCache(cache);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Unique constraint violation (user already exists)
      } else {
        console.error('Unexpected error:', error);
      }
      return null;
    }
  }

  async exists(): Promise<boolean> {
    const hasCache = isObjNonEmpty(await this.getCache());
    const hasUser =
      (await prisma.user.count({
        where: {
          email: this.email,
        },
      })) > 0;

    return hasCache || hasUser;
  }

  async login(password: string): Promise<boolean> {
    let passwordHash = (await this.getCache()).passwordHash;

    if (!passwordHash) {
      const user = await prisma.user.findUnique({
        where: {
          email: this.email,
        },
        select: {
          passwordHash: true,
        },
      });
      if (user) {
        await this.setCache(user);
        passwordHash = user.passwordHash;
      }
    }

    const isSuccess = passwordHash === md5.hash(password.trim());

    if (isSuccess) {
      // Set last login
      const user = await prisma.user.update({
        select: {
          lastLoginAt: true,
        },
        where: {
          email: this.email,
        },
        data: {
          lastLoginAt: new Date(),
        },
      });
      this.setCache(user);
    }
    return isSuccess;
  }

  /**
   * 请求(邮箱|手机)激活码, 速率请求由 Cloudflare 规则限制
   * @param codeType Email or Phone
   * @param phone if Phone type, phone number is required
   * @return {
   *   status:
   *   code: register code
   *   ttl:  ttl of the (exist) code
   * }
   *
   */
  async newRegisterCode(
    codeType: Register.CodeType,
    phone?: string
  ): Promise<{
    status: Register.ReturnStatus;
    code?: number;
    ttl?: number;
  }> {
    if (codeType === 'phone') {
      if (!phone) throw new Error('Phone number is required');
      else {
        // todo (peron) 检查该手机号是否已经注册
        const isRegistered = await prisma.user.count({
          where: {
            phone,
          },
        });

        if (isRegistered)
          return { status: Register.ReturnStatus.AlreadyRegister };
      }
    }

    const key = `register:code:${codeType}:${phone ?? this.email}`;
    const code = await redis.get<number>(key);

    // 如果存在 Code 且距离上一次请求未超过 60 秒, 那么返回剩余有效时间
    if (code) {
      const ttl = await redis.ttl(key);
      if (ttl >= 240) return { status: Register.ReturnStatus.TooFast, ttl }; // 如果在一分钟之内, 则不再发送
    }

    const randomNumber = generateRandomSixDigitNumber();
    if ((await redis.set(key, randomNumber)) === 'OK') {
      await redis.expire(key, 60 * 5); // 过期时间: 5 分钟
      return {
        status: Register.ReturnStatus.Success,
        code: randomNumber,
        ttl: 300,
      };
    }
    return { status: Register.ReturnStatus.UnknownError };
  }

  /**
   * 激活激活码, 手机号则进入数据库
   * @param code
   * @param codeType
   * @param phone
   */
  async activateRegisterCode(
    code: string | number,
    codeType: Register.CodeType,
    phone?: string
  ): Promise<boolean> {
    if (codeType === 'phone' && !phone)
      throw new Error('Phone number is required');
    const key = `register:code:${codeType}:${phone ?? this.email}`;
    const remoteCode = await redis.get(key);

    const isSuccess = remoteCode == code;

    if (isSuccess) {
      const delKey = redis.del(key);
      const storePhone = prisma.user.update({
        where: {
          email: this.email,
        },
        data: {
          phone,
        },
      });

      try {
        await Promise.all([delKey, storePhone]);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return false;
        }
      }
    }

    return isSuccess;
  }
}
