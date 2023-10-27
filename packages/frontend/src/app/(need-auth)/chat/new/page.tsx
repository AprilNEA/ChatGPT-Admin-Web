"use client";

import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import Chat from "@/components/chat";

export default function NewChatPage() {
  const router = useRouter();
  const newSessionId = uuidv4();
  router.push(`/chat/${newSessionId}`);
}
