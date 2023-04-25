import {NextRequest, NextResponse} from "next/server";
import {AccessControlLogic} from "database";
import {ResponseStatus} from "@/app/api/typing.d";

/**
 * 重置使用限制
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest): Promise<Response> {
  const email = req.headers.get("email")!;

  const accessControl = new AccessControlLogic();

  // 成功重置
  if (await accessControl.resetLimit(email))
    return NextResponse.json({
      status: ResponseStatus.Success,
    });

  return NextResponse.json({status: ResponseStatus.Failed});
}
