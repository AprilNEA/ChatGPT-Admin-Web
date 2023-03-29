import {NextRequest, NextResponse} from "next/server";
import {registerUser} from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const {email, password} = await req.json()
    const cookie = await registerUser(email, password)
    if (cookie) {
      return NextResponse.json({
        success: true,
        data: {
          email: email,
          cookie,
        }
      })
    }
    return NextResponse.json({
      success: false,
    })
  } catch (error) {
    console.error("[Chat Stream]", error);
    return new Response('[INTERNAL ERROR]', {status: 500})
  }
}
