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
  const { validateSession } = useStore();

  const pathname = usePathname();
  const router = useRouter();

  const [isValidating, setIsValidating] = useState(true);

  const validate = useCallback(async () => {
    const isValid = await validateSession();
    if (!isValid) {
      router.push("/auth");
    } else {
      setIsValidating(false);
      if (pathname.startsWith("/auth")) {
        router.push("/");
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
