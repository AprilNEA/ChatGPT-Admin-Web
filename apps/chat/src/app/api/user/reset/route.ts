import { NextRequest, NextResponse } from "next/server";
import { ResponseStatus } from "@/app/api/typing.d";

/**
 * 重置使用限制
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest): Promise<Response> {
  const email = req.headers.get("email")!;

  return NextResponse.json({ status: ResponseStatus.Failed });
}
