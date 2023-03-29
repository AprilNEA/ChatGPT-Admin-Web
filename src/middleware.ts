import {NextRequest, NextResponse} from "next/server";
import {ACCESS_CODES} from "./app/api/access";
import {validateCookie, rateLimit} from "@/lib/redis";

export const config = {
  matcher: ["/api/chat", "/api/chat-stream", "/api/gpt3", "/api/gpt4"],
};

export async function middleware(req: NextRequest, res: NextResponse) {
  const email = req.headers.get("email");
  const token = req.headers.get("token");

  // 鉴权
  if (!email || !token || !await validateCookie(email, token))
    return NextResponse.json(
      {
        needAccessCode: true,
        hint: "Unauthenticated, illegal access",
      },
      {
        status: 401,
      }
    );

  // 速率限制
  if (!await rateLimit(email))
    return NextResponse.json(
      {
        hint: "The IP address reaches the maximum number of requests per second, please request later.",
      },
      {
        status: 429,
      }
    );


  return NextResponse.next();
}
