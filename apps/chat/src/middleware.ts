import { NextRequest, NextResponse } from "next/server";
import { UserDAL } from "dal";
import { LimitReason } from "@/typing.d";

export const config = {
  matcher: ["/api/chat-stream", "/api/gpt3", "/api/gpt4"],
};

export async function middleware(req: NextRequest, res: NextResponse) {
  const email = req.headers.get("email");
  const token = req.headers.get("token");

  if (!email || !token) return NextResponse.json({}, { status: 404 });

  const user = new UserDAL(email);
  // 鉴权
  if (email !== (await user.accessControl.validateSessionToken(token)))
    return NextResponse.json({}, { status: 401 });

  let timesLimit = 10;
  const planOrRole = await user.getPlan();

  switch (planOrRole) {
    case "admin":
    case "mod":
      return NextResponse.next();
    case "premium": // todo 对 Premium 作出限制
      timesLimit = 200
      break
    case "pro":
      timesLimit = 50;
      break;
    case "free":
    default:
      break;
  }

  // 速率限制 返回的是一个枚举值 会有 @utils/requests 进一步处理
  const requestNos = await user.accessControl.getRequestsTimeStamp();
  let requestNosLength = requestNos.length;
  if (requestNosLength > 0 && requestNos[requestNosLength - 1] + 5 > Date.now())
    return NextResponse.json({ code: LimitReason.TooFast }, { status: 429 });

  if ((planOrRole ?? 'free').trim().toLowerCase() == "free")
    requestNos.filter((t) => Date.now() - t < 3600 * 1000);
  requestNosLength = requestNos.length;
  if (requestNosLength > timesLimit)
    return NextResponse.json({ code: LimitReason.TooMany }, { status: 429 });

  await user.accessControl.newRequest();
  return NextResponse.next();
}
