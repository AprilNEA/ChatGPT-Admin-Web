"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Announcement } from "@/hooks/use-notice";
import { useUserStore } from "@/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [sessionToken, validateSessionToken, versionId, updateVersionId] =
    useUserStore((state) => [
      state.sessionToken,
      state.validateSessionToken,
      state.versionId,
      state.updateVersionId,
    ]);

  useEffect(() => {
    // Announcement(versionId, updateVersionId);
    if (!sessionToken || !validateSessionToken()) {
      if (pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [sessionToken]);

  return <>{children}</>;
}
