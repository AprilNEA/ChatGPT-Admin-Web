import { NextRequest, NextResponse } from "next/server";
import { ResponseStatus } from "@/app/api/typing.d";
import { UserDAL } from "database";

export function GET(req: NextRequest) {
  const email = req.headers.get("email");
  if (!email) return NextResponse.json({}, { status: 404 });
  const user = new UserDAL(email);
  // const inviteCode = user.getInviteCode();
  return NextResponse.json({
    status: ResponseStatus.Success,
    data: ["ABDCEF"],
  });
}
