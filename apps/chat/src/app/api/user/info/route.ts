import {NextRequest, NextResponse} from "next/server";
import {UserLogic, InvitationCodeLogic} from "database";
import {ResponseStatus} from "@/app/api/typing.d";

const cache = new Map();

export async function GET(req: NextRequest) {
  const email = req.headers.get("email")!;

  const user = new UserLogic();

  const role = (await user.getRoleOf(email)) ?? "user";
  const plan = (await user.getPlanOf(email)) ?? "free";

  const resetChances = (await user.getResetChancesOf(email)) ?? 0;

  return NextResponse.json({
    status: ResponseStatus.Success,
    email,
    role,
    plan,
    resetChances,
  });
}

export const runtime = 'edge';
