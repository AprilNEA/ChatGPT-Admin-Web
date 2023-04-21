"use client";

import { useState, useEffect } from "react";
import { Chat } from "@/components/chat";

/**
 * 修复水合错误
 */
const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export default function ChatPage() {
  return <Chat />;
}
