import { NextRequest, NextResponse } from "next/server";
import { chatStartUp } from "@caw/dal/src/utils/startup";
import { serverStatus } from "@caw/types";

export default async function startUp(req: NextRequest) {
  return NextResponse.json({
    status: serverStatus.success,
    ...(await chatStartUp()),
  });
}
