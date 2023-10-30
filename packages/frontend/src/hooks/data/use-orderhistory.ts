'use client';

import useSWR from 'swr';

import { useStore } from '@/store';

import { IUserData } from 'shared';

export const useOrderHistory = () => {
  const { fetcher } = useStore();
  const { data: orderHistory, isLoading: isOrderHistoryLoading } = useSWR<IUserData>(
    '/order/all',
    (url) =>
      fetcher(url)
        .then((res) => res.json())
        .then((res) => res.data),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

  return { orderHistory, isOrderHistoryLoading};
};
