import { OpenAIBot, BingBot } from "bots";
import { NextRequest, NextResponse } from "next/server";
import { postPayload } from "@/app/api/bots/typing";
import { textSecurity } from "@/lib/content";
import { ModelRateLimiter } from "database";
import { LimitReason } from "@/typing.d";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const BING_COOKIE = process.env.BING_COOKIE!;

export async function POST(
  req: NextRequest,
  { params }: { params: { model: string } }
): Promise<NextResponse> {
  const email = req.headers.get("email")!;

  console.debug("[Route] [Bots]", email);

  let payload;

  try {
    payload = await new NextResponse(req.body).json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 }); // TODO correct code
  }

  const parseResult = postPayload.safeParse(payload);

  if (!parseResult.success) return NextResponse.json(parseResult.error);

  const { conversation, maxTokens, model } = parseResult.data;

  let bot;

  switch (params.model) {
    case "openai":
      bot = new OpenAIBot(OPENAI_API_KEY, model);
      break;
    case "new-bing":
      bot = new BingBot(BING_COOKIE);
      break;
    default:
      return NextResponse.json({}, { status: 404 });
  }

  const rateLimit = await ModelRateLimiter.of({ email, model });

  if (rateLimit) {
    const { success, remaining } = await rateLimit.limitEmail();

    if (!success)
      return NextResponse.json({ code: LimitReason.TooMany }, { status: 429 });
  } else {
    console.debug("[RateLimit] 尚未设置 Free 计划的限制");
  }

  // 文本安全 TODO 节流
  if (!(await textSecurity(conversation)))
    return NextResponse.json(
      { code: LimitReason.TextNotSafe, msg: "Contains sensitive keywords." },
      { status: 402 }
    );

  return new NextResponse(
    bot.answerStream({ conversation, signal: req.signal })
  );
}

export const runtime = "edge";
