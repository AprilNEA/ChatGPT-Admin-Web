import { redis } from '../redis/client';
import md5 from 'spark-md5';
import { generateRandomSixDigitNumber } from './utils';
import { AccessControlDAL } from './access_control';
import { Model, Register } from './typing';

export class UserDAL {
  email: string;

  constructor(email: string) {
    this.email = email.trim().toLowerCase();
  }

  get accessControl(): AccessControlDAL {
    return new AccessControlDAL(this.email);
  }

  get userKey(): string {
    return `user:${this.email}`;
  }

  async get(): Promise<Model.User | null> {
    return await redis.json.get(this.userKey, '.');
  }

  async set(data: Model.User): Promise<boolean> {
    return (await redis.json.set(this.userKey, '.', data)) === 'OK';
  }

  async update(
    path: string,
    data: Model.User[keyof Model.User]
  ): Promise<boolean> {
    return (await redis.json.set(this.userKey, path, data!)) === 'OK';
  }

  async exists(): Promise<boolean> {
    return (await redis.exists(this.userKey)) === 1;
  }

  async delete(): Promise<boolean> {
    return (await redis.del(this.userKey)) === 1;
  }

  static async fromRegistration(
    email: string,
    password: string,
    extraData: Partial<Model.User>
  ): Promise<UserDAL | null> {
    const userDAL = new UserDAL(email);

    if (await userDAL.exists()) return null;

    await userDAL.set({
      name: 'Anonymous',
      passwordHash: md5.hash(password.trim()),
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
      isBlocked: false,
      resetChances: 0,
      ...extraData,
    });

    return userDAL;
  }

  async login(password: string): Promise<boolean> {
    const user = await this.get();
    const isSuccess = user?.passwordHash === md5.hash(password.trim());

    if (isSuccess) {
      // Set last login
      await this.update('.lastLoginAt', Date.now());
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
   */
  async newRegisterCode(
    codeType: Register.CodeType,
    phone?: string
  ): Promise<
    | {
        status: Register.ReturnStatus.Success;
        code: number;
        ttl: number;
      }
    | {
        status: Register.ReturnStatus.TooFast;
        ttl: number;
      }
    | {
        status:
          | Register.ReturnStatus.AlreadyRegister
          | Register.ReturnStatus.UnknownError;
      }
  > {
    if (codeType === 'phone') {
      if (!phone) throw new Error('Phone number is required');

      // The following code is not possible in Redis

      // if (someUser.hasSamePhone) {
      //   return { status: Register.ReturnStatus.AlreadyRegister };
      // }
    }

    const key = `register:code:${codeType}:${phone ?? this.email}`;
    const code = await redis.get<number>(key);

    // code is found
    if (code) {
      const ttl = await redis.ttl(key);
      if (ttl >= 60 * 4) return { status: Register.ReturnStatus.TooFast, ttl };
    }

    // code is not found, generate a new one
    const randomNumber = generateRandomSixDigitNumber();
    if ((await redis.set(key, randomNumber)) === 'OK') {
      await redis.expire(key, 60 * 5); // Expiration time: 5 minutes
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
    if (codeType === 'phone' && !phone) {
      throw new Error('Phone number is required');
    }
    const key = `register:code:${codeType}:${phone ?? this.email}`;
    const remoteCode = await redis.get(key);

    const isSuccess = remoteCode == code;

    if (isSuccess) {
      const delKey = redis.del(key);
      const storePhone = phone && this.update('.phone', phone);

      await Promise.all([delKey, storePhone]);
    }

    return isSuccess;
  }
}
