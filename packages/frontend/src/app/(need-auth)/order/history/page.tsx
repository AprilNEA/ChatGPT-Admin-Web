'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { IconButton } from '@/components/button';
import { List, ListItem } from '@/components/ui-lib';
import CloseIcon from '@/icons/close.svg';
import Locale, { changeLang, getLang } from '@/locales';
import { useUserData } from '@/hooks/data/use-user';
import styles from '@/styles/module/profile.module.scss';
import { useOrderHistory } from '@/hooks/data/use-orderhistory';
import { Loading } from '@/components/loading';

export default function OrderHistory() {
  const router = useRouter();
  const { userData } = useUserData();
  const { orderHistory, isOrderHistoryLoading } = useOrderHistory();
  const [localUsername, setLocalUsername] = useState<string | null>(null);

  function DateFormat(time: string | number): string {
    const date = new Date(time);

    const day: string = ('0' + date.getDate()).slice(-2);
    const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
    const year: number = date.getFullYear();
  
    const hours: string = ('0' + date.getHours()).slice(-2);
    const minutes: string = ('0' + date.getMinutes()).slice(-2);
    const seconds: string = ('0' + date.getSeconds()).slice(-2);
  
    const formattedDate: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  if(isOrderHistoryLoading) return <Loading />;

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
            {userData?.avatar ? <img src={userData?.avatar} /> : <div>
              😺
            </div> }
          </div>
          <div className={styles['info']}>
            <div className={styles['username']}>{userData?.name ?? 'Username'}</div>
            <div className={styles['premium']}>{userData?.isPremium ? Locale.Premium.PremiumUser : Locale.Premium.NormalUser}</div>
          </div>
        </div>
        <List>
          {/*@ts-ignore*/}
          {orderHistory ? orderHistory.map((item) => (
            /*@ts-ignore*/
          <ListItem>
          <div className={styles['order-container']}>
          <div className={styles['order-info']}>
            <div>
              {/*@ts-ignore*/}
              <div className={styles['order-type']}>{Locale.OrderHistory.Type[item.type]}</div>
              <div className={styles['order-id']}>{`#${item.id}`}</div>
            </div>
            <div className={styles['order-status']}>
              {/*@ts-ignore*/}
              <div className={styles[item.status]}>{Locale.OrderHistory.Status[item.status]}</div>
              {item.isCurrent ? <div className={styles['current']}>{Locale.OrderHistory.Status.Current}</div> : ''}
            </div>
          </div>
          <div className={styles['order-details']}>
            <div className={styles['order-product']}>
              <div className={styles['order-product-name']}>{item.product.name}</div>
              <div className={styles['order-qty']}>x1</div>
            </div>
            <div className={styles['order-price']}>{`${Locale.OrderHistory.Paid} ￥${Number(item.amount)/100} / ￥${Number(item.product.price)/100}`}</div>
            <div className={styles['order-date-info']}>
              <div>{`${Locale.OrderHistory.ValidDate}${DateFormat(item.startAt)} - ${DateFormat(item.endAt)}`}</div>
              <div>{`${Locale.OrderHistory.CreateTime}${DateFormat(item.createdAt)}`}</div>
              <div>{`${Locale.OrderHistory.UpdateTime}${DateFormat(item.updatedAt)}`}</div>
            </div>
          </div>
          </div>
        </ListItem>
        /*@ts-ignore*/
        )): <ListItem>{Locale.OrderHistory.NoEntry}</ListItem>}
        </List>
      </div>
    </>
  );
}
