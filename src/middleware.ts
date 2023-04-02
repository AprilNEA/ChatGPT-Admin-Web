import {NextRequest, NextResponse} from "next/server";
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
  const limit_reason = await rateLimit(email)
  if (limit_reason !== 'OK')
    return NextResponse.json(
      {
        hint: limit_reason
      },
      {
        status: 429,
      }
    );


  return NextResponse.next();
}
