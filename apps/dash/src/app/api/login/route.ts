import { NextRequest, NextResponse } from "next/server";
import { UserLogic, AccessControlLogic } from "database";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const userLogic = new UserLogic();
    const accessControlLogic = new AccessControlLogic();

    if (!(await userLogic.login(email, password))) {
      return NextResponse.json({}, { status: 401 });
    }
    const role = await userLogic.getRoleOf(email);

    if (role !== "admin") return NextResponse.json({}, { status: 403 });

    const newTokenGenerator = await accessControlLogic.newJWT(email);
    if (!newTokenGenerator)
      return NextResponse.json(
        {
          // status: ResponseStatus.Failed,
        },
        { status: 404 }
      );
    const { token: sessionToken, exp } = newTokenGenerator;

    return NextResponse.json({
      // status: ResponseStatus.Success,
      sessionToken,
      exp,
    });
  } catch (error) {
    console.error("[SERVER ERROR]", error);
    return new Response("[INTERNAL ERROR]", { status: 500 });
  }
}

export const runtime = "edge";
