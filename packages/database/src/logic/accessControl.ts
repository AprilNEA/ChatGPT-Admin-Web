import md5 from 'spark-md5';
import { RequestLimitDAL, SessionTokenDAL, UserDAL } from '../dal';
import { SessionToken } from '../types';
import { sign } from '../utils/jwt';

export class AccessControlLogic {
  constructor(
    private readonly sessionTokenDAL = new SessionTokenDAL(),
    private readonly userDAL = new UserDAL(),
    private readonly limitDAL = new RequestLimitDAL()
  ) {}

  async newSessionToken(email: string): Promise<string | null> {
    // const token = md5.hash(`${email}:${new Date()}`);
    //
    // const sessionToken: SessionToken = {
    //   createdAt: Date.now(),
    //   isRevoked: false,
    //   userEmail: email,
    // };
    //
    // await this.sessionTokenDAL.create(token, sessionToken);
    // await this.sessionTokenDAL.setExpiration(token, 24 * 60 * 60);
    return await sign({ email: email });
  }

  async validateSessionToken(token: string): Promise<string | null> {
    const sessionToken = await this.sessionTokenDAL.read(token.trim());

    if (!sessionToken) return null;
    if (sessionToken.isRevoked) return null;

    await this.sessionTokenDAL.setExpiration(token, 24 * 60 * 60);
    return sessionToken.userEmail;
  }

  async getRequestsTimeStamp(emailOrIP: string): Promise<number[]> {
    await this.limitDAL.removeExpiredTimestamps(
      emailOrIP,
      await this.getExpiration(emailOrIP)
    );
    return await this.limitDAL.getRequestTimestamps(emailOrIP);
  }

  async newRequest(emailOrIP: string): Promise<number> {
    const timestamp = Date.now();
    await this.limitDAL.addRequestTimestamp(emailOrIP, timestamp);
    return timestamp;
  }

  async resetLimit(emailOrIP: string) {
    const chances = (await this.userDAL.readResetChances(emailOrIP)) ?? 0;
    if (chances <= 0) return false;
    await this.userDAL.incrResetChances(emailOrIP, -1);
    await this.limitDAL.resetLimit(emailOrIP);
    return true;
  }

  private async getExpiration(emailOrIP: string) {
    const plan = (await this.userDAL.readPlan(emailOrIP)) ?? 'free';
    return plan === 'free' ? 60 * 60 * 1000 : 3 * 60 * 60 * 1000;
  }
}
