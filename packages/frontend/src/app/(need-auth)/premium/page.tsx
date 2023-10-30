'use client';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import { IconButton } from '@/components/button';
import CloseIcon from '@/icons/close.svg';
import ShoppingIcon from '@/icons/shopping.svg';
import TickIcon from '@/icons/tick.svg';
import Locale from '@/locales';
import { useStore } from '@/store';

import { CategoryType, ProductType } from 'shared';
import { SelectionGroup, SelectionGroupButton } from '@/components/selection-group';
import styles from './pricing.module.scss';
import { useEffect, useState } from 'react';
import { Loading } from '@/components/loading';

function ProductItem({ product }: { product: ProductType }) {
  return (
    <div className={styles['pricing-item']}>
      <div className={styles['pricing-item-inner']}>
        <div className={styles['title']}>{product.name}</div>
        {/*{props.price.description && (*/}
        {/*  <div className={styles["sub-title"]}>{props.price.description}</div>*/}
        {/*)}*/}
        <div className={styles['pricing-item-price']}>¥ {Number(product.price / 100).toFixed(2)}</div>
        <div style={{ marginTop: '5px' }}>
          {product.features.map((feature, index) => (
            <div key={index} className={styles['pricing-item-plan-feature']}>
              <TickIcon
                style={{
                  fill: '#15b077',
                  width: 12,
                  height: 12,
                  marginRight: 4,
                }}
              />{' '}
              {feature}
            </div>
          ))}
        </div>
      </div>
      <div className={styles['purchase-wrapper']}>
        <IconButton
          icon={<ShoppingIcon style={{ fill: 'white' }} />}
          text={'购买'}
          className={styles['purchase'] + ' no-dark'}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [page, setPage] = useState(1);
  const [currentList, setCurrentList] = useState(null);
  const router = useRouter();
  const { setShowSideBar } = useStore();
  const [fetcher] = useStore((state) => [state.fetcher]);
  const { data: categories, isLoading } = useSWR<CategoryType[]>(
    '/product/all',
    (url) => fetcher(url).then(res => res.json())
  );

    useEffect(() => {
      if(!isLoading){
        //@ts-ignore
        let list = [];
        //@ts-ignore
        categories[0].products.map(item => {list.push(<ProductItem key={item.id} product={item} />)});
        //@ts-ignore
        setPage(categories[0].id);
        //@ts-ignore
        setCurrentList(list);
      }
    },[categories,isLoading])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles['window-header']}>
        <div className={styles['window-header-title']}>
          <div className={styles['window-header-main-title']}>
            {Locale.Premium.Title}
          </div>
          <div className={styles['window-header-sub-title']}>
            {Locale.Premium.SubTitle}
          </div>
        </div>
        <div className={styles['window-actions']}>
          <div className={styles['window-action-button']}>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => {
                setShowSideBar(true);
                router.back();
              }}
              bordered
              title={Locale.Settings.Actions.Close}
            />
          </div>
        </div>
      </div>

      <div className={styles['sel-container']}>
      <SelectionGroup>
          {categories?.map(item => {
            return (
              <SelectionGroupButton
                key={item.id}
                content={item.name}
                onClick={() => {
                  //@ts-ignore
                  let list = [];
                  item.products.map(item => {list.push(<ProductItem key={item.id} product={item} />)});
                  setPage(item.id);
                  //@ts-ignore
                  setCurrentList(list);
                }}
                disabled={item.id === page}
              />
            )
          })}
        </SelectionGroup>
      </div>
      <div className={styles['container']}>
        {currentList}
      </div>
    </>
  );
}
