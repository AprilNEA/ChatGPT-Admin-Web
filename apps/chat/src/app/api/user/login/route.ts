import { NextRequest, NextResponse } from "next/server";
import { UserLogic, AccessControlLogic } from "database";
import { ResponseStatus } from "@/app/api/typing.d";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const userLogic = new UserLogic();
    const accessControlLogic = new AccessControlLogic();

    if (!(await userLogic.login(email, password))) {
      return NextResponse.json({ status: ResponseStatus.wrongPassword });
    }

    const tokenGenerator = await accessControlLogic.newJWT(email);

    if (!tokenGenerator)
      return NextResponse.json({
        status: ResponseStatus.Failed,
      });

    const { token: sessionToken, exp } = tokenGenerator;
    return NextResponse.json({
      status: ResponseStatus.Success,
      sessionToken,
      exp,
    });
  } catch (error) {
    console.error("[SERVER ERROR]", error);
    return new Response("[INTERNAL ERROR]", { status: 500 });
  }
}

export const runtime = "edge";
