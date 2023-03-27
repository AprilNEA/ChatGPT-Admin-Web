"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";

import { IconButton } from "@/components/button";
import styles from "@/styles/home.module.scss";

import SettingsIcon from "@/assets/icons/settings.svg";
import GithubIcon from "@/assets/icons/github.svg";
import ChatGptIcon from "@/assets/icons/chatgpt.svg";
import BotIcon from "@/assets/icons/bot.svg";
import AddIcon from "@/assets/icons/add.svg";
import LoadingIcon from "@/assets/icons/three-dots.svg";
import CloseIcon from "@/assets/icons/close.svg";
import { Message, useChatStore } from "@/store";

import Locale from "@/locales";

import {Chat} from "@/components/chat";
import {ChatList} from "@/components/chat/chat-list";

import dynamic from "next/dynamic";
import { REPO_URL } from "@/utils/constant";

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"]}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

const Settings = dynamic(async () => (await import("@/components/settings")).Settings, {
  loading: () => <Loading noLogo />,
});

function useSwitchTheme() {
  const config = useChatStore((state) => state.config);

  useEffect(() => {
    document.body.classList.remove("light");
    document.body.classList.remove("dark");
    if (config.theme === "dark") {
      document.body.classList.add("dark");
    } else if (config.theme === "light") {
      document.body.classList.add("light");
    }
  }, [config.theme]);
}


export function Home() {
  const [createNewSession, currentIndex, removeSession] = useChatStore(
    (state) => [
      state.newSession,
      state.currentSessionIndex,
      state.removeSession,
    ]
  );
  const loading = !useChatStore?.persist?.hasHydrated();
  const [showSideBar, setShowSideBar] = useState(true);

  // setting
  const [openSettings, setOpenSettings] = useState(false);
  const config = useChatStore((state) => state.config);

  useSwitchTheme();

  if (loading) {
    return <Loading />;
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
          <div className={styles["sidebar-title"]}>ChatGPT Next</div>
          <div className={styles["sidebar-sub-title"]}>
            Build your own AI assistant.
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
            {/*<div className={styles["sidebar-action"]}>*/}
            {/*  <a href={REPO_URL} target="_blank">*/}
            {/*    <IconButton icon={<GithubIcon />} />*/}
            {/*  </a>*/}
            {/*</div>*/}
          </div>
          <div>
            <IconButton
              icon={<AddIcon />}
              text={Locale.Home.NewChat}
              onClick={createNewSession}
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
