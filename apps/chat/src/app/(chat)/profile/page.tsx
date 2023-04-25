"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";

import { useSettingStore, useUserStore } from "@/store";

import { Avatar } from "@/components/avatar";
import { Loading } from "@/components/loading";
import { List, ListItem, Popover, showToast } from "@/components/ui-lib";
import styles from "@/styles/module/profile.module.scss";

import Locale from "@/locales";
import { IconButton } from "@/components/button";
import CloseIcon from "@/assets/icons/close.svg";
import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";

import { copyToClipboard } from "@/utils/utils";

function ProfileItem(props: {
  title: string;
  subTitle?: string;
  children: JSX.Element;
}) {
  return (
    <ListItem>
      <div className={styles["settings-title"]}>
        <div>{props.title}</div>
        {props.subTitle && (
          <div className={styles["settings-sub-title"]}>{props.subTitle}</div>
        )}
      </div>
      {props.children}
    </ListItem>
  );
}

export default function Profile() {
  const router = useRouter();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [config, updateConfig, resetConfig] = useSettingStore((state) => [
    state.config,
    state.updateConfig,
    state.resetConfig,
  ]);
  const [email, requestsNo, updateRequestsNo, sessionToken] = useUserStore(
    (state) => [
      state.email,
      state.requestsNo,
      state.updateRequestsNo,
      state.sessionToken,
    ]
  );
  const fetchChances = async (url: string): Promise<number> => {
    const response = await fetch(url, {
      method: "GET",
      headers: { email, token: sessionToken ?? "" },
    });
    const data: { status: number; chances: number } = await response.json();
    return data.chances;
  };

  const { data: chances, isLoading: chancesLoading } = useSWR<number>(
    "/api/user/reset",
    fetchChances
  );

  const { data: count, isLoading: countLoading } = useSWR(
    "/api/user/get-limit",
    (url) =>
      fetch(url, {
        headers: { Authorization: sessionToken ?? "" },
      })
        .then((res) => res.json())
        .then((res) => res.requestNos.length)
  );

  const { data: PlanAndInviteCode, isLoading: PlanLoading } = useSWR(
    "/api/user/info",
    (url) =>
      fetch(url, {
        headers: { Authorization: sessionToken ?? "1" },
      }).then((res) => res.json())
  );

  const { role: plan, inviteCode: inviteCode } = PlanAndInviteCode ?? {
    role: "free",
    inviteCode: "",
  };
  const [selectPlan, setSelectPlan] = useState(plan);

  if (PlanLoading || countLoading || chancesLoading) return <Loading />;

  async function handleResetLimit() {
    if (chances && chances < 1) {
      showToast("重置次数已用完");
      return;
    }
    fetch("/api/user/reset", {
      cache: "no-store",
      method: "POST",
      headers: { email, token: sessionToken ?? "" },
    }).then((res) => {
      if (res.ok) {
        showToast("成功重置");
      } else {
        showToast("重置失败");
      }
    });
  }

  async function handleUpgrade() {
    const req = await (
      await fetch(`/api/user/pay?plan=${selectPlan}`, {
        cache: "no-store",
        method: "GET",
        headers: { email },
      })
    ).json();
    const url = req.url;
    router.push(url);
  }

  return (
    <>
      <div className={styles["window-header"]}>
        <div className={styles["window-header-title"]}>
          <div className={styles["window-header-main-title"]}>
            {Locale.Settings.Title}
          </div>
          <div className={styles["window-header-sub-title"]}>
            {Locale.Settings.SubTitle}
          </div>
        </div>
        <div className={styles["window-actions"]}>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => router.back()}
              bordered
              title={Locale.Settings.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["settings"]}>
        <List>
          <ProfileItem title={Locale.Settings.Avatar}>
            <Popover
              onClose={() => setShowEmojiPicker(false)}
              content={
                <EmojiPicker
                  lazyLoadEmojis
                  theme={EmojiTheme.AUTO}
                  onEmojiClick={(e) => {
                    updateConfig((config) => (config.avatar = e.unified));
                    setShowEmojiPicker(false);
                  }}
                />
              }
              open={showEmojiPicker}
            >
              <div
                className={styles.avatar}
                onClick={() => setShowEmojiPicker(true)}
              >
                <Avatar role="user" />
              </div>
            </Popover>
          </ProfileItem>

          <ProfileItem title={Locale.Settings.Account}>
            <div>{email}</div>
          </ProfileItem>

          <ProfileItem
            title={Locale.Profile.Plan.Title}
            subTitle="切换计划来升级"
          >
            <>
              <select
                value={selectPlan}
                onChange={(e) => {
                  setSelectPlan(e.target.value as any);
                }}
              >
                <option value="free" key="free">
                  Free
                </option>

                <option value="pro" key="pro">
                  Pro
                </option>

                <option value="premium" key="premium">
                  Premium
                </option>
              </select>
              {plan !== selectPlan && (
                <button
                  className={styles["copy-button"]}
                  onClick={handleUpgrade}
                >
                  {Locale.Profile.Upgrade}
                </button>
              )}
            </>
          </ProfileItem>
        </List>

        <List>
          <ProfileItem
            title={Locale.Profile.Invite.Title}
            subTitle={Locale.Profile.Invite.SubTitle}
          >
            <button
              className={styles["copy-button"]}
              value={config.submitKey}
              onClick={() => copyToClipboard(inviteCode)}
            >
              {Locale.Profile.Invite.CopyInviteLink}
            </button>
          </ProfileItem>

          <ProfileItem
            title={Locale.Profile.Reset.Title}
            subTitle={Locale.Profile.Reset.SubTitle}
          >
            <button
              className={styles["copy-button"]}
              value={config.submitKey}
              onClick={() => {
                handleResetLimit();
                mutate("/api/user/reset", chances ? chances - 1 : -1, false);
                mutate("/api/user/get-limit", 0, false);
              }}
            >
              {Locale.Profile.Reset.Click(chances ?? -1)}
            </button>
          </ProfileItem>
        </List>

        <List>
          <ProfileItem
            title={
              plan == "free"
                ? Locale.Profile.RateLimit.TitleFree
                : Locale.Profile.RateLimit.Title(1)
            }
            subTitle={Locale.Profile.RateLimit.Subtitle}
          >
            <input
              type="range"
              title={config.historyMessageCount.toString()}
              value={count}
              min="0"
              max={plan === "free" ? 10 : 50}
              step="1"
            ></input>
          </ProfileItem>

          <ProfileItem
            title={Locale.Profile.RateLimit.Interval}
            subTitle={Locale.Profile.RateLimit.IntervalDesp}
          >
            <input type="number" min={500} max={4000} value={5}></input>
          </ProfileItem>
        </List>
      </div>
    </>
  );
}
