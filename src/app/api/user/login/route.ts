import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const {email, password} = await req.json()

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("[Chat Stream]", error);
    return new Response('[INTERNAL ERROR]', {status: 500})
  }
}
