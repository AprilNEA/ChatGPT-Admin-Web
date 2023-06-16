import { NextRequest, NextResponse } from "next/server";

import { getRuntime } from "@/utils";

export const runtime = getRuntime();

/**
 * Reset usage limits
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {}
