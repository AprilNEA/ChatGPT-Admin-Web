"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/store";
import { GeistProvider, CssBaseline } from "@geist-ui/core";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <GeistProvider>
      <CssBaseline />
      {children}
    </GeistProvider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [sessionToken, validateSessionToken] = useUserStore((state) => [
    state.sessionToken,
    state.validateSessionToken,
  ]);

  useEffect(() => {
    if (!sessionToken || !validateSessionToken()) {
      if (pathname !== "/login") return router.push("/login");
    } else {
      if (pathname == "/login") return router.replace("/");
    }
  }, [router, pathname, sessionToken, validateSessionToken]);

  return <>{children}</>;
}
