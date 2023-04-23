import md5 from "spark-md5";
import { RequestLimitDAL, SessionTokenDAL, UserDAL } from "../dal";
import { SessionToken } from "../types";

export class AccessControlLogic {
  constructor(
    private readonly sessionTokenDAL = new SessionTokenDAL(),
    private readonly userDAL = new UserDAL(),
    private readonly limitDAL = new RequestLimitDAL(),
  ) {}

  async newSessionToken(
    emailOrIP: string,
    isIP = !emailOrIP.includes("@"),
  ): Promise<string | null> {
    if (isIP) return null;

    const token = md5.hash(`${emailOrIP}:${new Date()}`);

    const sessionToken: SessionToken = {
      createdAt: Date.now(),

      isRevoked: false,
      userEmail: emailOrIP,
    };

    await this.sessionTokenDAL.create(token, sessionToken);
    return token;
  }

  async validateSessionToken(
    token: string,
    emailOrIP: string,
    isIP = !emailOrIP.includes("@"),
  ): Promise<string | null> {
    if (isIP) return null;

    const sessionToken = await this.sessionTokenDAL.read(token.trim());

    if (!sessionToken) return null;
    if (sessionToken.isRevoked) return null;

    await this.sessionTokenDAL.update(token.trim(), { createdAt: Date.now() });
    return sessionToken.userEmail;
  }

  async getRequestsTimeStamp(emailOrIP: string): Promise<number[]> {
    await this.limitDAL.removeExpiredTimestamps(
      emailOrIP,
      await this.getExpiration(emailOrIP),
    );
    return await this.limitDAL.getRequestTimestamps(emailOrIP);
  }

  async newRequest(emailOrIP: string): Promise<number> {
    const timestamp = Date.now();
    await this.limitDAL.addRequestTimestamp(emailOrIP, timestamp);
    return timestamp;
  }

  async resetLimit(emailOrIP: string) {
    await this.limitDAL.resetLimit(emailOrIP);
    return await this.limitDAL.getRequestTimestamps(emailOrIP);
  }

  private async getExpiration(emailOrIP: string) {
    const plan = await this.userDAL.readPlan(emailOrIP) ?? "free";
    return plan === "free" ? 60 * 60 * 1000 : 3 * 60 * 60 * 1000;
  }
}
