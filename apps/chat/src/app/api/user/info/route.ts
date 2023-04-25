import {NextRequest, NextResponse} from "next/server";
import {UserLogic, InvitationCodeLogic, AccessControlLogic} from "database";
import {ResponseStatus} from "@/app/api/typing.d";

export async function GET(req: NextRequest) {
  const email = req.headers.get("email")!;

  const user = new UserLogic();

  const accessControlLogic = new AccessControlLogic();
  const requestNos = await accessControlLogic.getRequestsTimeStamp(email);
  const resetChances = await user.getResetChancesOf(email) ?? 0;

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
    role: user.getRoleOf(email),
    plan: user.getPlanOf(email),
    inviteCode: invitationCodes[0],
    requestNos,
    resetChances,
  });
}
