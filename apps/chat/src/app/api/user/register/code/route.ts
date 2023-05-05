import { NextRequest, NextResponse } from "next/server";
import { RegisterCodeLogic, RegisterReturnStatus } from "database";
import { sendEmail } from "@/lib/email";
import { ResponseStatus } from "@/app/api/typing.d";

/**
 * Request verification code.
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");

  if (!email) return NextResponse.json({ status: ResponseStatus.notExist });

  // Logic will automatically check the speed.
  const registerCode = new RegisterCodeLogic();
  const codeData = await registerCode.newCode(email);

  switch (codeData.status) {
    case RegisterReturnStatus.Success:
      await sendEmail(email, codeData?.code);
      // @ts-ignore
      delete codeData.code;
      return NextResponse.json({
        status: ResponseStatus.Success,
        code_data: codeData,
      });
    case RegisterReturnStatus.AlreadyRegister:
      return NextResponse.json({ status: ResponseStatus.alreadyExisted });
    case RegisterReturnStatus.TooFast:
      return NextResponse.json({ status: ResponseStatus.tooFast });
    case RegisterReturnStatus.UnknownError:
    default:
      return NextResponse.json(
        { status: ResponseStatus.unknownError },
        { status: 500 }
      );
  }
}
