import { useState, useEffect, useRef, useMemo } from "react";

import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";

import styles from "@/styles/module/profile.module.scss";

import ResetIcon from "@/assets/icons/reload.svg";
import CloseIcon from "@/assets/icons/close.svg";
import ClearIcon from "@/assets/icons/clear.svg";
import { copyToClipboard } from "@/utils/utils";

import { List, ListItem, Popover } from "@/components/ui-lib";

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
  const [email] = useUserStore((state) => [state.email]);

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
        </List>

        <List>
          <ProfileItem
            title={Locale.Profile.Invite.Title}
            subTitle={Locale.Profile.Invite.SubTitle}
          >
            <button
              className={styles["copy-button"]}
              value={config.submitKey}
              onClick={() => copyToClipboard("1")}
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
              onClick={() => copyToClipboard("1")}
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
              value={3}
              min="0"
              max="30"
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
