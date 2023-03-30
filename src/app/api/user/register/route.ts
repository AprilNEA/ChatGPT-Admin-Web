import {NextRequest, NextResponse} from "next/server";
import {registerUser, activateRegisterCode} from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const {email, password, code} = await req.json()
    // 激活验证码
    const success = await activateRegisterCode(email, code)
    if (!success) {
      return NextResponse.json({
        status: 'wrongCode',
      })
    }
    const cookie = await registerUser(email, password)
    if (cookie) {
      return NextResponse.json({
        status: 'success',
        cookie,
      })
    }
    return NextResponse.json({
      success: 'failed',
    })
  } catch (error) {
    console.error("[Chat Stream]", error);
    return new Response('[INTERNAL ERROR]', {status: 500})
  }
}
