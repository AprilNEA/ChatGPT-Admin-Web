"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { useStore } from "@/store";
import { IconButton } from "@/components/button";

import { Loading } from "@/components/loading";
import { ChatList } from "@/components/chat/chat-list";
import { useSwitchTheme } from "@/hooks/switch-theme";
import { showAnnouncement } from "@/hooks/use-notice";

import styles from "@/styles/module/home.module.scss";
import Locale from "@/locales";
import AddIcon from "@/icons/add.svg";
import AnnouncementIcon from "@/icons/announcement.svg";
import CloseIcon from "@/icons/close.svg";
import ChatGptIcon from "@/icons/chatgpt.svg";
import SettingsIcon from "@/icons/settings.svg";
import PremiumIcon from "@/icons/premium.svg";
import UserIcon from "@/icons/user.svg";

import { isMobileScreen } from "@/utils/client-utils";

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

export function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // 侧边栏是否展开
  const [showSideBar, setShowSideBar] = useStore((state) => [
    state.showSideBar,
    state.setShowSideBar,
  ]);

  // 对话
  const [createNewSession, currentIndex, removeSession] = useStore((state) => [
    state.newSession,
    state.currentChatSessionId,
    state.removeSession,
  ]);

  // 是否加载中
  const loading = !useHasHydrated();

  // 设置
  const config = useStore((state) => state.config);

  // 暗色模式切换
  useSwitchTheme();

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`${
        config.tightBorder && !isMobileScreen()
          ? styles["tight-container"]
          : styles.container
      }`}
    >
      <div
        className={styles.sidebar + ` ${showSideBar && styles["sidebar-show"]}`}
      >
        <div className={styles["sidebar-header"]}>
          <div className={styles["sidebar-title"]}>{Locale.Index.Title}</div>
          <div className={styles["sidebar-sub-title"]}>
            {Locale.Index.SubTitle}{" "}
            <span className={styles["sidebar-ad"]}>
              {process.env.NEXT_PUBLIC_OA}
            </span>
          </div>
          <div className={styles["sidebar-logo"]}>
            <ChatGptIcon />
          </div>
        </div>

        <div
          className={styles["sidebar-body"]}
          onClick={() => {
            setShowSideBar(false);
          }}
        >
          <ChatList />
        </div>

        <div className={styles["sidebar-tail"]}>
          <div className={styles["sidebar-premium"]}>
            <div className={styles["icon"]}>
              <PremiumIcon />
            </div>
            <div className={styles["text"]}>{Locale.Index.Premium}</div>
          </div>
          <div className={styles["sidebar-accountbtn"]}>
            <div className={styles["sidebar-account"]}>
              <div className={styles["avatar"]}>
                <UserIcon />
              </div>
              <div className={styles["account-name"]}>
                Username
              </div>
            </div>
            <div
              onClick={() => {
                router.push("/settings");
                setShowSideBar(false);
              }}
              className={styles["account-settingbtn"]}
            >
              <SettingsIcon />
            </div>
          </div>
        </div>
      </div>
      <div className={styles["window-content"]}>{children}</div>
    </div>
  );
}
