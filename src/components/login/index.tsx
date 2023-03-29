import {useMemo, useState, FormEvent} from "react";
import {ALL_MODELS, useAccessStore, useUserStore} from "@/store";
import styles from "@/styles/module/login.module.scss";
import ChatGptIcon from "@/assets/icons/chatgpt.svg";

export function Login(props: { setIsLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [updateCookie, updateEmail] = useUserStore(
    (state) => [
      state.updateCookie,
      state.updateEmail
    ]
  );
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    const res = await (await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })).json()
    if (res.success) {
      updateCookie(res.cookie)
      updateEmail(email)
      props.setIsLogin()
    }
  };


  const accessStore = useAccessStore();
  const enabledAccessControl = useMemo(
    () => accessStore.enabledAccessControl(),
    []
  );

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
          <h2 className={styles["login-form-title"]}>Login</h2>
          <div className={styles["login-form-input-group"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
          </div>
          <button className={styles["login-form-submit"]} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
