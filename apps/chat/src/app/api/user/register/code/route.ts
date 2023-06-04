import { NextRequest, NextResponse } from "next/server";
import { CodeDAL, RegisterType } from "@caw/dal";

import { ChatRequest, ChatResponse, serverStatus } from "@caw/types";

import { sendEmail } from "@/lib/email";
import { serverErrorCatcher } from "@/app/api/catcher";

/**
 * Request verification code.
 * @param req
 * @constructor
 */
export const GET = serverErrorCatcher(
  async (req: NextRequest): Promise<Response> => {
    const { searchParams } = new URL(req.url);

    const { type, value } = await ChatRequest.UserRegisterCodeGet.parseAsync(
      searchParams
    );

    // Logic will automatically check the speed.
    const result = await CodeDAL.newCode({
      type: type as RegisterType,
      register: value,
    });
    switch (result.type) {
      case RegisterType.Email:
        // TODO 完善类型说明 @ Dc Amy
        await sendEmail(result.register, result.code);
        break;
      case RegisterType.Phone:
        // TODO
        break;
    }
    return NextResponse.json({
      status: serverStatus.success,
      expiredAt: result.expiredAt,
    } as ChatResponse.UserRegisterCode);
  }
);

export const runtime = "edge";
