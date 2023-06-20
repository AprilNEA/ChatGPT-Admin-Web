import { NextResponse } from "next/server";
import { ServerError } from "@caw/types";

export function serverErrorCatcher(target: (...args: any[]) => any) {
  return async function (...args: any[]) {
    try {
      return await target(...args);
    } catch (error) {
      if (error instanceof ServerError) {
        return NextResponse.json({
          status: error.errorCode,
          message: error.message,
        });
        // switch (error.errorCode) {
        //
        // }
      }
      throw error;
    }
  };
}
