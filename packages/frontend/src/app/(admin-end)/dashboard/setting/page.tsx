'use client';

import useSWR from 'swr';

import { Loading } from '@/components/loading';
import { OptionListRoot, OptionNode } from '@/components/radix-ui-lib';
import { useStore } from '@/store';
import useInstallStore from '@/store/install';

export default function AdminSettingPage() {
  const { fetcher } = useStore();
  const { updateSettingItem } = useInstallStore();
  const { data, isLoading } = useSWR('/dashboard/config', (url) =>
    fetcher(url)
      .then((res) => res.json())
      .then((res) => {
        updateSettingItem([], res.data.value);
        return res.data;
      }),
  );
  if (isLoading || !data) return <Loading />;

  return (
    <OptionListRoot>
      {data.schema.map((item: any) => (
        <OptionNode key={item.key} schema={item} />
      ))}
    </OptionListRoot>
  );
}
