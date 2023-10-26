"use client";

import Chat from "@/components/chat";
import styles from "@/styles/module/welcome.module.scss";
import Locale from "@/locales";
import { useStore } from "@/store";
import { IconButton } from "@/components/button";
import ReturnIcon from "@/icons/return.svg";
import AddIcon from "@/icons/add.svg";

export default function ChatPage() {
  const [setSideBarOpen] = useStore((state) => [state.setShowSideBar]);

  return (
    <>
      <IconButton
        text={Locale.Index.Return}
        icon={<ReturnIcon />}
        onClick={() => {
          setSideBarOpen(true);
        }}
        className={styles["return-btn"]}
      ></IconButton>
      <div className={styles["welcome-container"]}>
        <div className={styles["title"]}>{Locale.Index.WelcomeTitle}</div>
        <div className={styles["message"]}>{Locale.Index.WelcomeMessage}</div>
        <div className={styles["caption"]}>{Locale.Index.WelcomeCaption}</div>
        <IconButton
          text={Locale.Home.NewChat}
          icon={<AddIcon />}
          bordered
        ></IconButton>
      </div>
    </>
  );
}
