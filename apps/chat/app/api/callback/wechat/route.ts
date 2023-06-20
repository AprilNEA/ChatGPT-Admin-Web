import { NextRequest, NextResponse } from "next/server";
import { WechatLib } from "@/app/lib/wechat";

/**
 * 该函数为微信的验证调用
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const params = new URL(req.url).searchParams;
  console.log(JSON.stringify(params));
  const { signature, timestamp, nonce, echostr } = Object.fromEntries(params);
  const data = await req.text();
  console.log(JSON.stringify(data));
  if (data.length == 0) return new NextResponse(echostr);
}

/**
 * 微信服务器回调
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
  const wxLib = await WechatLib.create();
  await wxLib.handleEvent(await req.text());
  return new NextResponse("success");
}
