"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { IconButton } from "@/components/button";
import { ChatList } from "@/components/chat/chat-list";
import { Loading } from "@/components/loading";
import { useSwitchTheme } from "@/hooks/switch-theme";
import { showAnnouncement } from "@/hooks/use-notice";
import AddIcon from "@/icons/add-std.svg";
import AnnouncementIcon from "@/icons/announcement.svg";
import ChatGptIcon from "@/icons/chatgpt.svg";
import CloseIcon from "@/icons/close.svg";
import PremiumIcon from "@/icons/premium.svg";
import SettingsIcon from "@/icons/settings.svg";
import UserIcon from "@/icons/user.svg";
import Locale from "@/locales";
import { useStore } from "@/store";
import styles from "@/styles/module/home.module.scss";
import { isMobileScreen } from "@/utils/client-utils";

/* 修复水合错误 */
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

  const routerPremium = () => {
    router.push("/premium");
    setShowSideBar(false);
  };
  const routerProfile = () => {
    router.push("/profile");
    setShowSideBar(false);
  };
  const routerSetting = () => {
    router.push("/setting");
    setShowSideBar(false);
  };
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
          {!!process.env.NEXT_PUBLIC_OA && (
            <div className={styles["sidebar-sub-title"]}>
              {Locale.Index.SubTitle}
              <span className={styles["sidebar-wechat-oa"]}>
                {process.env.NEXT_PUBLIC_OA}
              </span>
            </div>
          )}
          <div className={styles["sidebar-logo"]}>
            <ChatGptIcon />
          </div>
        </div>
        <button className={styles["sidebar-newbtn"]}>
          <div>
            <div className={styles["icon"]} onClick={() => {}}>
              <AddIcon />
            </div>
            <div className={styles["text"]}>{Locale.Home.NewChat}</div>
          </div>
        </button>

        <div
          className={styles["sidebar-body"]}
          onClick={() => {
            setShowSideBar(false);
          }}
        >
          <ChatList />
        </div>

        <div className={styles["sidebar-tail"]}>
          <button className={styles["sidebar-premium"]} onClick={routerPremium}>
            <div>
              <div className={styles["icon"]}>
                <PremiumIcon />
              </div>
              <div className={styles["text"]}>{Locale.Index.Premium}</div>
            </div>
          </button>
          <div className={styles["sidebar-accountbtn"]}>
            <div className={styles["sidebar-account"]} onClick={routerProfile}>
              <div className={styles["avatar"]}>
                <UserIcon />
              </div>
              <div className={styles["account-name"]}>Username</div>
            </div>
            <div
              onClick={routerSetting}
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
