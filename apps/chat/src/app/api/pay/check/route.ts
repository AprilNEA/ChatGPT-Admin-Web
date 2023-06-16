import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // const email = req.headers.get("email")!;
  // const { searchParams } = new URL(req.url);
  // const orderId = searchParams.get("order_id");
  // if (!orderId || !email) {
  //   return NextResponse.json({ status: ResponseStatus.failed });
  // }
  // const orderLogic = new OrderLogic();
  // const orderStatus = await orderLogic.checkStatus(orderId);
  // return NextResponse.json({ status: ResponseStatus.success, orderStatus });
}

export const runtime = "edge";
