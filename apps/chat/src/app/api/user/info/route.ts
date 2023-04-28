import { NextRequest, NextResponse } from "next/server";
import { UserLogic, InvitationCodeLogic } from "database";
import { ResponseStatus } from "@/app/api/typing.d";

const cache = new Map();

export async function GET(req: NextRequest) {
  const email = req.headers.get("email")!;

  const user = new UserLogic();

  const role = (await user.getRoleOf(email)) ?? "user";
  const plan = (await user.getPlanOf(email)) ?? "free";

  const resetChances = (await user.getResetChancesOf(email)) ?? 0;

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
    email,
    role,
    plan,
    inviteCode: invitationCodes[0],
    resetChances,
  });
}
