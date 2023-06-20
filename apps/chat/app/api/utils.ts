import { NextRequest } from "next/server";
import { parseUserId } from "@caw/dal";
import { ServerError, serverStatus } from "@caw/types";

export async function gerUserId(req: NextRequest) {
  /* Passing from middleware, if possible */
  const userId = Number(req.headers.get("userId"));
  if (userId) return userId;
  const token = req.headers.get("Authorization");
  if (!token) throw new ServerError(serverStatus.invalidToken, "invalid token");
  return await parseUserId(token);
}
