'use client';

import useSWR from 'swr';

import { Loading } from '@/components/loading';
import { OptionListRoot, OptionNode } from '@/components/radix-ui-lib';
import { useStore } from '@/store';

export default function AdminSettingPage() {
  const { fetcher } = useStore();
  const { data } = useSWR('/dashboard/install', (url) =>
    fetcher(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      }),
  );
  if (!data) return <Loading />;
  return (
    <OptionListRoot>
      {data.map((item: any) => (
        <OptionNode key={item.key} schema={item} />
      ))}
    </OptionListRoot>
  );
}
