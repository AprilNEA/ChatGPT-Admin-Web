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

    const sessionToken = await accessControlLogic.newJWT(email);
    if (sessionToken) {
      return NextResponse.json({
        // status: ResponseStatus.Success,
        sessionToken,
      });
    } else {
      return NextResponse.json(
        {
          // status: ResponseStatus.Failed,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("[SERVER ERROR]", error);
    return new Response("[INTERNAL ERROR]", { status: 500 });
  }
}
