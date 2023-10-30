'use client';

import useSWR from 'swr';

import { useStore } from '@/store';

import { IUserData } from 'shared';

export const useUserData = () => {
  const { fetcher } = useStore();
  const { data: userData, isLoading: isUserDataLoading } = useSWR<IUserData>(
    '/user/info',
    (url) =>
      fetcher(url)
        .then((res) => res.json())
        .then((res) => res.data),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

  return { userData, isUserDataLoading };
};
