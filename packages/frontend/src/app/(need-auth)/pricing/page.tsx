"use client";

import useSWR from "swr";

import { useStore } from "@/store";
import { IconButton } from "@/components/button";
import { ProductType, CategoryType } from "shared";

import Locale from "@/locales";
import styles from "./pricing.module.scss";
import TickIcon from "@/icons/tick.svg";
import CloseIcon from "@/icons/close.svg";
import ShoppingIcon from "@/icons/shopping.svg";

function ProductItem({ product }: { product: ProductType }) {
  return (
    <div className={styles["pricing-item"]}>
      <div className={styles["pricing-item-inner"]}>
        <div className={styles["title"]}>{product.name}</div>
        {/*{props.price.description && (*/}
        {/*  <div className={styles["sub-title"]}>{props.price.description}</div>*/}
        {/*)}*/}
        <div className={styles["pricing-item-price"]}>¥ {product.price}</div>
        <div style={{ marginTop: "5px" }}>
          {product.features.map((feature, index) => (
            <div key={index} className={styles["pricing-item-plan-feature"]}>
              <TickIcon
                style={{
                  fill: "#15b077",
                  width: 12,
                  height: 12,
                  marginRight: 4,
                }}
              />{" "}
              {feature}
            </div>
          ))}
        </div>
      </div>
      <div className={styles["purchase-wrapper"]}>
        <IconButton
          icon={<ShoppingIcon style={{ fill: "white" }} />}
          text={"购买"}
          className={styles["purchase"] + " no-dark"}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [fetcher] = useStore((state) => [state.fetcher]);
  const { data: categories, isLoading } = useSWR<CategoryType[]>(
    "/product",
    (url) => fetcher(url).then((res) => res.json()),
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className={styles["window-header"]}>
        <div className={styles["window-header-title"]}>
          <div className={styles["window-header-main-title"]}>
            {Locale.Profile.Title}
          </div>
          <div className={styles["window-header-sub-title"]}>
            {/*{!Locale.Profile.SubTitle}*/}副标题
          </div>
        </div>
        <div className={styles["window-actions"]}>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => {}}
              bordered
              title={Locale.Settings.Actions.Close}
            />
          </div>
        </div>
      </div>

      <div className={styles["container"]}>
        {categories &&
          categories.map((category) =>
            category.products.map((product) => (
              <ProductItem key={product.id} product={product} />
            )),
          )}
      </div>
    </>
  );
}
