import { NextRequest, NextResponse } from "next/server";
import { UserLogic, AccessControlLogic, UserDAL } from "database";
import { ResponseStatus } from "@/app/api/typing.d";

/**
 * 获取使用次数
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest): Promise<Response> {
  const email = req.headers.get("email");
  const token = req.headers.get("token");

  const accessControl = new AccessControlLogic();
  const user = new UserLogic();

  if (!email || !token) return NextResponse.json({}, { status: 404 });

  const chances = await user.getResetChancesOf(email);
  return NextResponse.json({ status: ResponseStatus.Success, chances });
}

/**
 * 请求充值使用次数
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest): Promise<Response> {
  const email = req.headers.get("email");
  const token = req.headers.get("token");

  if (!email || !token) return NextResponse.json({}, { status: 404 });

  const accessControl = new AccessControlLogic();

  // 成功重置
  if (await accessControl.resetLimit(email))
    return NextResponse.json({
      status: ResponseStatus.Success,
    });

  return NextResponse.json({ status: ResponseStatus.Failed });
}
