"use client";

import { useState, useEffect } from "react";

import { IconButton } from "@/components/button";
import styles from "@/styles/module/home.module.scss";

import SettingsIcon from "@/assets/icons/settings.svg";
import ChatGptIcon from "@/assets/icons/chatgpt.svg";

import AddIcon from "@/assets/icons/add.svg";

import AnnouncementIcon from "@/assets/icons/announcement.svg";
import CloseIcon from "@/assets/icons/close.svg";
import { useChatStore, useSettingStore } from "@/store";

import { isMobileScreen } from "@/utils/utils";
import Locale from "@/locales";

import { ChatList } from "@/components/chat/chat-list";
import { useSwitchTheme } from "@/hooks/switch-theme";
import { Loading } from "@/components/loading";

import dynamic from "next/dynamic";
import { showAnnouncement } from "@/hooks/use-notice";

import { useRouter } from "next/navigation";

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
  // 侧边栏是否展开
  const [showSideBar, setShowSideBar] = useChatStore((state) => [
    state.showSideBar,
    state.setShowSideBar,
  ]);

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

  // 设置
  const config = useSettingStore((state) => state.config);
  const tightBorder = useSettingStore((state) => state.tightBorder);

  // 暗色模式切换
  useSwitchTheme();
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`${
        tightBorder && !isMobileScreen()
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
            <span className={styles["sidebar-ad"]}>Magic万事屋</span>
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
                  router.push("/settings");
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

      <div className={styles["window-content"]}>{children}</div>
    </div>
  );
}
