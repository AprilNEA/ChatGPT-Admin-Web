"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";

import { IconButton } from "@/components/button";
import styles from "@/styles/module/home.module.scss";

import SettingsIcon from "@/assets/icons/settings.svg";
import ChatGptIcon from "@/assets/icons/chatgpt.svg";
import BotIcon from "@/assets/icons/bot.svg";
import AddIcon from "@/assets/icons/add.svg";
import LoadingIcon from "@/assets/icons/three-dots.svg";
import AnnouncementIcon from "@/assets/icons/announcement.svg";
import CloseIcon from "@/assets/icons/close.svg";
import { Message, useChatStore, useUserStore } from "@/store";

import Locale from "@/locales";

import { Chat } from "@/components/chat";
import { ChatList } from "@/components/chat/chat-list";
import { useSwitchTheme } from "@/components/switch-theme";
import { Loading } from "@/components/loading";

import dynamic from "next/dynamic";
import { Announcement, showAnnouncement } from "@/hooks/use-notice";

const Settings = dynamic(
  async () => (await import("@/components/settings")).Settings,
  {
    loading: () => <Loading noLogo />,
  }
);

const Login = dynamic(async () => (await import("@/components/login")).Login, {
  loading: () => <Loading noLogo />,
});

/**
 * 修复水合错误
 */
const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookie, validateCookie, versionId, updateVersionId] = useUserStore(
    (state) => [
      state.cookie,
      state.validateCookie,
      state.versionId,
      state.updateVersionId,
    ]
  );
  useEffect(() => {
    Announcement(versionId, updateVersionId);
    if (validateCookie()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookie]);

  // 对话
  const [createNewSession, currentIndex, removeSession] = useChatStore(
    (state) => [
      state.newSession,
      state.currentSessionIndex,
      state.removeSession,
    ]
  );

  // 是否加载中
  const loading = !useHasHydrated();
  const [showSideBar, setShowSideBar] = useState(true);

  // 设置面板
  const [openSettings, setOpenSettings] = useState(false);
  const config = useChatStore((state) => state.config);

  // 暗色模式切换
  useSwitchTheme();

  if (loading) {
    return <Loading />;
  }

  if (!isLogin) {
    return (
      <div
        className={`${
          config.tightBorder ? styles["tight-container"] : styles.container
        }`}
      >
        <Login setIsLogin={() => setIsLogin(true)} />
      </div>
    );
  }

  return (
    <div
      className={`${
        config.tightBorder ? styles["tight-container"] : styles.container
      }`}
    >
      <div
        className={styles.sidebar + ` ${showSideBar && styles["sidebar-show"]}`}
      >
        <div className={styles["sidebar-header"]}>
          <div className={styles["sidebar-title"]}>{Locale.Index.Title}</div>
          <div className={styles["sidebar-sub-title"]}>
            {Locale.Index.SubTitle}{" "}
            <span className={styles["sidebar-ad"]}>Magic万事屋</span>
          </div>
          <div className={styles["sidebar-logo"]}>
            <ChatGptIcon />
          </div>
        </div>

        <div
          className={styles["sidebar-body"]}
          onClick={() => {
            setOpenSettings(false);
            setShowSideBar(false);
          }}
        >
          <ChatList />
        </div>

        <div className={styles["sidebar-tail"]}>
          <div className={styles["sidebar-actions"]}>
            <div className={styles["sidebar-action"] + " " + styles.mobile}>
              <IconButton
                icon={<CloseIcon />}
                onClick={() => {
                  if (confirm(Locale.Home.DeleteChat)) {
                    removeSession(currentIndex);
                  }
                }}
              />
            </div>
            <div className={styles["sidebar-action"]}>
              <IconButton
                icon={<SettingsIcon />}
                onClick={() => {
                  setOpenSettings(true);
                  setShowSideBar(false);
                }}
              />
            </div>
            {/*TODO add about us*/}
            <div className={styles["sidebar-action"]}>
              <IconButton
                icon={<AnnouncementIcon />}
                onClick={showAnnouncement}
              />
            </div>
          </div>
          <div>
            <IconButton
              icon={<AddIcon />}
              text={Locale.Home.NewChat}
              onClick={() => {
                createNewSession();
                setShowSideBar(false);
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles["window-content"]}>
        {openSettings ? (
          <Settings
            closeSettings={() => {
              setOpenSettings(false);
              setShowSideBar(true);
            }}
          />
        ) : (
          <Chat key="chat" showSideBar={() => setShowSideBar(true)} />
        )}
      </div>
    </div>
  );
}
