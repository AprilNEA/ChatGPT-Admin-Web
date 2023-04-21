import { BingBot } from "bots";
import { NextRequest, NextResponse } from "next/server";
import { postPayload } from "@/app/api/bots/typing";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let payload;

  try {
    payload = await new NextResponse(req.body).json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 }); // TODO correct code
  }

  const parseResult = postPayload.safeParse(payload);

  if (!parseResult.success) return NextResponse.json(parseResult.error);

  const { conversation } = parseResult.data;

  const bot = new BingBot(process.env.BING_COOKIE!);

  return new NextResponse(bot.answerStream({conversation, signal: req.signal}));
}

export const config = {
  runtime: "edge",
};
