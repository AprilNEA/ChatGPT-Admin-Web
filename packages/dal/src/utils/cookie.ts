export class CookieParser {
  // Parses cookies into a Map
  public static parse(cookie: string): Map<string, string> {
    const cookies: Map<string, string> = new Map();

    cookie.split(";").forEach((cookie) => {
      const [key, value] = cookie.split("=").map((part) => part.trim());
      cookies.set(decodeURIComponent(key), decodeURIComponent(value));
    });

    return cookies;
  }

  // Converts a Map back to cookies
  public static serialize(
    cookies: Map<string, string>,
  ): string {
    const resultCookie: string[] = [];

    cookies.forEach((value, key) => {
      resultCookie.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      );
    });

    return resultCookie.join("; ");
  }
}
