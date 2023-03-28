import {NextRequest, NextResponse} from "next/server";
import {newUser} from "@/lib/redis/user";

export async function POST(req: NextRequest) {
  try {
    const {email, password} = await req.json()
    const hash_password = await newUser(email, password)
    return NextResponse.json({
      success: true,
      data: {
        email: email,
        password: hash_password
      }
    })
  } catch (error) {
    console.error("[Chat Stream]", error);
    return new Response('[INTERNAL ERROR]', {status: 500})
  }
}
