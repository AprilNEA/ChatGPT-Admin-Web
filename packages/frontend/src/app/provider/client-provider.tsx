"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store";

import { Loading } from "@/components/loading";
import { SWRConfig } from "swr";

export function AuthProvider({
  children,
  admin = false,
}: {
  children: React.ReactNode;
  admin?: boolean;
}) {
  const { sessionToken } = useStore();

  const pathname = usePathname();
  const router = useRouter();

  const [isValidating, setIsValidating] = useState(true);

  function validateSession() {
    if (!sessionToken) return false;

    try {
      if (admin) {
        const payload = JSON.parse(atob(sessionToken.split(".")[1]));
        if (payload.role !== "Admin") {
          return false;
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  const validate = useCallback(() => {
    const isValid = validateSession();
    if (!isValid) {
      if (admin) {
        return router.push("/");
      }
      return router.push("/auth");
    } else {
      setIsValidating(false);
      if (pathname.startsWith("/auth")) {
        return router.push("/");
      }
    }
  }, [pathname, validateSession, router]);

  useEffect(() => {
    validate();
  }, [pathname, validate]);

  if (isValidating) {
    return <Loading />;
  }

  return <>{children}</>;
}

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );
}
