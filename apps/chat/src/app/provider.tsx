"use client";

import React, { useEffect} from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [sessionToken, validateSessionToken] =
    useUserStore((state) => [
      state.sessionToken,
      state.validateSessionToken,
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
