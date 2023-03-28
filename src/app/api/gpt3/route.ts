import { NextRequest, NextResponse } from "next/server";
import { LexGPT } from "@/app/api/gpt3/gpt3";

interface CompletionRequest {
  text: string;
  max_tokens: number;
}

export async function POST(req: NextRequest) {
  const requestBody = (await req.json()) as CompletionRequest;
  const { text, max_tokens } = requestBody;

  const completion = await new LexGPT(
    process.env.***REMOVED***!,
    max_tokens,
  ).complete(text);

  return completion;
}
