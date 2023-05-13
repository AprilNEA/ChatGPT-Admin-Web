import { NextRequest, NextResponse } from "next/server";

const envVar = process.env;

export function GET(req: NextRequest) {
  return NextResponse.json({
    redis: {
      url: envVar.REDIS_URL,
      token: envVar.REDIS_TOKEN,
    },
  });
}
