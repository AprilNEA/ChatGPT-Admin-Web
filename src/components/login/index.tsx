import {useMemo, useState, FormEvent, useEffect} from "react";
import {ALL_MODELS, useAccessStore, useUserStore} from "@/store";
import styles from "@/styles/module/login.module.scss";
import ChatGptIcon from "@/assets/icons/chatgpt.svg";
import {showToast} from "@/components/ui-lib";

export function Login(props: { setIsLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // 防止表单重复 提交
  const [submitting, setSubmitting] = useState(false);
  const [updateCookie, updateEmail] = useUserStore(
    (state) => [
      state.updateCookie,
      state.updateEmail
    ]
  );

  useEffect(() => {
    showToast("新用户直接登录即可注册", 5000)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true)
    if (isNew && verificationCode.length !== 6) {
      showToast("请输入六位数验证码")
      setSubmitting(false)
      return;
    }
    if (!email || !password) {
      showToast("请输入邮箱密码")
      setSubmitting(false)
      return;
    }

    const res = await (await fetch(isNew ? '/api/user/register' : '/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        code: verificationCode
      })
    })).json()

    switch (res.status) {
      case 'success': {
        updateCookie(res.cookie)
        updateEmail(email)
        showToast("成功登录!", 3000)
        props.setIsLogin()
        break;
      }
      case 'new': {
        setIsNew(true)
        showToast("新用户, 请注册")
        break;
      }
      case 'wrongCode': {
        showToast("验证码错误")
        break;
      }
      default: {
        showToast("未知错误")
        break
      }
    }
    setSubmitting(false)
  };


  const accessStore = useAccessStore();

  return (
    <>
      <div className={styles["sidebar-header"]}>
        <div className={styles["sidebar-title"]}>ChatGPT (GPT-4)</div>
        <div className={styles["sidebar-sub-title"]}>
          Your own AI assistant.
        </div>
        <div className={styles["sidebar-logo"]}>
          <ChatGptIcon/>
        </div>
      </div>

      <div className={styles["login-form-container"]}>
        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <h2 className={styles["login-form-title"]}>Login/Register</h2>
          <div className={styles["login-form-input-group"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isNew}
            />
          </div>
          <div className={styles["login-form-input-group"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isNew}
            />
          </div>
          {isNew && <div className={styles["login-form-input-group"]}>
              <label htmlFor="email">Verification Code</label>
              <input
                  type="text"
                  id="verification-code"
                  maxLength={6}
                  pattern="\d{6}"
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
              />
          </div>}
          <button className={styles["login-form-submit"]} type="submit" disabled={submitting}>
            Login/Register
          </button>
        </form>
      </div>
    </>
  );
}
