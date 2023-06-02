import { NextRequest, NextResponse } from "next/server";
import { isInit, setInit } from "database";

export async function GET(req: NextRequest) {
  return NextResponse.json({ is_init: await isInit("chat") });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ set_init: await setInit("chat") });
}
