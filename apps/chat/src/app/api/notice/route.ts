import { NextRequest, NextResponse } from "next/server";

import { getRuntime } from "@/utils";

export const runtime = getRuntime();

export async function GET(req: NextRequest) {
  // const noticeDal = new NoticeDAL();
  // const notice = await noticeDal.getNotice();
  //
  // if (!notice)
  //   return NextResponse.json(
  //     {
  //       status: ResponseStatus.failed,
  //     },
  //     {
  //       status: 404,
  //     }
  //   );
  //
  // return NextResponse.json({
  //   status: ResponseStatus.success,
  //   notice,
  // });
}
