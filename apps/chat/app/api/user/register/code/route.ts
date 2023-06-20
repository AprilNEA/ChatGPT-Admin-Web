import { NextRequest, NextResponse } from "next/server";
import { CodeDAL, RegisterType } from "@caw/dal";

import { ChatRequest, ChatResponse, serverStatus } from "@caw/types";

import { sendEmail } from "@/app/lib/email";
import { serverErrorCatcher } from "@/app/api/catcher";

import { getRuntime } from "@/app/utils/get-runtime";
import { sendPhone } from "@/app/lib/phone";

export const runtime = getRuntime();

/**
 * Request verification code.
 * @param req
 * @constructor
 */
export const POST = serverErrorCatcher(
  async (req: NextRequest): Promise<Response> => {
    const { type, value } = await ChatRequest.UserRegisterCodeGet.parseAsync(
      await req.json(),
    );

    // Logic will automatically check the speed.
    const result = await CodeDAL.newCode({
      type: type,
      register: value,
    });

    switch (result.type) {
      case RegisterType.Email:
        // TODO 完善类型说明 @ Dc Amy
        await sendEmail(result.register, result.code);
        break;
      case RegisterType.Phone:
        // TODO
        await sendPhone(result.register, result.code);
        break;
    }

    return NextResponse.json({
      status: serverStatus.success,
      expiredAt: result.expiredAt,
    } as ChatResponse.UserRegisterCode);
  },
);
