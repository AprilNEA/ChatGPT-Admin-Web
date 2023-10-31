'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Loading from '@/app/loading';

export default function NewChatPage() {
  const router = useRouter();

  useEffect(() => {
    const newSessionId = crypto.randomUUID();
    router.replace(`/chat/${newSessionId}?new=true`);
  });

  return <Loading />;
}
