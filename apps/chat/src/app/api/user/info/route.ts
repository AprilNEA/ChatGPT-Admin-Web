import { NextRequest, NextResponse } from "next/server";
import { serverStatus } from "@caw/types";

import { getRuntime } from "@/utils";

export const runtime = getRuntime();

export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: serverStatus.success,
  });
}
