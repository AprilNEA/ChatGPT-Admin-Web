import { NextRequest, NextResponse } from "next/server";
import { OpenAIBot, BingBot } from "@caw/bots";
import { parseUserId } from "@caw/dal";
import { BotType, serverStatus } from "@caw/types";

import { textSecurity } from "@/lib/content";
import { getRuntime } from "@/utils";
import { serverErrorCatcher } from "@/app/api/catcher";

const OPENAI_API_KEY = process.env.OPENAI_KEY!;
const BING_COOKIE = process.env.BING_COOKIE!;

export const runtime = getRuntime();

export const POST = serverErrorCatcher(
  async (req: NextRequest, { params }: { params: { model: string } }) => {
    let userId = Number(req.headers.get("userId")!);
    if (!userId) userId = await parseUserId(req.headers.get("Authorization")!);

    const parseResult = await BotType.postPayload.parseAsync(
      await new NextResponse(
        req.body
      ).json() /* A workaround to make stream work*/
    );

    const { conversation, maxTokens, model } = parseResult;

    let bot;

    switch (params.model) {
      case "openai":
        const validatedModel = BotType.gptModel.parse(model);
        bot = new OpenAIBot(OPENAI_API_KEY, validatedModel);
        break;
      case "new-bing":
        bot = new BingBot(BING_COOKIE);
        break;
      default:
        return NextResponse.json(
          { msg: "unable to find model" },
          { status: 404 }
        );
    }

    //
    // const rateLimit = await ModelRateLimiter.of({ email, model });
    //
    // if (rateLimit) {
    //   const { success, remaining } = await rateLimit.limitEmail();
    //
    //   if (!success)
    //     return NextResponse.json({ code: LimitReason.TooMany }, { status: 429 });
    // } else {
    //   console.debug("[RateLimit] 尚未设置 Free 计划的限制");
    // }
    //

    if (!(await textSecurity(conversation)))
      return NextResponse.json(
        {
          code: serverStatus.contentNotSafe,
          msg: "Contains sensitive keywords.",
        },
        { status: 402 }
      );

    return new NextResponse(
      bot.answerStream({ conversation, signal: req.signal })
    );
  }
);
