import {NextRequest, NextResponse} from "next/server";
import {getWithEmail} from "@/lib/redis";
import type {Cookie} from "@/lib/redis/typing";

export async function POST(req: NextRequest) {
  try {
    const {email, password} = await req.json()
    const cookie: Cookie | null = await getWithEmail(email).login(password)
    if (cookie){
      return NextResponse.json({
        success: true,
        cookie,
      })
    } else {
      return NextResponse.json({
        success: false,
      })
    }

  } catch (error) {
    console.error("[Chat Stream]", error);
    return new Response('[INTERNAL ERROR]', {status: 500})
  }
}
