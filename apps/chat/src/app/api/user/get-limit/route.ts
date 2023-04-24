import { NextRequest, NextResponse } from "next/server";
import { ResponseStatus } from "@/app/api/typing.d";
import { AccessControlLogic } from "database";

export async function GET(req: NextRequest) {
  const accessControlLogic = new AccessControlLogic();
  const email = req.headers.get("email");
  if (!email) return NextResponse.json({ status: ResponseStatus.Failed });

  const requestNos = await accessControlLogic.getRequestsTimeStamp(email);

  return NextResponse.json({
    status: ResponseStatus.Success,
    requestNos,
  });
}
