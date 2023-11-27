'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

import { IconButton } from '@/components/button';
import { Loading } from '@/components/loading';
import { List, ListItem } from '@/components/ui-lib';
import { useUserData } from '@/hooks/data/use-user';
import CloseIcon from '@/icons/close.svg';
import Locale, { changeLang, getLang } from '@/locales';
import { useStore } from '@/store';
import styles from '@/styles/module/profile.module.scss';
import { DateFormat } from '@/utils/data-format';

import { IOrder } from 'shared';

export default function OrderHistory() {
  const router = useRouter();
  const { userData } = useUserData();
  const { fetcher } = useStore();
  const { data: orderHistory, isLoading: isOrderHistoryLoading } = useSWR<
    IOrder[]
  >(
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

  const [localUsername, setLocalUsername] = useState<string | null>(null);

  if (isOrderHistoryLoading) return <Loading />;

  return (
    <>
      <div className={styles['window-header']}>
        <div className={styles['window-header-title']}>
          <div className={styles['window-header-main-title']}>
            {Locale.OrderHistory.Title}
          </div>
        </div>
        <div className={styles['window-actions']}>
          <div className={styles['window-action-button']}>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => router.back()}
              bordered
              title={Locale.Settings.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles['profile']}>
        <div className={styles['info-overview']}>
          <div className={styles['avatar']}>
            <div>😺</div>
            {/*{userData?.avatar ? <img src={userData?.avatar} /> : <div>*/}
            {/*  😺*/}
            {/*</div> }*/}
          </div>
          <div className={styles['info']}>
            <div className={styles['username']}>
              {userData?.name ?? 'Username'}
            </div>
            <div className={styles['premium']}>
              {userData?.isPremium
                ? Locale.Premium.PremiumUser
                : Locale.Premium.NormalUser}
            </div>
          </div>
        </div>
        <List>
          {orderHistory ? (
            orderHistory.map((order) => (
              <ListItem key={order.id}>
                <div className={styles['order-container']}>
                  <div className={styles['order-info']}>
                    <div>
                      <div className={styles['order-type']}>
                        {/*@ts-ignore*/}
                        {Locale.OrderHistory.Type[order.type as any]}
                      </div>
                      <div className={styles['order-id']}>{`#${order.id}`}</div>
                    </div>
                    <div className={styles['order-status']}>
                      <div className={styles[order.status]}>
                        {/*@ts-ignore*/}
                        {Locale.OrderHistory.Status[order.status as any]}
                      </div>
                      {order.isCurrent && (
                        <div className={styles['current']}>
                          {Locale.OrderHistory.Status.Current}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles['order-details']}>
                    <div className={styles['order-product']}>
                      <div className={styles['order-product-name']}>
                        {order.product.name}
                      </div>
                      <div className={styles['order-qty']}>x1</div>
                    </div>
                    <div className={styles['order-price']}>{`${
                      Locale.OrderHistory.Paid
                    } ￥${Number(order.amount) / 100} / ￥${
                      Number(order.product.price) / 100
                    }`}</div>
                    <div className={styles['order-date-info']}>
                      <div>{`${Locale.OrderHistory.ValidDate}${DateFormat(
                        order.startAt,
                      )} - ${DateFormat(order.endAt)}`}</div>
                      <div>{`${Locale.OrderHistory.CreateTime}${DateFormat(
                        order.createdAt,
                      )}`}</div>
                      <div>{`${Locale.OrderHistory.UpdateTime}${DateFormat(
                        order.updatedAt,
                      )}`}</div>
                    </div>
                  </div>
                </div>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <>{Locale.OrderHistory.NoEntry}</>
            </ListItem>
          )}
        </List>
      </div>
    </>
  );
}
