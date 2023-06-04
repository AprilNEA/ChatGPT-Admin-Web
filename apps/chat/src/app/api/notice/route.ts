import { NextRequest, NextResponse } from "next/server";
// import { NoticeDAL } from "database";
// import { ResponseStatus } from "@/app/api/typing.d";

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

export const runtime = "edge";
