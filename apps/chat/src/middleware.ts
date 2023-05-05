import { NextRequest, NextResponse } from "next/server";
import { jwt } from "database";

const cache = new Map();

const limit = {
  "/api/user/info": {
    limit: 10,
    window: "1m",
  },
  "/api/user/login": {
    limit: 10,
    window: "1m",
  },
  "/api/user/register": {
    limit: 10,
    window: "1m",
  },
};

export const config = {
  /**
   * All route start with /api/user & /api/bots
   * Except:
   *  /api/user/login
   *  /api/user/register
   *  /api/user/register/code
   */
  matcher: ["/api/user/((?!login|register|callback).*)", "/api/bots/:model*"],
};

function setHeaders(headers: Headers, obj: any) {
  const requestHeaders = new Headers(headers);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      requestHeaders.set(key, obj[key]);
    }
  }
  return requestHeaders;
}

export async function middleware(req: NextRequest) {
  try {
    /* The user will bring the JWT Token in the header
    and parse out the payload here before passing it to the next layer. */
    const token = req.headers.get("Authorization");

    console.debug("[Middleware]", req.nextUrl.pathname, token);

    if (!token) return NextResponse.json({}, { status: 403 });
    const { email } = (await jwt.verify(token)) as unknown as {
      email: string;
    };

    /* TODO The global rate limit according to the request path with cache */
    // const limiter = await KeywordRateLimiter.of({
    //   prefix: "/api/user/info", limit: 10, window: "1m", ephemeralCache: cache
    // })
    // const {success} = await limiter.limit(email);
    // if (success) return

    /* TODO Rate limit info may require here to get*/

    console.debug("[Middleware]", req.nextUrl.pathname, email);

    /* Pass user data */
    return NextResponse.next({
      request: {
        headers: setHeaders(req.headers, {
          email,
        }),
      },
    });
  } catch (e) {
    /* Check for validity */
    return NextResponse.json({}, { status: 401 });
  }
}
