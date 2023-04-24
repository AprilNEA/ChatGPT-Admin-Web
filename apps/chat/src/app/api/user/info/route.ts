import { NextRequest, NextResponse } from "next/server";
import { UserLogic, InvitationCodeLogic } from "database";
import { ResponseStatus } from "@/app/api/typing.d";

export async function GET(req: NextRequest) {
  const email = req.headers.get("email")!;

  const user = new UserLogic();
  let invitationCodes = (await user.getInvitationCodesOf(email)) ?? [];
  if (invitationCodes.length === 0) {
    const invitationCode = new InvitationCodeLogic();
    const newCode = await invitationCode.newCode({
      email,
      type: "normal",
    });
    if (newCode) invitationCodes = [newCode];
    else
      NextResponse.json({
        status: ResponseStatus.Failed,
      });
  }

  return NextResponse.json({
    status: ResponseStatus.Success,
    role: user.getRoleOf(email),
    plan: user.getPlanOf(email),
    inviteCode: invitationCodes,
  });
}
