'use client';

import Chat from '@/components/chat';
import { useStore } from '@/store';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const isNew = useSearchParams().get('new') === 'true';

  const { currentChatSessionId, updateSessionId } = useStore();

  useEffect(() => {
    if (params.sessionId !== currentChatSessionId) {
      updateSessionId(params.sessionId, isNew);
    }
  }, [params, isNew, currentChatSessionId, updateSessionId]);

  return <Chat />;
}
