import { NextRequest, NextResponse } from "next/server";
import { UserDAL } from "database";
import { LimitReason } from "@/typing.d";

export const config = {
  matcher: ["/api/chat", "/api/chat-stream", "/api/gpt3", "/api/gpt4"],
};

export async function middleware(req: NextRequest, res: NextResponse) {
  const email = req.headers.get("email");
  const token = req.headers.get("token");

  if (!email || !token) return NextResponse.json({}, { status: 404 });

  const user = new UserDAL(email);
  // 鉴权
  if (email !== (await user.accessControl.validateSessionToken(token)))
    return NextResponse.json({}, { status: 401 });

  // 速率限制 返回的是一个枚举值 会有 @utils/requests 进一步处理
  const requestNos = await user.accessControl.getRequestsTimeStamp();
  const requestNosLength = requestNos.length;
  if (requestNosLength > 0 && requestNos[requestNosLength - 1] + 5 > Date.now())
    return NextResponse.json({ code: LimitReason.TooFast }, { status: 429 });
  if (requestNosLength > 25)
    return NextResponse.json({ code: LimitReason.TooMany }, { status: 429 });

  return NextResponse.next();
}
