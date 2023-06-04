import { NextRequest, NextResponse } from "next/server";
import { serverStatus } from "@caw/types";

const cache = new Map();

export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: serverStatus.success,
  });
}

export const runtime = "edge";
