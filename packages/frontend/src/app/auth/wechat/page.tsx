'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Loading } from '@/components/loading';
import { useStore } from '@/store';

export default function Page() {
  // const router = useRouter();
  //
  // const code = useSearchParams().get("code") ?? undefined;
  // const loginByWeChat = useStore((state) => state.loginByWeChat);
  //
  // useEffect(() => {
  //   loginByWeChat(router, code);
  // });

  return <Loading />;
}
