"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { DALType } from "@caw/types";
import { Loading } from "@/app/components/loading";
import { usePlan } from "@/app/api/[base]/api";
import CloseIcon from "@/app/icons/close.svg";
import ShoppingIcon from "@/app/icons/shopping.svg";
import { IconButton } from "@/app/components/button/button";
import { showToast } from "@/app/components/ui-lib/ui-lib";
import Locale from "@/app/locales";
import { apiPay } from "@/app/api";

import styles from "./profile.module.scss";
import Plan = DALType.Plan;
import Price = DALType.Price;
import { useNavigate } from "react-router-dom";
import { Path } from "@/app/constant";

function PricingItem(props: {
  router: AppRouterInstance;
  plan: Plan;
  price: Price;
}) {
  async function handleUpgrade(plan: Plan, price: Price) {
    const req = await apiPay(plan, price);
    if (!req) return showToast(Locale.Error.ConfigurationError);
    props.router.push(req.url);
  }

  return (
    <div className={styles.list}>
      <div className={styles["list-item"]}>
        <div className={styles.row}>
          <div className={styles["title"]}>
            {props.plan.name} - {props.price.name}
          </div>
          {/*{props.price.description && (*/}
          {/*  <div className={styles["sub-title"]}>{props.price.description}</div>*/}
          {/*)}*/}¥ {props.price.amount}
        </div>
        {props.plan.features.map((feature, index) => (
          <div key={index}>· {feature}</div>
        ))}
      </div>
      {props.price.name !== "Free" && (
        <div className={styles["purchase-wrapper"]}>
          <IconButton
            icon={ShoppingIcon}
            text={"购买"}
            className={styles["purchase"] + " no-dark"}
            onClick={() => handleUpgrade(props.plan, props.price)}
          />
        </div>
      )}
    </div>
  );
}

export function ProfilePage() {
  const navigate = useNavigate();
  const router = useRouter();
  const { data: planData, isLoading: isPlanLoading } = usePlan();

  if (isPlanLoading) return <Loading />;

  return (
    <>
      <div className={styles["window-header"]}>
        <div className={styles["window-header-title"]}>
          <div className={styles["window-header-main-title"]}>
            {Locale.Profile.Title}
          </div>
          <div className={styles["window-header-sub-title"]}>
            {!Locale.Profile.SubTitle}
          </div>
        </div>
        <div className={styles["window-actions"]}>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
              title={Locale.Settings.Actions.Close}
            />
          </div>
        </div>
      </div>

      <div className={styles["container"]}>
        {planData &&
          planData.plans.map((plan, index1) =>
            plan.prices.map((price, index2) => (
              <PricingItem
                key={`${index1}-${index2}`}
                router={router}
                plan={plan}
                price={price}
              />
            )),
          )}
      </div>
    </>
  );
}
