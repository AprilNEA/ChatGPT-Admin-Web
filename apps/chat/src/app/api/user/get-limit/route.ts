import { NextRequest, NextResponse } from "next/server";
import { ResponseStatus } from "@/app/api/typing.d";
import { UserDAL } from "database";

export async function GET(req: NextRequest) {
  const email = req.headers.get("email");
  if (!email) return NextResponse.json({ status: ResponseStatus.Failed });
  const user = new UserDAL(email);

  return NextResponse.json({
    status: ResponseStatus.Success,
    requestNos: await user.accessControl.getRequestsTimeStamp(),
  });
}
