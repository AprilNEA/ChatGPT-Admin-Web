'use client';

import useSWR from 'swr';

import { Flex, Table } from '@radix-ui/themes';

import { Pagination } from '@/components/table';
import { usePager } from '@/hooks/use-pager';
import { useStore } from '@/store';

import { IAdminOrder, IPagination } from 'shared';

export default function AdminOrderPage() {
  const { fetcher } = useStore();
  const pager = usePager({});

  const { data } = useSWR<IPagination<IAdminOrder>>(
    `/dashboard/orders?page=${pager.page}&limit=${pager.limit}`,
    (url: string) => fetcher(url).then((res) => res.json()),
  );

  return (
    <Flex gap="3" direction="column" justify="center">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>订单号</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>状态</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>用户</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>产品</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>金额</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>创建时间</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data &&
            data.data?.map((row) => (
              <Table.Row>
                <Table.RowHeaderCell>{row.id}</Table.RowHeaderCell>
                <Table.Cell>{row.status}</Table.Cell>
                <Table.Cell>{row.user.name ?? row.user.id}</Table.Cell>
                <Table.Cell>{row.product.name}</Table.Cell>
                <Table.Cell>¥ {row.amount}</Table.Cell>
                <Table.Cell>{row.updatedAt.toString()}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
      {data && <Pagination {...pager} meta={data.meta} />}
    </Flex>
  );
}
