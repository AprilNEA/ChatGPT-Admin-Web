import { NextRequest, NextResponse } from "next/server";
import { LimitReason, rateLimit, validateCookie } from "@/lib/redis";
import { UserDAL } from "database";

export const config = {
  matcher: ["/api/chat", "/api/chat-stream", "/api/gpt3", "/api/gpt4"],
};

export async function middleware(req: NextRequest, res: NextResponse) {
  const email = req.headers.get("email");
  const token = req.headers.get("token");

  // 鉴权
  if (!email || !token || !(await validateCookie(email, token)))
    return NextResponse.json({}, { status: 401 });

  // 速率限制 返回的是一个枚举值 会有 @utils/requests 进一步处理
  const limitReason = await rateLimit(email);
  if (limitReason !== LimitReason.NoLimit)
    return NextResponse.json({ code: limitReason }, { status: 429 });

  return NextResponse.next();
}
