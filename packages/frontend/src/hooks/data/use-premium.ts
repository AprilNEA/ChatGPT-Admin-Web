'use client';

import useSWR from 'swr';

import { useStore } from '@/store';

import { IUserData } from 'shared';

export const usePremiumData = () => {
  const { fetcher } = useStore();
  const { data: limitData, isLoading: limitDataLoading } = useSWR<{
    times: number;
  }>(
    '/user/limit',
    (url) =>
      fetcher(url)
        .then((res) => res.json())
        .then((res) => res.data),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

  return { limitData, limitDataLoading };
};
