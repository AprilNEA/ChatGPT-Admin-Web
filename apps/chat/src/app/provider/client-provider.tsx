"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store";

import { Loading } from "@/components/loading";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const validateSession = useStore((state) => state.validateSession);
  //
  // const pathname = usePathname();
  // const router = useRouter();
  //
  // const [isValidating, setIsValidating] = useState(true);
  //
  // const validate = useCallback(async () => {
  //   const isValid = await validateSession();
  //   if (!isValid) {
  //     router.push("/auth");
  //   } else {
  //     setIsValidating(false);
  //     if (pathname.startsWith("/auth")) {
  //       router.push("/");
  //     }
  //   }
  // }, [pathname, validateSession, router]);
  //
  // useEffect(() => {
  //   validate();
  // }, [pathname, validate]);
  //
  // if (isValidating) {
  //   return <Loading />;
  // }

  return children;
}
