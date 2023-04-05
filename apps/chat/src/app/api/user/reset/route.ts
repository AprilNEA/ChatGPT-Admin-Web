import { NextRequest, NextResponse } from "next/server";
import { Register, UserDAL } from "dal";
import { sendEmail } from "@/lib/email";
import { sendPhone } from "@/lib/phone";
import { ResponseStatus } from "@/app/api/typing.d";

export async function GET(req: NextRequest): Promise<Response> {
  const email = req.headers.get("email");
  const token = req.headers.get("token");

  if (!email || !token) return NextResponse.json({}, { status: 404 });

  const user = new UserDAL(email);
  // 鉴权
  if (email !== (await user.accessControl.validateSessionToken(token)))
    return NextResponse.json({}, { status: 401 });

  const chances = await user.getResetChances();
  if (chances > 0) {
    await user.changeResetChancesBy(-1);
    return NextResponse.json({ status: ResponseStatus.Success });
  }
  return NextResponse.json({ status: ResponseStatus.Failed });
}
