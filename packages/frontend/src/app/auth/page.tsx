'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Iframe from 'react-iframe';

import { IconButton } from '@/components/button';
import { showToast } from '@/components/ui-lib';
import { useUserData } from '@/hooks/data/use-user';
import useIntervalAsync from '@/hooks/use-interval-async';
import usePreventFormSubmit from '@/hooks/use-prevent-form';
import BotIcon from '@/icons/bot.svg';
import KeyIcon from '@/icons/key.svg';
import LeftArrow from '@/icons/left.svg';
import VerificationCodeIcon from '@/icons/verification-code.svg';
import WechatLogo from '@/icons/wechat-logo.svg';
import Locales from '@/locales';
import { useStore } from '@/store';
import '@/styles/globals.scss';
import '@/styles/prism.scss';

import styles from './auth.module.scss';

const weChatOauthAppId = process.env.NEXT_PUBLIC_WECHAT_OAUTH_APP_ID!;
const weChatOauthRedirectUrl =
  process.env.NEXT_PUBLIC_WECHAT_OAUTH_REDIRECT_URL!;

/* 验证码登录/注册 */
function ValidateCodeLogin() {
  const router = useRouter();
  const { fetcher, setAuthToken } = useStore();
  const [identity, setIdentity] = useState('');
  const [ifCodeSent, setIfCodeSent] = useState(false);
  const [validateCode, setValidateCode] = useState('');
  const [validateCodeTtl, setValidateCodeTtl] = useState(60);
  const validateCodeTtlRef = React.useRef<null | number>(null);
  const [isSubmitLogin, handleSubmitLogin] = usePreventFormSubmit();
  const [_, handleCodeSubmitting] = usePreventFormSubmit();

  async function requestValidateCode() {
    fetcher(`/auth/validateCode?identity=${encodeURIComponent(identity)}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setIfCodeSent(true);
          /* 60秒内将不再重发 */
          setValidateCodeTtl(res.ttl - 540);
        } else {
          showToast(res.message);
          router.refresh();
        }
      });
  }

  async function login() {
    fetcher('/auth/validateCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identity,
        code: validateCode,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setAuthToken(res.sessionToken, res.refreshToken);
          return router.push('/');
        } else {
          showToast(res.message);
          setValidateCode('');
        }
      });
  }

  useEffect(() => {
    if (validateCodeTtl <= 0) {
      if (!ifCodeSent) {
        return;
      } else {
        setIfCodeSent(false);
      }
    }

    if (validateCodeTtlRef.current !== null) {
      return;
    }

    validateCodeTtlRef.current = window.setTimeout(() => {
      setValidateCodeTtl((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      if (validateCodeTtlRef.current !== null) {
        clearTimeout(validateCodeTtlRef.current);
        validateCodeTtlRef.current = null;
      }
    };
  }, [validateCodeTtl, ifCodeSent]);

  return (
    <div className={styles['form-container']}>
      <div className={styles['row']}>
        <input
          type="text"
          id="phone"
          value={identity}
          className={styles['auth-input']}
          onChange={(e) => setIdentity(e.target.value)}
          placeholder={`${Locales.Auth.Phone} / ${Locales.Auth.Email}`}
          required
        />
      </div>

      <div className={styles['row']}>
        <input
          type="text"
          id="code"
          value={validateCode}
          className={styles['auth-input']}
          onChange={(e) => setValidateCode(e.target.value)}
          placeholder={Locales.Auth.Code}
          required
        />
        <IconButton
          text={
            ifCodeSent
              ? Locales.Auth.Sent(validateCodeTtl)
              : Locales.Auth.GetCode
          }
          disabled={ifCodeSent}
          className={styles['auth-get-code-btn']}
          type="primary"
          onClick={() => handleCodeSubmitting(undefined, requestValidateCode)}
        />
      </div>
      <div className={styles['auth-actions']}>
        <IconButton
          disabled={isSubmitLogin}
          onClick={() => handleSubmitLogin(undefined, login)}
          text={`${Locales.Auth.Login()} / ${Locales.Auth.Register()}`}
          className={styles['auth-submit-btn']}
          type="primary"
        />
      </div>
    </div>
  );
}

/* 密码登录 */
const PasswordLogin: React.FC = () => {
  const router = useRouter();
  const { fetcher, setAuthToken } = useStore();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, handleSubmit] = usePreventFormSubmit();

  async function login() {
    fetcher('/auth/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setAuthToken(res.sessionToken, res.refreshToken);
          router.push('/');
        } else {
          router.refresh();
        }
      });
  }

  return (
    <div className={styles['form-container']}>
      <div className={styles['row']}>
        <input
          type="text"
          id="email"
          value={identity}
          className={styles['auth-input']}
          onChange={(e) => setIdentity(e.target.value)}
          placeholder={`${Locales.Auth.Phone} / ${Locales.Auth.Email}`}
          required
        />
      </div>

      <div className={styles['row']}>
        <input
          type="password"
          id="password"
          value={password}
          className={styles['auth-input']}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={Locales.Auth.Password}
          required
        />
      </div>

      <div className={styles['auth-actions']}>
        <IconButton
          disabled={isSubmitting}
          onClick={() => handleSubmit(undefined, login)}
          text={`${Locales.Auth.Login()}`}
          className={styles['auth-submit-btn']}
          type="primary"
        />
      </div>
    </div>
  );
};

/* 微信二维码登录 */
const WeChatLogin: React.FC = () => {
  const router = useRouter();
  // const [ticket, setTicket] = useState("");

  // if (!ticket) return <Loading noLogo={true} />;
  // async function loginByWeChat(router, code?: string) {
  //   if (!code) router.refresh();
  //   fetch(`${BASE_URL}/auth/login/wechat?code=${code}`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.success) {
  //         set((state) => ({
  //           sessionToken: res.token,
  //         }));
  //         router.push("/");
  //       } else {
  //         router.refresh();
  //       }
  //     });
  // },

  return (
    <div className={styles['form-container']}>
      {weChatOauthAppId ? (
        <Iframe
          className={styles['iframe']}
          url={
            'https://open.weixin.qq.com/connect/qrconnect?' +
            new URLSearchParams({
              appid: weChatOauthAppId,
              redirect_uri: weChatOauthRedirectUrl,
              scope: 'snsapi_login,snsapi_userinfo',
              self_redirect: 'true',
              styletype: 'white',
              href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7IHdpZHRoOiAxODBweDsgYm9yZGVyOiBub25lO30KLmltcG93ZXJCb3ggLnRpdGxlIHsgZGlzcGxheTogbm9uZTt9Ci5pbXBvd2VyQm94IC5pbmZvIHtkaXNwbGF5OiBub25lO30KLnN0YXR1c19pY29uIHtkaXNwbGF5OiBub25lfQouaW1wb3dlckJveCAuc3RhdHVzIHt0ZXh0LWFsaWduOiBjZW50ZXI7fQpodG1sIHtiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDt9CmJvZHkge292ZXJmbG93LXg6IGhpZGRlbjtvdmVyZmxvdy15OiBoaWRkZW47YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7fQo=',
            })
          }
        />
      ) : (
        <Image
          className={styles['qrcode']}
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
  const [tab, setTab] = useState<'password' | 'code' | 'wechat'>('password');

  return (
    <div className={styles['auth-page']}>
      <div className={`no-dark ${styles['auth-logo']}`}>
        {!!process.env.LOGO_LOGIN ? (
          <Image
            src={process.env.LOGO_LOGIN}
            alt="Logo"
            width={100}
            height={100}
          />
        ) : (
          <BotIcon />
        )}
      </div>
      <div className={styles['auth-title']}>{Locales.Index.Title}</div>
      <div className={styles['auth-tips']}></div>
      <div className={styles['auth-container']}>
        {tab === 'code' ? (
          <ValidateCodeLogin />
        ) : tab === 'password' ? (
          <PasswordLogin />
        ) : (
          <WeChatLogin />
        )}
        <div className={styles['divider']}>
          <div className={styles['divider-line']} />
          <div className={styles['divider-text']}>OR</div>
          <div className={styles['divider-line']} />
        </div>
        {process.env.WECHAT && (
          <div className={styles['third-part-login-options']}>
            <div
              className={styles['third-part-option']}
              onClick={() => {
                setTab(() => {
                  if (tab != 'wechat') return 'wechat';
                  else return 'code';
                });
              }}
            >
              {tab == 'wechat' ? <VerificationCodeIcon /> : <WechatLogo />}
              <div>使用{tab == 'wechat' ? '验证码' : '微信'}登陆</div>
            </div>
          </div>
        )}
        <div className={styles['third-part-login-options']}>
          <div
            className={styles['third-part-option']}
            onClick={() => {
              setTab(() => {
                if (tab == 'password') return 'code';
                else return 'password';
              });
            }}
          >
            {tab == 'password' ? <VerificationCodeIcon /> : <KeyIcon />}
            <div>使用{tab == 'password' ? '验证码' : '密码'}登陆</div>
          </div>
        </div>
      </div>
    </div>
  );
}
