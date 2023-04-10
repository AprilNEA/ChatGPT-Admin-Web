import { NextRequest, NextResponse } from "next/server";
import { UserDAL } from "dal";
import { ResponseStatus } from "@/app/api/typing.d";

export async function GET(req: NextRequest) {
  const email = req.headers.get("email");
  if (!email) return NextResponse.json({ status: ResponseStatus.Failed });
  const user = new UserDAL(email);
  let invitationCodes = await user.getInvitationCodes();
  if (invitationCodes.length == 0)
    invitationCodes = [await user.newInvitationCode("normal")];
  return NextResponse.json({
    status: ResponseStatus.Success,
    role: await user.getPlan(),
    inviteCode: invitationCodes[0],
  });
}
