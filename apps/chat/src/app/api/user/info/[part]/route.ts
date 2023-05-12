import { NextRequest, NextResponse } from "next/server";
import {
  InvitationCodeLogic,
  ModelRateLimiter,
  SubscriptionLogic,
  UserLogic,
} from "database";
import { ResponseStatus } from "@/app/api/typing.d";

type Part = "invite-code" | "rate-limit" | "subscription";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { part: Part };
  }
) {
  const email = req.headers.get("email")!;

  switch (params.part) {
    case "invite-code":
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
        inviteCode: invitationCodes[0],
      });
    case "rate-limit":
      const rateLimit = await ModelRateLimiter.of({
        email,
        model: "gpt-3.5-turbo",
      });
      const remain = await rateLimit?.remaining();
      return NextResponse.json({
        status: ResponseStatus.Success,
        data: remain,
      });
    case "subscription":
      const subscription = new SubscriptionLogic();
      const userSubscription = await subscription.listUserSubscriptions(email);

      return NextResponse.json({
        status: ResponseStatus.Success,
        data: userSubscription,
      });
    default:
      return NextResponse.json({}, { status: 404 });
  }
}

export const runtime = "edge";
