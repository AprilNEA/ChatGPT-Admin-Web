'use client';

import useSWR from 'swr';

import { Flex, Table } from '@radix-ui/themes';

import { Pagination } from '@/components/table';
import { usePager } from '@/hooks/use-pager';
import { useStore } from '@/store';

export default function AdminProductPage() {
  const { fetcher } = useStore();
  const pager = usePager({});
  const { data } = useSWR('/order', (url) =>
    fetcher(url).then((res) => res.json()),
  );
}
