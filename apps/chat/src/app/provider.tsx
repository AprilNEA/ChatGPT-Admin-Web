"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [sessionToken, validateSessionToken] = useUserStore((state) => [
    state.sessionToken,
    state.validateSessionToken,
  ]);

  useEffect(() => {
    if (!sessionToken || !validateSessionToken()) {
      if (!["/login", "/register", "/enter"].includes(pathname)) {
        return router.push("/enter");
      }
    } else if (["/login", "/register", "/enter"].includes(pathname)) {
      return router.replace("/");
    }
  }, [router, pathname, sessionToken, validateSessionToken]);

  return <>{children}</>;
}

export function Notice() {
  // Announcement(versionId, updateVersionId);
}
