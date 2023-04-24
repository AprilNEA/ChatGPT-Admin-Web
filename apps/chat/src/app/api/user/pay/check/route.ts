import { NextRequest, NextResponse } from "next/server";
import { OrderLogic } from "database";
import { ResponseStatus } from "@/app/api/typing.d";

export async function GET(req: NextRequest) {
  const email = req.headers.get("email")!;
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");
  if (!orderId || !email) {
    return NextResponse.json({ status: ResponseStatus.Failed });
  }
  const orderLogic = new OrderLogic();
  const orderStatus = await orderLogic.checkStatus(orderId);
  return NextResponse.json({ status: ResponseStatus.Success, orderStatus });
}
