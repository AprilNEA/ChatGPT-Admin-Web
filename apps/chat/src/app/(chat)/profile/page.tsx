"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";

import { useSettingStore } from "@/store";

import { Avatar } from "@/components/avatar";
import { Loading } from "@/components/loading";
import { List, ListItem, Popover, showToast } from "@/components/ui-lib";
import styles from "./profile.module.scss";

import Locale from "@/locales";
import { IconButton } from "@/components/button";
import CloseIcon from "@/assets/icons/close.svg";
import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";

import fetcher from "@/utils/fetcher";
import { copyToClipboard } from "@/utils/utils";
import { InfoResponse } from "@/app/api/typing";

function ProfileItem(props: {
  title: string;
  subTitle?: string;
  children: JSX.Element;
}) {
  return (
    <ListItem>
      <div className={styles["title"]}>
        <div>{props.title}</div>
        {props.subTitle && (
          <div className={styles["sub-title"]}>{props.subTitle}</div>
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

  const { data: info, isLoading: infoLoading } = useSWR<InfoResponse>(
    "/api/user/info",
    (url) => fetcher(url).then((res) => res.json())
  );

  if (infoLoading) return <Loading />;

  const {
    email: email,
    role: role,
    plan: plan,
    inviteCode: inviteCode,
    requestNos: requestNos,
    resetChances: resetChances,
  } = info ?? {
    email: "",
    role: "user",
    plan: "free",
    inviteCode: "",
    requestNos: [],
    resetChances: 0,
  };

  async function handleResetLimit() {
    if (resetChances && resetChances < 1) {
      showToast("重置次数已用完");
      return;
    }
    fetcher("/api/user/reset", {
      cache: "no-store",
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        showToast("成功重置");
      } else {
        showToast("重置失败");
      }
    });
  }

  return (
    <>
      <div className={styles["window-header"]}>
        <div className={styles["window-header-title"]}>
          <div className={styles["window-header-main-title"]}>Profile</div>
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
              <button
                className={styles["copy-button"]}
                onClick={() => router.push("/pricing")}
              >
                {Locale.Profile.Upgrade}
              </button>
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
              onClick={() =>
                copyToClipboard(
                  `${window.location.origin}/register?code=${inviteCode}`
                )
              }
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
              {Locale.Profile.Reset.Click(resetChances ?? -1)}
            </button>
          </ProfileItem>
        </List>

        {/*<List>*/}
        {/*  <ProfileItem*/}
        {/*    title={*/}
        {/*      plan == "free"*/}
        {/*        ? Locale.Profile.RateLimit.TitleFree*/}
        {/*        : Locale.Profile.RateLimit.Title(1)*/}
        {/*    }*/}
        {/*    subTitle={Locale.Profile.RateLimit.Subtitle}*/}
        {/*  >*/}
        {/*    <input*/}
        {/*      type="range"*/}
        {/*      title={config.historyMessageCount.toString()}*/}
        {/*      value={requestNos.length}*/}
        {/*      min="0"*/}
        {/*      max={plan === "free" ? 10 : 50}*/}
        {/*      step="1"*/}
        {/*    ></input>*/}
        {/*  </ProfileItem>*/}

        {/*  <ProfileItem*/}
        {/*    title={Locale.Profile.RateLimit.Interval}*/}
        {/*    subTitle={Locale.Profile.RateLimit.IntervalDesp}*/}
        {/*  >*/}
        {/*    <input type="number" min={500} max={4000} value={5}></input>*/}
        {/*  </ProfileItem>*/}
        {/*</List>*/}
      </div>
    </>
  );
}
