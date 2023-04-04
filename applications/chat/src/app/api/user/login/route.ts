import { NextRequest, NextResponse } from "next/server";
import { UserDAL, Register } from "database";
import { ResponseStatus } from "@/app/api/typing.d";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = new UserDAL(email);

    // 如果用户不存在, 则返回错误
    if (!(await user.exists()))
      return NextResponse.json({ status: ResponseStatus.notExist });

    if(!(await user.login(password)))
      return NextResponse.json({ status: ResponseStatus.wrongPassword });

    const sessionToken = await user.accessControl.newSessionToken()
    if (sessionToken) {
      return NextResponse.json({
        status: ResponseStatus.Success,
        sessionToken,
      });
    } else {
      return NextResponse.json({
        status: ResponseStatus.Failed,
      });
    }

  } catch (error) {
    console.error("[SERVER ERROR]", error);
    return new Response("[INTERNAL ERROR]", { status: 500 });
  }
}
