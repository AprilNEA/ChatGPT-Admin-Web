import { NextRequest, NextResponse } from "next/server";
import { UserDAL } from "@caw/dal";
import {
  ServerError,
  serverStatus,
  ChatRequest,
  ChatResponse,
} from "@caw/types";

const ifVerifyCode = !!process.env.NEXT_PUBLIC_EMAIL_SERVICE;

import { getRuntime } from "@/app/utils/get-runtime";

export const runtime = getRuntime();

/**
 * Registered user
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest): Promise<Response> {
  /* TODO Next.js currently does not support the return type description
   * The correct return type here maybe look like Promise<NextResponse<ChatResponse.UserRegister>>
   * */
  try {
    const {
      email,
      phone,
      password,
      register_code: registerCode,
      invitation_code: invitationCode,
    } = await ChatRequest.UserRegisterPost.parseAsync(await req.json());

    /* Activation verification code */
    const result = await UserDAL.register({
      email,
      phone,
      password,
      registerCode,
      invitationCode,
    });

    return NextResponse.json({
      status: serverStatus.success,
      ...result,
    } as ChatResponse.UserRegister);
  } catch (error) {
    if (error instanceof ServerError)
      return NextResponse.json({ status: error.errorCode, msg: error.message });

    console.error("[REGISTER]", error);
    return new Response("[INTERNAL ERROR]", { status: 500 });
  }
}
