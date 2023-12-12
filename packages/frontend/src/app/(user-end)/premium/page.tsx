'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import Loading from '@/app/loading';
import { IconButton } from '@/components/button';
import {
  SelectionGroup,
  SelectionGroupButton,
} from '@/components/selection-group';
import CloseIcon from '@/icons/close.svg';
import ShoppingIcon from '@/icons/shopping.svg';
import TickIcon from '@/icons/tick.svg';
import Locale from '@/locales';
import { useStore } from '@/store';

import { ICategory, IProduct } from 'shared';

import styles from './pricing.module.scss';

function ProductItem({
  product,
  onClick,
}: {
  product: IProduct;
  onClick?: () => void;
}) {
  return (
    <div className={styles['pricing-item']}>
      <div className={styles['pricing-item-inner']}>
        <div className={styles['title']}>{product.name}</div>
        {/*{props.price.description && (*/}
        {/*  <div className={styles["sub-title"]}>{props.price.description}</div>*/}
        {/*)}*/}
        <div className={styles['pricing-item-price']}>
          ¥ {Number(product.price / 100).toFixed(2)}
        </div>
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
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default function PricingPage() {
  const router = useRouter();

  const { fetcher, setShowSideBar } = useStore();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const { data: categories, isLoading } = useSWR<ICategory[], any, string>(
    '/product/all',
    (url) => fetcher(url).then((res) => res.json()),
  );

  async function handlePay(productId: number) {
    const result = await (
      await fetcher('/order/new', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      })
    ).json();
    router.push(result.data.url);
  }

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
          {categories?.map((category, index) => {
            return (
              <SelectionGroupButton
                key={category.id}
                content={category.name}
                onClick={() => setCurrentCategoryIndex(index)}
                disabled={index === currentCategoryIndex}
              />
            );
          })}
        </SelectionGroup>
      </div>
      <div className={styles['container']}>
        {categories &&
          categories[currentCategoryIndex].products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onClick={() => handlePay(product.id)}
            />
          ))}
      </div>
    </>
  );
}
