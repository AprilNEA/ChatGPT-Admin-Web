import { prisma } from '../prisma/client';
import { redis } from '../redis/client';
import { SessionToken } from '@prisma/client';
import md5 from "spark-md5";

export class AccessControlDAL {
  constructor(
    /* 邮箱 */
    private emailOrIP: string,
    private isIP = !emailOrIP.includes('@')
  ) {}

  /**
   * 新建一个会话令牌
   */
  async newSessionToken(): Promise<SessionToken | null> {
    if (this.isIP) return null;

    const token = await prisma.sessionToken.create({
      data: {
        userEmail: this.emailOrIP,
        token: md5.hash(`${this.emailOrIP}:${new Date()}`),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expire in 1 day
      },
    });

    await redis.set(`sessionToken:${token.token}`, this.emailOrIP);
    await redis.expire(`sessionToken:${token.token}`, 24 * 60 * 60 * 1000 - 10); // Expire in 1 day

    return token;
  }

  /**
   * 验证会话令牌是否有效
   * @param token
   * @return 返回用户邮箱用于效验
   */
  async validateSessionToken(token: string): Promise<string | null> {
    if (this.isIP) return null;

    const cachedEmail = (await redis.get(
      `sessionToken:${token.trim()}`
    )) as string;

    if (cachedEmail) return cachedEmail;

    const sessionToken = await prisma.sessionToken.findUnique({
      where: {
        token: token.trim(),
      },
    });

    if (!sessionToken) return null;
    if (sessionToken.isRevoked) return null;
    if (sessionToken.expiresAt.getTime() < new Date().getTime()) {
      await prisma.sessionToken.delete({
        where: {
          token: token.trim(),
        },
      });
      return null;
    }

    return sessionToken.userEmail;
  }

  /**
   * 获取该用户在三个小时内每次请求的时间戳
   * Free : 10 requests per hour 前端截取最后一个小时进行判断
   * Pro : 50 requests per three hour
   * Premium : No limit in requests until 100 requests in three hours when speed limit will be imposed
   * @return 返回时间戳数组, 按升序排列
   */
  async getRequestsTimeStamp(): Promise<number[]> {
    const key = `limit:${this.emailOrIP}`

    // 移除所有过期的时间戳
    await redis.zremrangebyscore(
      key,
      0,
      Date.now() - 3 * 60 * 60 * 1000
    );

    return await redis.zrange<number[]>(key, 0, -1)
  }

  /**
   * 添加新的请求时间戳, 用来限制请求速率, 是否被添加由上层判断
   * @return 返回该时间戳
   */
  async newRequest(): Promise<number> {
    const key = `limit:${this.emailOrIP}`
    const timestamp = Date.now();
    // add at the end of requestsTimestamp
    await redis.zadd(key, {
      member: timestamp,
      score: timestamp
    })
    return timestamp;
  }
}
