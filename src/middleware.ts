import {NextRequest, NextResponse} from "next/server";
import {ACCESS_CODES} from "./app/api/access";
import {validateCookie} from "@/lib/redis";

export const config = {
  matcher: ["/api/chat", "/api/chat-stream", "/api/gpt3", "/api/gpt4"],
};

export function middleware(req: NextRequest, res: NextResponse) {
  const email = req.headers.get("email");
  const token = req.headers.get("token");

  if (!email || !token || !validateCookie(email, token)) {
    return NextResponse.json(
      {
        needAccessCode: true,
        hint: "Unauthenticated, illegal access",
      },
      {
        status: 401,
      }
    );
  }

  return NextResponse.next();
}
