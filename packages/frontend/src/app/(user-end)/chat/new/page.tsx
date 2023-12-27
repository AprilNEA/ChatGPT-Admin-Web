'use client';

/* 此处的 use client 不能被移除，即使本页面看上去没有客户端组件
   移除将会导致在客户端未刷新的情况下 randomUUID 永远相同 */
import { RedirectType, redirect } from 'next/navigation';

import { randomUUID } from '@/utils/client-utils';

export default function NewChatPage() {
  redirect(`/chat/${randomUUID()}?new=true`, RedirectType.replace);
}
