"use client";

import Image from "next/image";
import Iframe from "react-iframe";
import { useRouter } from "next/navigation";
import React, { FormEvent, useCallback, useState } from "react";

import useIntervalAsync from "@/hooks/use-interval-async";
import usePreventFormSubmit from "@/hooks/use-prevent-form";
import { useStore } from "@/store";
import { IconButton } from "@/components/button";

import Locales from "@/locales";
import styles from "./auth.module.scss";
import BotIcon from "@/icons/bot.svg";
import LeftArrow from "@/icons/left.svg";
import WechatLogo from "@/icons/wechat-logo.png";

const weChatOauthAppId = process.env.NEXT_PUBLIC_WECHAT_OAUTH_APP_ID!;
const weChatOauthRedirectUrl =
  process.env.NEXT_PUBLIC_WECHAT_OAUTH_REDIRECT_URL!;

const CaptchaLogin: React.FC = () => {
  const router = useRouter();
  const [register, setRegister] = useState("");
  const [code, setCode] = useState("");

  const [isSubmitting, handleSubmit] = usePreventFormSubmit();
  const [isCodeSubmitting, handleCodeSubmit] = usePreventFormSubmit();

  const [loginByCode, requestCode] = useStore((state) => [
    state.loginByCode,
    state.requestCode,
  ]);

  return (
    <div className={styles["form-container"]}>
      <input
        type="text"
        id="phone"
        value={register}
        className={styles["auth-input"]}
        onChange={(e) => setRegister(e.target.value)}
        placeholder={`${Locales.User.Phone} / ${Locales.User.Email}`}
        required
      />

      <div className={styles["row"]}>
        <input
          type="text"
          id="code"
          value={code}
          className={styles["auth-input"]}
          onChange={(e) => setCode(e.target.value)}
          placeholder={Locales.User.Code}
          required
        />
        <IconButton
          text={isCodeSubmitting ? Locales.User.Sent : Locales.User.GetCode}
          className={styles["auth-get-code-btn"]}
          type="primary"
          onClick={() => requestCode({ identity: register })}
        />
      </div>
      <div className={styles["auth-actions"]}>
        <IconButton
          onClick={() => loginByCode({ identity: register, code })}
          text={`${Locales.User.Login} / ${Locales.User.Register}`}
          className={styles["auth-submit-btn"]}
          type="primary"
        />
      </div>
    </div>
  );
};

const EmailLogin: React.FC = () => {
  const router = useRouter();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, handleSubmit] = usePreventFormSubmit();

  /* Prevent duplicate form submissions */
  const loginByPassword = useStore((state) => state.loginByPassword);

  return (
    <div className={styles["form-container"]}>
      <div className={styles["row"]}>
        <input
          type="text"
          id="email"
          value={identity}
          className={styles["auth-input"]}
          onChange={(e) => setIdentity(e.target.value)}
          placeholder={Locales.User.Email}
          required
        />
      </div>

      <div className={styles["row"]}>
        <input
          type="password"
          id="password"
          value={password}
          className={styles["auth-input"]}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={Locales.User.Password}
          required
        />
      </div>

      <div className={styles["auth-actions"]}>
        <IconButton
          onClick={() => loginByPassword(router, { identity, password })}
          text={Locales.User.Submit}
          type="primary"
        />
      </div>
    </div>
  );
};

const WeChatLogin: React.FC = () => {
  const router = useRouter();
  // const [ticket, setTicket] = useState("");

  // if (!ticket) return <Loading noLogo={true} />;

  return (
    <div className={styles["form-container"]}>
      {weChatOauthAppId ? (
        <Iframe
          className={styles["iframe"]}
          url={
            "https://open.weixin.qq.com/connect/qrconnect?" +
            new URLSearchParams({
              appid: weChatOauthAppId,
              redirect_uri: weChatOauthRedirectUrl,
              scope: "snsapi_login,snsapi_userinfo",
              self_redirect: "true",
              styletype: "white",
              href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7IHdpZHRoOiAxODBweDsgYm9yZGVyOiBub25lO30KLmltcG93ZXJCb3ggLnRpdGxlIHsgZGlzcGxheTogbm9uZTt9Ci5pbXBvd2VyQm94IC5pbmZvIHtkaXNwbGF5OiBub25lO30KLnN0YXR1c19pY29uIHtkaXNwbGF5OiBub25lfQouaW1wb3dlckJveCAuc3RhdHVzIHt0ZXh0LWFsaWduOiBjZW50ZXI7fQpodG1sIHtiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDt9CmJvZHkge292ZXJmbG93LXg6IGhpZGRlbjtvdmVyZmxvdy15OiBoaWRkZW47YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7fQo=",
            })
          }
        />
      ) : (
        <Image
          className={styles["qrcode"]}
          src={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=`}
          alt="Wechat QrCdoe"
          width={200}
          height={200}
        />
      )}
    </div>
  );
};

export default function AuthPage() {
  const [tab, setTab] = useState<"email" | "phone" | "wechat">("phone");

  let content = null;
  switch (tab) {
    case "wechat":
      content = (
        <div className={styles["wechat-part"]}>
          <div className={styles["wechat-part-title"]}>
            {Locales.User.WeChatLogin}
          </div>
          <div className={styles["wechat-login-container"]}>
            <WeChatLogin />
          </div>
          <div
            className={styles["wechat-part-go-back"]}
            onClick={() => {
              setTab("phone");
            }}
          >
            <LeftArrow />
          </div>
        </div>
      );
      break;
    case "email":
    case "phone":
      content = (
        <div className={styles["password-part"]}>
          <div className={styles["tab-container"]}>
            <button
              className={`${styles["tab-button"]} ${
                tab === "phone" ? styles.active : ""
              }`}
              onClick={() => setTab("phone")}
            >
              {Locales.User.CodeLogin}
            </button>
            <button
              className={`${styles["tab-button"]} ${
                tab === "email" ? styles.active : ""
              }`}
              onClick={() => setTab("email")}
            >
              {Locales.User.PasswordLogin}
            </button>
          </div>
          {tab === "phone" ? <CaptchaLogin /> : <EmailLogin />}

          <div className={styles["divider"]}>
            <div className={styles["divider-line"]} />
            <div className={styles["divider-text"]}>or</div>
            <div className={styles["divider-line"]} />
          </div>
          <div className={styles["third-part-login-options"]}>
            <img
              src={WechatLogo.src}
              className={styles["third-part-option"]}
              onClick={() => {
                setTab("wechat");
              }}
            />
          </div>
        </div>
      );
      break;
  }

  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>
      <div className={styles["auth-title"]}>
        {process.env.NEXT_PUBLIC_TITLE}
      </div>
      <div className={styles["auth-tips"]}></div>
      <div className={styles["auth-container"]}>{content}</div>
    </div>
  );
}
