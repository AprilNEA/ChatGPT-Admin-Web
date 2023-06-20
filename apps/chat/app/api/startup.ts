import { serverErrorCatcher } from "@/app/api/catcher";
import { NextRequest, NextResponse } from "next/server";
import { PlanDAL } from "@caw/dal";
import { serverStatus, ChatResponse } from "@caw/types";

export const runtime = "nodejs";

export const GET = serverErrorCatcher(
  async (req: NextRequest): Promise<Response> => {
    return NextResponse.json({
      status: serverStatus.success,
      plans: await PlanDAL.getPlan(),
    } as ChatResponse.PlanGet);
  }
);
