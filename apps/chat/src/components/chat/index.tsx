import Link from "next/link";

import { Message, useChatStore, useSettingStore, useUserStore } from "@/store";
import { ChatSession } from "@/store/chat/typing";
import { SubmitKey } from "@/store/setting/typing";

import { useLayoutEffect, useRef, useState } from "react";
import { ControllerPool } from "@/utils/requests";
import {
  copyToClipboard,
  downloadAs,
  isIOS,
  selectOrCopy,
} from "@/utils/utils";
import styles from "@/styles/module/home.module.scss";
import Locale from "@/locales";

import MenuIcon from "@/assets/icons/menu.svg";
import BrainIcon from "@/assets/icons/brain.svg";
import ExportIcon from "@/assets/icons/export.svg";
import LoadingIcon from "@/assets/icons/three-dots.svg";
import SendWhiteIcon from "@/assets/icons/send-white.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import DownloadIcon from "@/assets/icons/download.svg";
import UserIcon from "@/assets/icons/user.svg";

import { Avatar } from "@/components/avatar";
import { IconButton } from "@/components/button";
import { showModal } from "@/components/ui-lib";

import dynamic from "next/dynamic";
import Banner, { Post } from "@/components/banner";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
function useSubmitHandler() {
  const config = useSettingStore((state) => state.config);
  const submitKey = config.submitKey;

  const shouldSubmit = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return false;

    return (
      (config.submitKey === SubmitKey.AltEnter && e.altKey) ||
      (config.submitKey === SubmitKey.CtrlEnter && e.ctrlKey) ||
      (config.submitKey === SubmitKey.ShiftEnter && e.shiftKey) ||
      (config.submitKey === SubmitKey.Enter &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.metaKey)
    );
  };

  return {
    submitKey,
    shouldSubmit,
  };
}

function exportMessages(messages: Message[], topic: string) {
  const mdText =
    `# ${topic}\n\n` +
    messages
      .map((m) => {
        return m.role === "user" ? `## ${m.content}` : m.content.trim();
      })
      .join("\n\n");
  const filename = `${topic}.md`;

  showModal({
    title: Locale.Export.Title,
    children: (
      <div className="markdown-body">
        <pre className={styles["export-content"]}>{mdText}</pre>
      </div>
    ),
    actions: [
      <IconButton
        key="copy"
        icon={<CopyIcon />}
        bordered
        text={Locale.Export.Copy}
        onClick={() => copyToClipboard(mdText)}
      />,
      <IconButton
        key="download"
        icon={<DownloadIcon />}
        bordered
        text={Locale.Export.Download}
        onClick={() => downloadAs(mdText, filename)}
      />,
    ],
  });
}

function showMemoryPrompt(session: ChatSession) {
  showModal({
    title: `${Locale.Memory.Title} (${session.lastSummarizeIndex} of ${session.messages.length})`,
    children: (
      <div className="markdown-body">
        <pre className={styles["export-content"]}>
          {session.memoryPrompt || Locale.Memory.EmptyContent}
        </pre>
      </div>
    ),
    actions: [
      <IconButton
        key="copy"
        icon={<CopyIcon />}
        bordered
        text={Locale.Memory.Copy}
        onClick={() => copyToClipboard(session.memoryPrompt)}
      />,
    ],
  });
}

const Markdown = dynamic(
  async () => (await import("@/components/markdown")).Markdown,
  {
    loading: () => <LoadingIcon />,
  }
);

export function Chat() {
  const email = useUserStore((state) => state.email);

  const { data: PlanAndInviteCode, isLoading: PlanLoading } = useSWR(
    "/api/user/info",
    (url) =>
      fetcher(url, {
        headers: { email },
      }).then((res) => res.json())
  );

  const { role: plan, inviteCode: inviteCode } = PlanAndInviteCode ?? {
    role: "free",
    inviteCode: "",
  };

  type RenderMessage = Message & { preview?: boolean };

  const [sidebarOpen, setSideBarOpen, session, sessionIndex] = useChatStore(
    (state) => [
      state.showSideBar,
      state.setShowSideBar,
      state.currentSession(),
      state.currentSessionIndex,
    ]
  );
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { submitKey, shouldSubmit } = useSubmitHandler();

  const onUserInput = useChatStore((state) => state.onUserInput);

  // submit user input
  const onUserSubmit = () => {
    if (userInput.length <= 0) return;

    if (plan == "free") {
      const keywords = ["中介", "留学", "文书"];

      for (let i = 0; i < keywords.length; i++) {
        if (userInput.includes(keywords[i])) {
          showModal({
            title: `Ad`,
            children: <Post />,
          });
        }
      }
    }

    setIsLoading(true);
    onUserInput(userInput).then(() => setIsLoading(false));
    setUserInput("");
    inputRef.current?.focus();
    // }
  };

  // stop response
  const onUserStop = (messageIndex: number) => {
    console.log(ControllerPool, sessionIndex, messageIndex);
    ControllerPool.stop(sessionIndex, messageIndex);
  };

  // check if you should send message
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (shouldSubmit(e.nativeEvent)) {
      onUserSubmit();
      e.preventDefault();
    }
  };
  const onRightClick = (e: any, message: Message) => {
    // auto fill user input
    if (message.role === "user") {
      setUserInput(message.content);
    }

    // copy to clipboard
    if (selectOrCopy(e.currentTarget, message.content)) {
      e.preventDefault();
    }
  };

  const onResend = (botIndex: number) => {
    // find last user input message and resend
    for (let i = botIndex; i >= 0; i -= 1) {
      if (messages[i].role === "user") {
        setIsLoading(true);
        onUserInput(messages[i].content).then(() => setIsLoading(false));
        return;
      }
    }
  };

  // for auto-scroll
  const latestMessageRef = useRef<HTMLDivElement>(null);

  // wont scroll while hovering messages
  const [autoScroll, setAutoScroll] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // preview messages
  const messages = (session.messages as RenderMessage[])
    .concat(
      isLoading
        ? [
            {
              role: "assistant",
              content: "……",
              date: new Date().toLocaleString(),
              preview: true,
            },
          ]
        : []
    )
    .concat(
      userInput.length > 0
        ? [
            {
              role: "user",
              content: userInput,
              date: new Date().toLocaleString(),
              preview: true,
            },
          ]
        : []
    );

  // auto scroll
  useLayoutEffect(() => {
    setTimeout(() => {
      const dom = latestMessageRef.current;
      if (dom && !isIOS() && autoScroll) {
        dom.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 500);
  });

  return (
    <div className={styles.chat} key={session.id}>
      <div className={styles["window-header"]}>
        {plan != "free" && (
          <div
            className={styles["window-header-title"]}
            onClick={() => setSideBarOpen(true)}
          >
            <div className={styles["window-header-main-title"]}>
              {session.topic}
            </div>
            <div className={styles["window-header-sub-title"]}>
              {Locale.Chat.SubTitle(session.messages.length)}
            </div>
          </div>
        )}
        {plan == "free" && <Banner />}
        <div className={styles["window-actions"]}>
          <div className={styles["window-action-button"] + " " + styles.mobile}>
            <IconButton
              icon={<MenuIcon />}
              bordered
              title={Locale.Chat.Actions.ChatList}
              onClick={() => setSideBarOpen(true)}
            />
          </div>
          <div className={styles["window-action-button"]}>
            <Link href="/pricing">
              <IconButton icon={<span>🎁</span>} bordered />
            </Link>
          </div>
          <div className={styles["window-action-button"]}>
            <Link href="/profile">
              <IconButton
                icon={<UserIcon />}
                bordered
                title={Locale.Profile.Title}
              />
            </Link>
          </div>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<BrainIcon />}
              bordered
              title={Locale.Chat.Actions.CompressedHistory}
              onClick={() => {
                showMemoryPrompt(session);
              }}
            />
          </div>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<ExportIcon />}
              bordered
              title={Locale.Chat.Actions.Export}
              onClick={() => {
                exportMessages(session.messages, session.topic);
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles["chat-body"]}>
        {messages.map((message, i) => {
          const isUser = message.role === "user";

          return (
            <div
              key={i}
              className={
                isUser ? styles["chat-message-user"] : styles["chat-message"]
              }
            >
              <div className={styles["chat-message-container"]}>
                <div className={styles["chat-message-avatar"]}>
                  <Avatar role={message.role} />
                </div>
                {(message.preview || message.streaming) && (
                  <div className={styles["chat-message-status"]}>
                    {Locale.Chat.Typing}
                  </div>
                )}
                <div className={styles["chat-message-item"]}>
                  {!isUser && (
                    <div className={styles["chat-message-top-actions"]}>
                      {message.streaming ? (
                        <div
                          className={styles["chat-message-top-action"]}
                          onClick={() => onUserStop(i)}
                        >
                          {Locale.Chat.Actions.Stop}
                        </div>
                      ) : (
                        <div
                          className={styles["chat-message-top-action"]}
                          onClick={() => onResend(i)}
                        >
                          {Locale.Chat.Actions.Retry}
                        </div>
                      )}

                      <div
                        className={styles["chat-message-top-action"]}
                        onClick={() => copyToClipboard(message.content)}
                      >
                        {Locale.Chat.Actions.Copy}
                      </div>
                    </div>
                  )}
                  {(message.preview || message.content.length === 0) &&
                  !isUser ? (
                    <LoadingIcon />
                  ) : (
                    <div
                      className="markdown-body"
                      onContextMenu={(e) => onRightClick(e, message)}
                    >
                      <Markdown content={message.content} />
                    </div>
                  )}
                </div>
                {!isUser && !message.preview && (
                  <div className={styles["chat-message-actions"]}>
                    <div className={styles["chat-message-action-date"]}>
                      {message.date.toLocaleString()}
                    </div>
                    {message.model && (
                      <div className={styles["chat-message-action-date"]}>
                        {message.model.toUpperCase()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={latestMessageRef} style={{ opacity: 0, height: "2em" }}>
          -
        </div>
      </div>

      <div className={styles["chat-input-panel"]}>
        <div className={styles["chat-input-panel-inner"]}>
          <textarea
            ref={inputRef}
            className={styles["chat-input"]}
            placeholder={Locale.Chat.Input(submitKey)}
            rows={3}
            onInput={(e) => setUserInput(e.currentTarget.value)}
            value={userInput}
            onKeyDown={(e) => onInputKeyDown(e)}
            onFocus={() => setAutoScroll(true)}
            onBlur={() => setAutoScroll(false)}
            autoFocus={sidebarOpen}
          />
          <IconButton
            icon={<SendWhiteIcon />}
            text={Locale.Chat.Send}
            className={styles["chat-input-send"] + " no-dark"}
            onClick={onUserSubmit}
          />
        </div>
      </div>
    </div>
  );
}
