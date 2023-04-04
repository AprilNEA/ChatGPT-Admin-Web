import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ hello: "world" });
}
