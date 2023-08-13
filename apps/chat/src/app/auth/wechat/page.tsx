"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Loading } from "@/components/loading";
import { useUserStore } from "@/store";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const code = useSearchParams().get("code") ?? undefined;
  const loginByWeChat = useUserStore((state) => state.loginByWeChat);

  useEffect(() => {
    loginByWeChat(router, code);
  });

  return <Loading />;
}
