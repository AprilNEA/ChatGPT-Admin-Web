import { NextRequest, NextResponse } from "next/server";
import { AccessControlLogic, plan, UserLogic } from "database";
import { LimitReason } from "@/typing.d";
import { jwt } from "database";

export const config = {
  matcher: ["/api/user/((?!login$|register$).*)", "/api/bots/:model*"],
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

    // 初始化 实例
    const userLogic = new UserLogic();
    const accessControlLogic = new AccessControlLogic();

    // const token_email = await accessControlLogic.validateSessionToken(token);
    // // 鉴权
    // if (email !== token_email) return NextResponse.json({}, { status: 401 });

    let timesLimit = 10;
    const role = (await userLogic.getRoleOf(email)) ?? "user";
    switch (role) {
      case "admin":
      case "mod":
        return NextResponse.next({
          request: {
            headers: setHeaders(req.headers, {
              email,
              plan: "premium",
              role,
            }),
          },
        });
      default:
        break;
    }
    const plan = (await userLogic.getPlanOf(email)) ?? "free";
    switch (plan) {
      case "premium":
        timesLimit = 200;
        break;
      case "pro":
        timesLimit = 50;
        break;
      case "free":
      default:
        break;
    }

    // 速率限制 返回的是一个枚举值 会有 @utils/requests 进一步处理
    const requestNos = await accessControlLogic.getRequestsTimeStamp(email);
    let requestNosLength = requestNos.length;
    if (
      requestNosLength > 0 &&
      requestNos[requestNosLength - 1] + 5 > Date.now()
    )
      return NextResponse.json({ code: LimitReason.TooFast }, { status: 429 });

    // 如果是免费计划, 那么把总体限制时间从三小时变为一小时
    if (plan.toLowerCase() == "free")
      requestNos.filter((t) => Date.now() - t < 3600 * 1000);
    requestNosLength = requestNos.length; // 统计使用数量

    if (requestNosLength > timesLimit)
      return NextResponse.json({ code: LimitReason.TooMany }, { status: 429 });

    await accessControlLogic.newRequest(email);

    // 从中间件向下传递一些数据
    return NextResponse.next({
      request: {
        headers: setHeaders(req.headers, {
          email,
          plan,
          role,
        }),
      },
    });
  } catch (e) {
    // Check for validity
    return NextResponse.json({}, { status: 401 });
  }
}
