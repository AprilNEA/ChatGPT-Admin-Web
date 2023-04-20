import { CookieParser } from "../utils/cookie";
import { redis } from "../redis/client";

const INITIAL_***REMOVED*** = CookieParser.parse(process.env.***REMOVED***!);

export class APIKeyDAL {
  static async setLexSession(session: string): Promise<boolean> {
    session = session.trim();
    if (session.startsWith("_***REMOVED***_session=")) {
      session = session.slice("_***REMOVED***_session=".length);
    }
    return await redis.set("***REMOVED***:session", session) === "OK";
  }

  static async getLexCookie(): Promise<string> {
    const session = await redis.get<string>("***REMOVED***:session");

    if (session) {
      const newCookies = new Map(INITIAL_***REMOVED***);
      newCookies.set("_***REMOVED***_session", session);
      return CookieParser.serialize(newCookies);
    }

    return process.env.***REMOVED***!;
  }
}
