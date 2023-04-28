import { NextRequest, NextResponse } from "next/server";
import { UserLogic } from "database";
import { jwt } from "database";

export const config = {
  matcher: ["/api/((?!login$).*)"],
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
    // 由用户同时传入 email 和 token
    const token = req.headers.get("Authorization");
    if (!token) return NextResponse.json({}, { status: 403 });

    // Decoding token
    const { email } = (await jwt.verify(token)) as unknown as {
      email: string;
    };

    const userLogic = new UserLogic();

    const role = (await userLogic.getRoleOf(email)) ?? "user";

    if (role !== "admin") throw Error("Bad request");

    return NextResponse.next({
      request: {
        headers: setHeaders(req.headers, { email }),
      },
    });
  } catch (e) {
    return NextResponse.json({}, { status: 401 });
  }
}
