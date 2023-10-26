"use client"

import Chat from "@/components/chat";
import styles from "@/styles/module/welcome.module.scss";
import Locale from "@/locales";
import { useStore } from "@/store";

export default function ChatPage() {
  const [sidebarOpen, setSideBarOpen] = useStore((state) => [
    state.showSideBar,
    state.setShowSideBar,
  ]);

  return (
    <>
      <div className={styles["welcome-container"]}>
        <div className={styles["title"]}>{Locale.Index.WelcomeTitle}</div>
        <div className={styles["message"]}>{Locale.Index.WelcomeMessage}</div>
      </div>
    </>
  );
}
