import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";

import styles from "@/styles/module/profile.module.scss";

import ResetIcon from "@/assets/icons/reload.svg";
import CloseIcon from "@/assets/icons/close.svg";
import ClearIcon from "@/assets/icons/clear.svg";
import { copyToClipboard } from "@/utils/utils";

import {
  List,
  ListItem,
  Popover,
  showModal,
  showToast,
} from "@/components/ui-lib";

import { IconButton } from "../button";
import {
  useChatStore,
  ALL_MODELS,
  useAccessStore,
  useUserStore,
} from "@/store";
import { Model, SubmitKey, Theme } from "@/types/setting";
import { Avatar } from "@/components/avatar";

import Locale, { changeLang, getLang } from "@/locales";

import ShoppingIcon from "@/assets/icons/shopping.svg";

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

export function Profile(props: { closeSettings: () => void }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [config, updateConfig, resetConfig, clearAllData] = useChatStore(
    (state) => [
      state.config,
      state.updateConfig,
      state.resetConfig,
      state.clearAllData,
    ]
  );
  const [
    email,
    plan,
    requestsNo,
    updatePlan,
    updateRequestsNo,
    sessionToken,
    inviteCode,
  ] = useUserStore((state) => [
    state.email,
    state.plan,
    state.requestsNo,
    state.updatePlan,
    state.updateRequestsNo,
    state.sessionToken,
    state.inviteCode,
  ]);
  const [selectPlan, setSelectPlan] = useState(plan);
  const [count, setCount] = useState(0);
  const router = useRouter();

  const fetchBusinesses = useCallback(() => {
    updateLimit();
    updatePlan();
    updateRequestsNo();
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  function updateLimit() {
    fetch("/api/user/get-limit", {
      headers: { email },
    })
      .then((res) => res.json())
      .then((res) => {
        setCount(res.requestNos.length);
      });
  }

  async function handleResetLimit() {
    fetch("/api/user/reset", {
      cache: "no-store",
      method: "GET",
      headers: { email, token: sessionToken ?? "" },
    }).then((res) => {
      if (res.ok) {
        showToast("成功重置");
        updateRequestsNo();
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
              icon={<ClearIcon />}
              onClick={clearAllData}
              bordered
              title={Locale.Settings.Actions.ClearAll}
            />
          </div>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<ResetIcon />}
              onClick={resetConfig}
              bordered
              title={Locale.Settings.Actions.ResetAll}
            />
          </div>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<CloseIcon />}
              onClick={props.closeSettings}
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
              onClick={() => handleResetLimit()}
            >
              {Locale.Profile.Reset.Click(1)}
            </button>
          </ProfileItem>
        </List>

        <List>
          <ProfileItem
            title={Locale.Profile.RateLimit.Title}
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
