import { NextRequest, NextResponse } from "next/server";
import { UserDAL } from "dal";

export async function GET(req: NextRequest) {
  // const email = req.headers.get("email");

  const user = await UserDAL.listUsers();

  return NextResponse.json({
    status: 1,
    data: user,
  });
}

export const config = {
  runtime: "edge",
};
