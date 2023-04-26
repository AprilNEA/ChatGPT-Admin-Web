import {NextRequest, NextResponse} from "next/server";

import {UserDAL} from "database";

export async function POST(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const cursor = Number(params.get("cursor")) ?? 0;
  const userDal = new UserDAL()
  // const [count, users] = await userDal.listValues(cursor)

  // return NextResponse.json({
  //   status: 0,
  //   data: {
  //     count,
  //     users
  //   },
  // });
}

export const config = {
  runtime: "edge",
};
