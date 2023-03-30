import {NextRequest, NextResponse} from "next/server";
import {getWithEmail, newRegisterCode} from "@/lib/redis";
import type {Cookie} from "@/lib/redis/typing";
import {sendEmail} from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const {email, password} = await req.json()
    const user = getWithEmail(email)

    // 如果用户不存在, 则发送验证码
    if (!await user.exists()) {
      const randomCode = await newRegisterCode(email)
      await sendEmail([email], "", `${randomCode}`)
      return NextResponse.json({
        status: "new",
      })
    }

    const cookie: Cookie | null = await user.login(password)
    if (cookie) {
      return NextResponse.json({
        status: "success",
        cookie,
      })
    } else {
      return NextResponse.json({
        status: "failed",
      })
    }

  } catch (error) {
    console.error("[Chat Stream]", error);
    return new Response('[INTERNAL ERROR]', {status: 500})
  }
}
