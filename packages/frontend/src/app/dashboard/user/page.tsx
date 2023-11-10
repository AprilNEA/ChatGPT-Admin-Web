'use client';

import useSWR from 'swr';

import { Flex, Table } from '@radix-ui/themes';

import { Pagination } from '@/components/table';
import { usePager } from '@/hooks/use-pager';
import { useStore } from '@/store';

import { IAdminUserData, IPagination } from 'shared';

export default function AdminUserPage() {
  const { fetcher } = useStore();
  const pager = usePager({});

  const { data } = useSWR<IPagination<IAdminUserData>>(
    `/dashboard/users?page=${pager.page}&limit=${pager.limit}`,
    (url: string) => fetcher(url).then((res) => res.json()),
  );

  return (
    <Flex gap="3" direction="column" justify="center">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>用户名</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>角色</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>邮箱/手机号</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>是否被封禁</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>注册时间</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data &&
            data.data?.map((row) => (
              <Table.Row>
                <Table.RowHeaderCell>{row.id}</Table.RowHeaderCell>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.role}</Table.Cell>
                <Table.Cell>{`${row.phone} / ${row.email}`}</Table.Cell>
                <Table.Cell>{row.isBlocked}</Table.Cell>
                <Table.Cell>
                  {new Date(row.createdAt).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
      {data && <Pagination {...pager} meta={data.meta} />}
    </Flex>
  );
}
