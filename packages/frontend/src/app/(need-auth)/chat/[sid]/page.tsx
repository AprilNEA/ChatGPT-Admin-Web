"use client";

import Chat from "@/components/chat";

export default function ChatPage({ params }: { params: { sid: string } }) {
  return <Chat sid={params.sid} />;
}
