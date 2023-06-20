import { NextRequest, NextResponse } from "next/server";
import { UserDAL, providerType, WechatDAL, resumeToken } from "@caw/dal";
import { serverStatus, ChatRequest } from "@caw/types";
import { serverErrorCatcher } from "@/app/api/catcher";
import { WechatLib } from "@/app/lib/wechat";
import { getRuntime } from "@/app/utils/get-runtime";

export const runtime = getRuntime();

/**
 * Request Code Ticket for WeChat Login
 * If there is a ticket in the parameter, check if the QR code is scanned
 * If not, get a new ticket
 * @param req
 * @returns Return Ticket and Expiration Time
 */
export const GET = serverErrorCatcher(async (req: NextRequest) => {
  const params = new URL(req.url).searchParams;
  const token = params.get("token");
  if (token) {
    return NextResponse.json({
      status: serverStatus.success,
      ...(await resumeToken(token)),
    });
  }
  const ticket = params.get("ticket");
  if (ticket) {
    return NextResponse.json({
      status: serverStatus.success,
      ...(await WechatDAL.loginTicket(ticket)),
    });
  }
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
