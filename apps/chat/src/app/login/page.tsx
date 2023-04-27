"use client";

import { FormEvent, useState } from "react";
import { useUserStore } from "@/store";

import { showToast } from "@/components/ui-lib";
import { ResponseStatus } from "@/app/api/typing.d";
import { useRouter } from "next/navigation";
import Locales from "@/locales";
import { ReturnButton } from "@/components/ui-lib";
import Locale from "@/locales";

import styles from "./login.module.scss";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 防止表单重复 提交
  const [submitting, setSubmitting] = useState(false);
  const [updateSessionToken, updateEmail] = useUserStore((state) => [
    state.updateSessionToken,
    state.updateEmail,
  ]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!email || !password) {
      showToast("请输入邮箱密码");
      setSubmitting(false);
      return;
    }

    const res = await (
      await fetch("/api/user/login", {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      })
    ).json();

    switch (res.status) {
      case ResponseStatus.Success: {
        updateSessionToken(res.sessionToken);
        updateEmail(email);
        showToast(Locales.Index.Success(Locales.Index.Login), 3000);
        router.replace("/");
        break;
      }
      case ResponseStatus.notExist: {
        showToast(Locales.Index.NotYetRegister);
        break;
      }
      case ResponseStatus.wrongPassword: {
        showToast(Locales.Index.PasswordError);
        break;
      }
      default: {
        showToast(Locales.UnknownError);
        break;
      }
    }

    setSubmitting(false);
  };

  return (
    <>
      <div className={styles["login-form-container"]}>
        <form className={styles["login-form"]} onSubmit={handleLogin}>
          <ReturnButton onClick={() => router.push("/enter")} />

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
          <div className={styles["button-container"]}>
            <button
              className={styles["login-form-submit"]}
              type="submit"
              disabled={submitting}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
