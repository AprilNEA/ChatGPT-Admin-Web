"use client";

import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";

import { useLimit } from "@/hooks/use-limit";
import { useSubscription } from "@/hooks/use-subscription";
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
import { InfoResponse, ResponseStatus } from "@/app/api/typing.d";
import { SubscribeTable } from "@/components/table";
import { useInviteCode } from "@/hooks/use-invite-code";

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

  const {
    data: info,
    isLoading: infoLoading,
    mutate: infoMutate,
  } = useSWR<InfoResponse>("/api/user/info", (url) =>
    fetcher(url).then((res) => res.json())
  );

  /**
   * 此处使用条件加载，一般来说用户可能不需要邀请码，当用户点击复制邀请码后，再请求邀请码。
   */
  const [shouldGetInviteCode, setShouldGetInviteCode] =
    useState<boolean>(false);
  const { data: inviteCode, isLoading: inviteCodeLoading } =
    useInviteCode(shouldGetInviteCode);

  const {
    email: email,
    role: role,
    plan: plan,
    resetChances: resetChances,
  } = info ?? {
    email: "",
    role: "user",
    plan: "free",
    inviteCode: "",
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

  const { data: subscription, isLoading: subscriptionLoading } =
    useSubscription();
  useEffect(() => {
    if (shouldGetInviteCode) showToast("正在获取邀请码");
  }, [shouldGetInviteCode]);

  useEffect(() => {
    if (inviteCode)
      copyToClipboard(`${window.location.origin}/register?code=${inviteCode}`);
  }, [inviteCode]);

  if (infoLoading) return <Loading />;

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
              onClick={() => router.push("/")}
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

        {subscription && <SubscribeTable data={subscription} />}

        <List>
          <ProfileItem
            title={Locale.Profile.Invite.Title}
            subTitle={Locale.Profile.Invite.SubTitle}
          >
            <button
              className={styles["copy-button"]}
              value={config.submitKey}
              onClick={() => {
                if (inviteCode)
                  copyToClipboard(
                    `${window.location.origin}/register?code=${inviteCode}`
                  );
                else setShouldGetInviteCode(true);
              }}
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
              onClick={async () => {
                await handleResetLimit();
                await infoMutate({
                  ...info!,
                  resetChances: info?.resetChances! - 1 ?? 0,
                });
              }}
            >
              {Locale.Profile.Reset.Click(resetChances ?? 0)}
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
