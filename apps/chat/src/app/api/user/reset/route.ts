import { NextRequest, NextResponse } from "next/server";

import { ModelRateLimiter, UserLogic } from "database";
import { ResponseStatus } from "@/app/api/typing.d";

/**
 * 重置使用限制
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest): Promise<Response> {
  const email = req.headers.get("email")!;
  const user = new UserLogic();

  const chancesRemain = await user.setResetChancesOf(email, -1);
  if (!chancesRemain)
    return NextResponse.json({
      status: ResponseStatus.Failed,
    });

  const rateLimit = await ModelRateLimiter.of({
    email,
    model: "gpt-3.5-turbo",
  });

  if (rateLimit) {
    await rateLimit.clear();
    return NextResponse.json({ status: ResponseStatus.Success });
  }

  return NextResponse.json({
    status: ResponseStatus.Failed,
  });
}

export const runtime = "edge";
