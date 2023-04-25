import {NextRequest, NextResponse} from "next/server";
import {UserDAL, UserLogic, RegisterCodeLogic} from "database";
import {sendEmail} from "@/lib/email";
import {ReturnStatus, ResponseStatus} from "@/app/api/typing.d";


/**
 * Request verification code.
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest): Promise<Response> {

  const {searchParams} = new URL(req.url);

  const email = searchParams.get("email");

  if (!email) return NextResponse.json({status: ResponseStatus.notExist});

  const userDal = new UserDAL();
  if (await userDal.exists(email)) {
    return NextResponse.json({status: ResponseStatus.alreadyExisted});
  }

  // Logic will automatically check the speed.
  const registerCode = new RegisterCodeLogic()
  const codeData = await registerCode.newCode(email)

  return NextResponse.json({
    status: ResponseStatus.Success,
    code_data: codeData,
  });
}
