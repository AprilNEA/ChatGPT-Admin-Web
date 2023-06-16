import { NextRequest, NextResponse } from "next/server";
import { UserDAL, providerType } from "@caw/dal";
import { serverStatus, ChatRequest } from "@caw/types";
import { serverErrorCatcher } from "@/app/api/catcher";
import { WechatLib } from "@/lib/wechat";
import { getRuntime } from "@/utils";

export const runtime = getRuntime();

/**
 * Request Code Ticket for WeChat Login
 * @param req
 * @returns Return Ticket and Expiration Time
 */
export const GET = serverErrorCatcher(async (req: NextRequest) => {
  const wechatLib = await WechatLib.create();
  return NextResponse.json({
    status: serverStatus.success,
    ...(await wechatLib.getLoginTicket()),
  });
});

/**
 * Login via mobile number or email
 * @param req
 * @constructor
 */
export const POST = serverErrorCatcher(async (req: NextRequest) => {
  try {
    const { providerId, providerContent } =
      await ChatRequest.UserLogin.parseAsync(await req.json());

    return NextResponse.json({
      status: serverStatus.success,
      ...(await UserDAL.login({
        providerId: providerId as providerType,
        providerContent,
      })),
    });
  } catch (error) {
    console.error("[SERVER ERROR]", error);
    return new Response("[INTERNAL ERROR]", { status: 500 });
  }
});
