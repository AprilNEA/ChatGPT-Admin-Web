"use client";

import { SWRConfig } from "swr";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useUserStore, useNoticeStore } from "@/store";
import { showAnnouncement, useNotice } from "@/hooks/use-notice";

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

export function NoticeProvider({ children }: { children: React.ReactNode }) {
  const notice = useNotice();

  useEffect(() => {
    if (notice) showAnnouncement(notice);
  }, [notice]);

  return <>{children}</>;
}

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
