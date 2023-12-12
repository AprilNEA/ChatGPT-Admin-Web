'use client';

import useSWR from 'swr';

import { Box, Grid, Text } from '@radix-ui/themes';

import { Loading } from '@/components/loading';
import { useStore } from '@/store';

const analytics = [
  { key: 'user', label: '总用户数' },
  { key: 'session', label: '总对话数' },
  { key: 'message', label: '总消息数' },
  { key: 'orderCount', label: '总订单数' },
  { key: 'orderAmount', label: '总收入' },
];

const valueFormatter = (number: number) =>
  `$ ${new Intl.NumberFormat('us').format(number).toString()}`;

export default function DashboardIndex() {
  const { fetcher } = useStore();
  const { data, isLoading } = useSWR('/dashboard/analytics', (url) =>
    fetcher(url)
      .then((res) => res.json())
      .then((res) => res.data),
  );

  if (isLoading) return <Loading />;

  return (
    <Grid columns="6" gap="3" width="auto">
      {analytics.map((item) => (
        <Box key={item.key}>
          <Text as="p" size="2" weight="medium">
            {item.label}
          </Text>
          <Text as="p" size="6" weight="bold">
            {data[item.key]}
          </Text>
        </Box>
      ))}
    </Grid>
  );
}
