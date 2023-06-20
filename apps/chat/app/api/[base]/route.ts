import { serverErrorCatcher } from "@/app/api/catcher";
import { NextRequest, NextResponse } from "next/server";
import { serverStatus, ChatResponse } from "@caw/types";

export const GET = serverErrorCatcher(
  async (req: NextRequest, { params }: { params: { base: string } }) => {
    switch (params.base) {
      case "plan":
        const PlanDAL = (await import("@caw/dal")).PlanDAL;
        return NextResponse.json({
          status: serverStatus.success,
          plans: await PlanDAL.getPlan(),
        } as ChatResponse.PlanGet);
      case "startup":
        return await (await import("./startup")).default(req);
    }
    return NextResponse.json({
      base: params.base,
    });
  },
);
