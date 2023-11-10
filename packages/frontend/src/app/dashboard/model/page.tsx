'use client';

import useSWR from 'swr';

import { Table } from '@radix-ui/themes';

import { Loading } from '@/components/loading';
import { useStore } from '@/store';

import { ChatSession, DashboardChatSession, IPagination } from 'shared';

export default function AdminModelPage() {
  const { fetcher } = useStore();
  const { data, isLoading } = useSWR<IPagination<DashboardChatSession>>(
    '/dashboard/chat/sessions',
    (url) => fetcher(url).then((res) => res.json()),
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>主题</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>消息数量</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>消耗Token</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>用户</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>更新时间</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data &&
          data.data?.map((row) => (
            <Table.Row>
              <Table.RowHeaderCell>{row.id}</Table.RowHeaderCell>
              <Table.Cell>{row.topic ?? '未命名'}</Table.Cell>
              <Table.Cell>{row._count.messages}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>{row.user.id ?? row.user.name}</Table.Cell>
              <Table.Cell>{row.updatedAt.toString()}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
}
