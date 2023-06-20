import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { ServerError, serverStatus } from "@caw/types";

export namespace accessTokenUtils {
  /**
   * 签发令牌
   * @param duration 持续时间
   * @param payload 负载
   */
  export async function sign<T extends JWTPayload>(
    duration: number,
    payload: T
  ): Promise<{ token: string; expiredAt: number }> {
    const iat = Math.floor(Date.now() / 1000); // Not before: Now
    const exp = iat + duration; // Expires: Now + 1 week
    return {
      token: await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET!)),
      expiredAt: exp,
    };
  }

  /**
   * 效验令牌，返回负载
   * @param token
   */
  export async function verify(token: string): Promise<JWTPayload> {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );
      return payload;
    } catch (e) {
      throw new ServerError(serverStatus.invalidToken, "Invalid token");
    }
  }
}

export async function parseUserId(token: string) {
  const { uid: userId } = (await accessTokenUtils.verify(token)) as unknown as {
    uid: number;
  };
  return userId;
}

export async function resumeToken(
  token: string
): Promise<{ token: string; expiredAt: number }> {
  return await accessTokenUtils.sign(7 * 24 * (60 * 60), {
    uid: parseUserId(token),
  });
}
