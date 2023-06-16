import { NextRequest, NextResponse } from "next/server";
import { WechatLib } from "@/lib/wechat";

export async function GET(req: NextRequest) {
  const params = new URL(req.url).searchParams;
  console.log(JSON.stringify(params));
  const { signature, timestamp, nonce, echostr } = Object.fromEntries(params);
  const data = await req.text();
  console.log(JSON.stringify(data));
  if (data.length == 0) return new NextResponse(echostr);
  await WechatLib.handleEvent(data);
}

export async function POST(req: NextRequest) {
  const { openId, event, ticket } = await WechatLib.handleEvent(
    await req.text()
  );
  switch (event) {
    case "subscribe" /* 注册事件 */:
      break;
    case "SCAN" /* 登录事件 */:
      break;
  }
  return new NextResponse("success");
}
