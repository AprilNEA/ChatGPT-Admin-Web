import { NextRequest, NextResponse } from "next/server";
import { OrderDAL, Plan } from "dal";
import { ResponseStatus } from "@/app/api/typing.d";

export async function GET(req: NextRequest) {
  const email = req.headers.get("email");
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");
  if (!orderId || !email)
    return NextResponse.json({ status: ResponseStatus.Failed });
  const orderStatus = await OrderDAL.checkStatus(orderId);
  return NextResponse.json({ status: ResponseStatus.Success, orderStatus });
}
