"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { IconButton } from "@/components/button";
import { ChatList } from "@/components/chat/chat-list";
import { Loading } from "@/components/loading";
import { useSwitchTheme } from "@/hooks/switch-theme";
import { showAnnouncement } from "@/hooks/use-notice";
import { useChatStore, useNoticeStore, useSettingStore } from "@/store";
import { isMobileScreen } from "@/utils/utils";

import AddIcon from "@/assets/icons/add.svg";
import AnnouncementIcon from "@/assets/icons/announcement.svg";
import ChatGptIcon from "@/assets/icons/chatgpt.svg";
import CloseIcon from "@/assets/icons/close.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import ShoppingIcon from "@/assets/icons/shopping.svg";
import UserIcon from "@/assets/icons/user.svg";

import styles from "@/styles/module/home.module.scss";

import Locale from "@/locales";
import { useLimit } from "@/hooks/use-limit";

const wechatOA = process.env.NEXT_PUBLIC_WECHAT_OA;

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

  const notice = useNoticeStore((store) => store.notice) ?? "当前无公告";

  const { data: rateLimit, isLoading: rateLimitLoading } = useLimit();

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
          {wechatOA && (
            <div className={styles["sidebar-sub-title"]}>
              {Locale.Index.SubTitle}{" "}
              <span className={styles["sidebar-ad"]}>{wechatOA}</span>
            </div>
          )}
          <div className={styles["sidebar-logo"]}>
            <ChatGptIcon />
          </div>
        </div>

        <div className={styles["sidebar-header-bar"]}>
          <IconButton
            icon={<UserIcon />}
            text="个人中心"
            className={styles["sidebar-bar-button"]}
            onClick={() => {
              setShowSideBar(false);
              router.push("/profile");
            }}
          />
          <IconButton
            icon={<ShoppingIcon />}
            text="充值中心"
            className={styles["sidebar-bar-button"]}
            onClick={() => {
              setShowSideBar(false);
              router.push("/pricing");
            }}
          />
        </div>

        <div
          className={styles["sidebar-body"]}
          onClick={() => {
            setShowSideBar(false);
          }}
        >
          <ChatList />
        </div>

        {rateLimit && (
          <div className={styles["sidebar-balance-box"]}>
            <div className={styles["sidebar-balance"]}>
              <div className={styles["sidebar-balance-title"]}>当前余量</div>
              <div className={styles["sidebar-balance-num"]}>
                <span>{rateLimit.remaining}</span>次
              </div>
            </div>
            <div
              className={styles["sidebar-balance-button"]}
              onClick={() => {
                router.push("/pricing");
              }}
            >
              点我充值
            </div>
          </div>
        )}

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
                onClick={() => showAnnouncement(notice)}
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
