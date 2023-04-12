import { NextRequest, NextResponse } from "next/server";
import { POSTBody, sendMessageAndGetStream } from "@/lib/bing";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: Omit<POSTBody, "cookie"> = await new Response(req.body).json();
  const { userMessage, history } = body;

  const stream = await sendMessageAndGetStream({
    userMessage,
    history,
    cookie: process.env.BING_COOKIE!, // TODO: cookie pool
  });

  return new NextResponse(stream);
}

export const config = {
  runtime: "edge",
};
