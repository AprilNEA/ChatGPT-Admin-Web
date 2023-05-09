"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@/components/ui-lib";
import { useUserStore } from "@/store";
import { ReturnButton } from "@/components/ui-lib";
import { RegisterResponse, ResponseStatus } from "@/app/api/typing.d";

import Locales from "@/locales";
import styles from "@/app/login/login.module.scss";

const ifVerifyCode = !!process.env.NEXT_PUBLIC_EMAIL_SERVICE;

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [invitationCode, setInvitationCode] = useState(
    searchParams.get("code") ?? ""
  );

  const [submitting, setSubmitting] = useState(false);

  const [updateSessionToken, updateEmail] = useUserStore((state) => [
    state.updateSessionToken,
    state.updateEmail,
  ]);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !verificationCode) {
      showToast(Locales.Index.NoneData);
      setSubmitting(false);
      return;
    }

    const res = (await (
      await fetch("/api/user/register", {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          code: verificationCode,
          code_type: "email",
          invitation_code: invitationCode.toLowerCase() ?? "",
        }),
      })
    ).json()) as RegisterResponse;

    switch (res.status) {
      case ResponseStatus.Success: {
        updateSessionToken(res.sessionToken);
        updateEmail(email);
        router.replace("/");
        showToast(Locales.Index.Success(Locales.Index.Register), 3000);
        break;
      }
      case ResponseStatus.alreadyExisted: {
        showToast(Locales.Index.DuplicateRegistration);
        break;
      }
      case ResponseStatus.invalidCode: {
        showToast(Locales.Index.CodeError);
        break;
      }
      default: {
        showToast(Locales.UnknownError);
        break;
      }
    }
  };

  const handleSendVerification = async () => {
    setSubmitting(true);

    if (!email) {
      showToast("请输入邮箱");
      setSubmitting(false);
      return;
    }

    const res = await (
      await fetch(
        "/api/user/register/code?email=" + encodeURIComponent(email),
        {
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
        }
      )
    ).json();

    switch (res.status) {
      case ResponseStatus.Success: {
        switch (res.code_data.status) {
          case 0:
            showToast("验证码成功发送!");
            setIsSending(true);
            break;
          case 1:
            showToast(Locales.Index.DuplicateRegistration);
            break;
          case 2:
            showToast("请求验证码过快，请稍后再试!");
            break;
          case 4:
          default:
            showToast(Locales.UnknownError);
            break;
        }
        break;
      }
      case ResponseStatus.notExist: {
        showToast(Locales.Index.EmailNonExistent);
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
    <div className={styles["login-form-container"]}>
      <form className={styles["login-form"]} onSubmit={handleRegister}>
        <ReturnButton onClick={() => router.push("/enter")} />

        <h2 className={styles["login-form-title"]}>Register</h2>
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
        <div className={styles["login-form-input-group"]}>
          <label htmlFor="email">Verification Code</label>
          <div className={styles["verification-code-container"]}>
            <input
              type="text"
              id="verification-code"
              maxLength={6}
              pattern="\d{6}"
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button
              className={styles["send-verification-button"]}
              onClick={handleSendVerification}
              disabled={submitting}
            >
              {isSending ? "Already Send to Email" : "Get Code"}
            </button>
          </div>
        </div>

        {ifVerifyCode && (
          <div className={styles["login-form-input-group"]}>
            <label htmlFor="email">Invitation Code</label>
            <div className={styles["verification-code-container"]}>
              <input
                type="text"
                id="invitation-code"
                placeholder="可选"
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className={styles["button-container"]}>
          <button className={styles["login-form-submit"]} type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
